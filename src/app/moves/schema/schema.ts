// schema.ts
import { pgTable, serial, integer, text, varchar, timestamp, primaryKey, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { profiles } from '@/app/my/schema/schema';

const levels = pgEnum('levels', ['beginner', 'intermediate', 'advanced', 'master']);

// 동작 테이블
export const moves = pgTable('moves', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  name_korean: varchar('name_korean', { length: 100 }), // 한글명 (선택)
  level: levels('level').notNull(),
  video_id: varchar('video_id', { length: 100 }),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// 태그 테이블
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// 동작-태그 중간 테이블 (Many-to-Many)
export const movesToTags = pgTable('moves_to_tags', {
  move_id: integer('move_id').notNull().references(() => moves.id, { onDelete: 'cascade' }),
  tag_id: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.move_id, table.tag_id] }),
}));

// 동작 좋아요 (한 사용자당 동작당 1개)
export const move_likes = pgTable('move_likes', {
  move_id: integer('move_id').notNull().references(() => moves.id, { onDelete: 'cascade' }),
  profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.move_id, table.profile_id] }),
}));

// 동작 리뷰 (한 사용자당 동작당 1개 → 복합 PK)
export const move_reviews = pgTable('move_reviews', {
  review_id: serial('review_id').notNull().unique(),
  move_id: integer('move_id').notNull().references(() => moves.id, { onDelete: 'cascade' }),
  profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  review: text('review').notNull(),
  user_vote_level: varchar('user_vote_level', { length: 50 }).notNull(), // beginner, intermediate, advanced, master
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.move_id, table.profile_id] }),
}));

// 동작 스크랩/저장 (유저 ↔ 동작 Many-to-Many: 한 유저가 여러 동작 저장, 한 동작이 여러 유저에게 저장됨)
export const move_saves = pgTable('move_saves', {
  move_id: integer('move_id').notNull().references(() => moves.id, { onDelete: 'cascade' }),
  profile_id: uuid().notNull().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  created_at: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.profile_id, table.move_id] }),
}));

// Relations
export const movesRelations = relations(moves, ({ many }) => ({
  movesToTags: many(movesToTags),
  likes: many(move_likes),
  reviews: many(move_reviews),
  savedBy: many(move_saves),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  movesToTags: many(movesToTags),
}));

export const movesToTagsRelations = relations(movesToTags, ({ one }) => ({
  move: one(moves, { fields: [movesToTags.move_id], references: [moves.id] }),
  tag: one(tags, { fields: [movesToTags.tag_id], references: [tags.id] }),
}));

export const move_likesRelations = relations(move_likes, ({ one }) => ({
  move: one(moves, { fields: [move_likes.move_id], references: [moves.id] }),
  profile: one(profiles, { fields: [move_likes.profile_id], references: [profiles.profile_id] }),
}));

export const move_reviewsRelations = relations(move_reviews, ({ one }) => ({
  move: one(moves, { fields: [move_reviews.move_id], references: [moves.id] }),
  profile: one(profiles, { fields: [move_reviews.profile_id], references: [profiles.profile_id] }),
}));

export const move_savesRelations = relations(move_saves, ({ one }) => ({
  move: one(moves, { fields: [move_saves.move_id], references: [moves.id] }),
  profile: one(profiles, { fields: [move_saves.profile_id], references: [profiles.profile_id] }),
}));