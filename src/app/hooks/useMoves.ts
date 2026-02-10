// src/hooks/useMoves.ts
import { useQuery } from '@tanstack/react-query';
import type { MoveWithTags } from '../types/move';

// 모든 동작 조회
export function useMoves() {
  return useQuery({
    queryKey: ['moves'],
    queryFn: async (): Promise<MoveWithTags[]> => {
      const res = await fetch('/api/moves');
      if (!res.ok) throw new Error('Failed to fetch moves');
      return res.json();
    },
  });
}

// 레벨별 동작 조회
export function useMovesByLevel(level: string) {
  return useQuery({
    queryKey: ['moves', 'level', level],
    queryFn: async (): Promise<MoveWithTags[]> => {
      const res = await fetch(`/api/moves?level=${level}`);
      if (!res.ok) throw new Error('Failed to fetch moves');
      return res.json();
    },
    enabled: !!level, // level이 있을 때만 실행
  });
}

// 태그별 동작 조회
export function useMovesByTag(tag: string) {
  return useQuery({
    queryKey: ['moves', 'tag', tag],
    queryFn: async (): Promise<MoveWithTags[]> => {
      const res = await fetch(`/api/moves?tag=${encodeURIComponent(tag)}`);
      if (!res.ok) throw new Error('Failed to fetch moves');
      return res.json();
    },
    enabled: !!tag,
  });
}

// 단일 동작 조회
export function useMove(id: number) {
  const isValidId = Number.isInteger(id) && id >= 1;
  return useQuery({
    queryKey: ['moves', id],
    queryFn: async (): Promise<MoveWithTags> => {
      const res = await fetch(`/api/moves/${id}`);
      if (!res.ok) throw new Error('Failed to fetch move');
      return res.json();
    },
    enabled: isValidId,
  });
}