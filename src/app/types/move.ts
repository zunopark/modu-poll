// src/types/move.ts
export type Move = {
    id: number;
    name: string;
    level: string;
    videoId: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type Tag = {
    id: number;
    name: string;
  };
  
  export type MoveWithTags = Move & {
    tags: Tag[];
  };