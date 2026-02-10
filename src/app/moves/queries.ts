// src/db/queries.ts
import { db } from '../db';
import { moves, tags } from './schema/schema';
import { eq } from 'drizzle-orm';
import type { MoveWithTags } from '../types/move';

// 모든 동작 조회 (태그 포함)
export async function getAllMoves(): Promise<MoveWithTags[]> {
  const result = await db.query.moves.findMany({
    with: {
      movesToTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  // 데이터 변환
  return result.map(move => ({
    id: move.id,
    name: move.name,
    level: move.level,
    createdAt: move.createdAt,
    updatedAt: move.updatedAt,
    tags: move.movesToTags.map(mt => mt.tag),
  }));
}

// 레벨별 동작 조회
export async function getMovesByLevel(level: string): Promise<MoveWithTags[]> {
  const result = await db.query.moves.findMany({
    where: eq(moves.level, level),
    with: {
      movesToTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  return result.map(move => ({
    id: move.id,
    name: move.name,
    level: move.level,
    createdAt: move.createdAt,
    updatedAt: move.updatedAt,
    tags: move.movesToTags.map(mt => mt.tag),
  }));
}

// 단일 동작 조회
export async function getMoveById(id: number): Promise<MoveWithTags | null> {
  const result = await db.query.moves.findFirst({
    where: eq(moves.id, id),
    with: {
      movesToTags: {
        with: {
          tag: true,
        },
      },
    },
  });

  if (!result) return null;

  return {
    id: result.id,
    name: result.name,
    level: result.level,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    tags: result.movesToTags.map(mt => mt.tag),
  };
}

// 태그별 동작 조회
export async function getMovesByTag(tagName: string): Promise<MoveWithTags[]> {
  const result = await db.query.tags.findFirst({
    where: eq(tags.name, tagName),
    with: {
      movesToTags: {
        with: {
          move: {
            with: {
              movesToTags: {
                with: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!result) return [];

  return result.movesToTags.map(mt => ({
    id: mt.move.id,
    name: mt.move.name,
    level: mt.move.level,
    createdAt: mt.move.createdAt,
    updatedAt: mt.move.updatedAt,
    tags: mt.move.movesToTags.map(mtt => mtt.tag),
  }));
}