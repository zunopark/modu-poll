"use client";

import React, { useMemo } from 'react';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMove, useMoves } from '../../hooks/useMoves';

function levelStyle(level: string) {
  return level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
    level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
    level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
    'bg-rose-100 text-rose-700';
}

const MoveDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = React.use(params);
  const router = useRouter();
  const moveId = parseInt(id, 10);
  const isValidId = Number.isInteger(moveId) && moveId >= 1;
  const { data: move, isLoading, isError, error } = useMove(moveId);
  const { data: allMoves = [] } = useMoves();

  const relatedMoves = useMemo(() => {
    if (!move || allMoves.length === 0) return [];
    const currentTagNames = new Set(move.tags.map(t => t.name));
    return allMoves
      .filter(m => m.id !== move.id)
      .filter(m => m.level === move.level || m.tags.some(t => currentTagNames.has(t.name)))
      .slice(0, 6);
  }, [move, allMoves]);

  if (!isValidId) {
    return (
      <div className="min-h-screen bg-white pb-20 pt-[80px] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-gray-900 font-bold mb-2">잘못된 동작 주소예요</p>
          <p className="text-gray-500 text-sm mb-4">목록에서 동작을 선택해 주세요.</p>
          <button
            type="button"
            onClick={() => router.push('/move')}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            목록으로
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-20 pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">동작 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (isError || !move) {
    return (
      <div className="min-h-screen bg-white pb-20 pt-[80px] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-gray-900 font-bold mb-2">동작을 불러오지 못했어요</p>
          <p className="text-gray-500 text-sm mb-4">{error?.message ?? '잠시 후 다시 시도해 주세요.'}</p>
          <button
            type="button"
            onClick={() => router.push('/move')}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            목록으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-[80px]">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>목록으로 돌아가기</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-lg relative group">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${move.videoId}?autoplay=0&rel=0`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Title & Info Header */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{move.name}</h1>
                  <div className="flex flex-wrap gap-2 items-center text-gray-500">
                    <span className="text-lg font-medium font-mono">클라임</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors" aria-label="공유">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors hover:text-rose-500" aria-label="북마크">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {move.tags.map(tag => (
                  <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <h3 className="text-xl font-bold text-gray-900 mb-3">동작 설명</h3>
              <p>{move.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Difficulty */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">난이도</h3>
              <div>
                <div className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${levelStyle(move.level)}`}>
                  {move.level}
                </div>
              </div>
            </div>

            {/* Related Moves */}
            {relatedMoves.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">이어서 하기 좋은 동작</h3>
                <div className="space-y-3">
                  {relatedMoves.map(related => (
                    <button
                      key={related.id}
                      type="button"
                      onClick={() => router.push(`/move/${related.id}`)}
                      className="w-full flex gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group text-left"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <img src={null as unknown as string} alt={related.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 py-1 min-w-0">
                        <div className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors text-sm truncate">{related.name}</div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${levelStyle(related.level)}`}>
                          {related.level}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetailPage;
