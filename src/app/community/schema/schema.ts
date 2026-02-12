import { profiles } from "@/app/my/schema/schema";
import { pgTable, serial, integer, varchar, text, timestamp, uuid, pgEnum, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const categories = pgEnum('categories', ['전체', '공지', '자유', '리뷰', '질문', '팁', '이벤트']);

// 커뮤니티 게시판 글 테이블
export const community = pgTable('community', {
    community_id: serial('community_id').primaryKey(),
    profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 100 }).notNull(),
    content: text('content'),
    category: categories('category').notNull(),
    stats: jsonb('stats').$type<{ views: number; likes: number; comments: number }>().notNull().default({ views: 0, likes: 0, comments: 0 }),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 글 좋아요 (한 사용자당 글당 1개)
export const communityLikes = pgTable('community_likes', {
    community_id: integer('community_id').notNull().references(() => community.community_id, { onDelete: 'cascade' }),
    profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.community_id, table.profile_id] }),
}));

// 댓글·답글 테이블 (parent_comment_id가 null이면 최상위 댓글, 있으면 해당 댓글의 답글)
export const communityComments = pgTable('community_comments', {
    comment_id: serial('comment_id').primaryKey(),
    community_id: integer('community_id').notNull().references(() => community.community_id, { onDelete: 'cascade' }),
    profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    // self-reference(댓글→답글): 타입 순환 방지를 위해 단언 사용
    parent_comment_id: integer('parent_comment_id').references((): any => (communityComments as any).comment_id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const communityRelations = relations(community, ({ one, many }) => ({
    profile: one(profiles, { fields: [community.profile_id], references: [profiles.profile_id] }),
    comments: many(communityComments),
    likes: many(communityLikes),
}));

export const communityLikesRelations = relations(communityLikes, ({ one }) => ({
    community: one(community, { fields: [communityLikes.community_id], references: [community.community_id] }),
    profile: one(profiles, { fields: [communityLikes.profile_id], references: [profiles.profile_id] }),
}));

export const communityCommentsRelations = relations(communityComments, ({ one, many }) => ({
    community: one(community, { fields: [communityComments.community_id], references: [community.community_id] }),
    profile: one(profiles, { fields: [communityComments.profile_id], references: [profiles.profile_id] }),
    parent: one(communityComments, { fields: [communityComments.parent_comment_id], references: [communityComments.comment_id], relationName: 'commentReplies' }),
    replies: many(communityComments, { relationName: 'commentReplies' }),
}));