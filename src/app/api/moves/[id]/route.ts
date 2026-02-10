// src/app/api/moves/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMoveById } from '../../../moves/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const moveId = parseInt(id, 10);
    if (Number.isNaN(moveId) || moveId < 1) {
      return NextResponse.json(
        { error: 'Invalid move id' },
        { status: 400 }
      );
    }

    const move = await getMoveById(moveId);

    if (!move) {
      return NextResponse.json(
        { error: 'Move not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(move);
  } catch (error) {
    console.error('Error fetching move:', error);
    return NextResponse.json(
      { error: 'Failed to fetch move' },
      { status: 500 }
    );
  }
}