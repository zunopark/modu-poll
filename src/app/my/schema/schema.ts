import { pgTable, uuid, pgSchema, varchar, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

const users = pgSchema('auth').table("users", {
    id: uuid().primaryKey()
});

export const profiles = pgTable('profiles', {
    profile_id: uuid().primaryKey().references(() => users.id, { onDelete: 'cascade' }), // supabase auth user id
    name: varchar('name', { length: 50 }).notNull(), // 이름
    nickname: varchar('nickname', { length: 50 }).notNull(), // 닉네임
    avatar_url: varchar('avatar_url', { length: 500 }), // 아바타 이미지 URL
    bio: varchar('bio', { length: 100 }), // 소개
    is_teacher: boolean('is_teacher').notNull().default(false), // 선생님 여부
    stats: jsonb().$type<{
        followers: number;
        following: number;
    }>().notNull().default({ followers: 0, following: 0 }),
    created_at: timestamp('created_at').defaultNow().notNull(), // 생성일
    updated_at: timestamp('updated_at').defaultNow().notNull(), // 수정일
});

export const follows = pgTable('follows', {
    follower_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    following_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow().notNull(),
});