// schema.ts
import { pgTable, serial, text, varchar, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 동작 테이블
export const moves = pgTable('moves', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  nameKorean: varchar('name_korean', { length: 100 }), // 한글명 (선택)
  level: varchar('level', { length: 50 }).notNull(), // beginner, intermediate, advanced
  videoId: varchar('video_id', { length: 100 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 태그 테이블
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 동작-태그 중간 테이블 (Many-to-Many)
export const movesToTags = pgTable('moves_to_tags', {
  moveId: serial('move_id').notNull().references(() => moves.id, { onDelete: 'cascade' }),
  tagId: serial('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.moveId, table.tagId] }),
}));

// Relations 정의
export const movesRelations = relations(moves, ({ many }) => ({
  movesToTags: many(movesToTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  movesToTags: many(movesToTags),
}));

export const movesToTagsRelations = relations(movesToTags, ({ one }) => ({
  move: one(moves, {
    fields: [movesToTags.moveId],
    references: [moves.id],
  }),
  tag: one(tags, {
    fields: [movesToTags.tagId],
    references: [tags.id],
  }),
}));