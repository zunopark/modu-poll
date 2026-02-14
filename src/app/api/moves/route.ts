// src/app/api/moves/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllMoves, getMovesByLevel, getMovesByTag } from '../../moves/queries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = searchParams.get('level');
    const tag = searchParams.get('tag');

    let moves;

    if (level) {
      moves = await getMovesByLevel(level as 'beginner' | 'intermediate' | 'advanced' | 'master');
    } else if (tag) {
      moves = await getMovesByTag(tag);
    } else {
      moves = await getAllMoves();
    }

    return NextResponse.json(moves);
  } catch (error) {
    console.error('Error fetching moves:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moves' },
      { status: 500 }
    );
  }
}