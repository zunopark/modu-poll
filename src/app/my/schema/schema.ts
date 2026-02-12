import { pgTable, uuid, pgSchema, varchar, timestamp, boolean, jsonb, primaryKey, integer, serial, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { community } from "@/app/community/schema/schema";

const users = pgSchema('auth').table("users", {
    id: uuid().primaryKey(),
});

// 사용자 프로필 (Supabase auth.users와 1:1, profile_id = auth.users.id)
export const profiles = pgTable('profiles', {
    profile_id: uuid().primaryKey().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 50 }).notNull(),
    nickname: varchar('nickname', { length: 50 }).notNull().unique(),
    avatar_url: varchar('avatar_url', { length: 500 }),
    bio: varchar('bio', { length: 100 }),
    is_teacher: boolean('is_teacher').notNull().default(false),
    stats: jsonb('stats').$type<{ followers: number; following: number }>().notNull().default({ followers: 0, following: 0 }),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 팔로우 관계 (follower_id가 following_id를 팔로우)
export const follows = pgTable('follows', {
    follower_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    following_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.follower_id, table.following_id] }),
}));

// 알림 유형 (community 전용, move 관련 알림 없음)
// follow: 팔로잉 알람 (나를 팔로우함)
// like: 내가 쓴 community 글에 좋아요
// comment: 내가 쓴 community 글/댓글에 댓글
// mention: 다른 유저가 나를 멘션
export const notification_types = pgEnum('notification_types', ['follow', 'like', 'comment', 'mention']);

export const notifications = pgTable('notifications', {
    notification_id: serial('notification_id').primaryKey(),
    source_profile_id: uuid('source_profile_id').references(() => profiles.profile_id, { onDelete: 'cascade' }), // 액션 한 사람
    target_profile_id: uuid('target_profile_id').notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }), // 알림 받는 사람
    type: notification_types('type').notNull(),
    community_id: integer('community_id').references(() => community.community_id, { onDelete: 'cascade' }), // like/comment/mention 시 연결 글 (follow 시 null)
    read_at: timestamp('read_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const profilesRelations = relations(profiles, ({ many }) => ({
    followers: many(follows, { relationName: 'following' }),
    following: many(follows, { relationName: 'follower' }),
    receivedNotifications: many(notifications, { relationName: 'targetProfile' }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
    follower: one(profiles, { fields: [follows.follower_id], references: [profiles.profile_id], relationName: 'follower' }),
    following: one(profiles, { fields: [follows.following_id], references: [profiles.profile_id], relationName: 'following' }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
    sourceProfile: one(profiles, { fields: [notifications.source_profile_id], references: [profiles.profile_id], relationName: 'sourceProfile' }),
    targetProfile: one(profiles, { fields: [notifications.target_profile_id], references: [profiles.profile_id], relationName: 'targetProfile' }),
    community: one(community, { fields: [notifications.community_id], references: [community.community_id] }),
}));