import React from 'react';
import { ArrowLeft, Share2, Bookmark, Info, Star, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MOVES } from '../data/moves';

interface MoveDetailPageProps {
  moveId: number;
  onBack: () => void;
  onMoveClick: (id: number) => void;
}

const MoveDetailPage: React.FC<MoveDetailPageProps> = ({ moveId, onBack, onMoveClick }) => {
  const move = MOVES.find(m => m.id === moveId);
  
  if (!move) return <div>Move not found</div>;

  const relatedMoves = MOVES.filter(m => move.relatedMoveIds.includes(m.id));

  return (
    <div className="min-h-screen bg-white pb-20 pt-[80px]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={onBack}
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
                    <span className="text-lg font-medium font-mono">{move.engName}</span>
                    {move.aliases && move.aliases.length > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-sm">{move.aliases.filter(a => a !== move.name).join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors hover:text-rose-500">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {move.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    {tag}
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

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Difficulty Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">난이도 정보</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">General Level</div>
                  <div className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${
                    move.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                    move.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    move.level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {move.level}
                  </div>
                </div>

                <div className="relative group/tooltip">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <span>PSO Level</span>
                    <Info size={14} className="cursor-help" />
                    
                    {/* Tooltip */}
                    <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none">
                      <p className="font-bold mb-1">PSO (Pole Sport Organization)</p>
                      <p>국제 폴 스포츠 기구에서 지정한 표준 난이도 체계입니다. Level 1(입문)부터 Level 5(최��급)까지 구분됩니다.</p>
                      <div className="absolute left-4 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {move.psoDifficulty}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <div 
                          key={star} 
                          className={`w-1.5 h-6 rounded-full ${
                            parseInt(move.psoDifficulty.replace('Level ', '')) >= star 
                              ? 'bg-rose-500' 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <div className="font-medium text-gray-900">{move.category}</div>
                </div>
              </div>
            </div>

            {/* Related Moves */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>이어서 하기 좋은 동작</span>
              </h3>
              <div className="space-y-3">
                {relatedMoves.map(related => (
                  <div 
                    key={related.id}
                    onClick={() => onMoveClick(related.id)}
                    className="flex gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <div className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors text-sm">{related.name}</div>
                      <div className="text-xs text-gray-500 font-mono mb-1">{related.engName}</div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        related.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                        related.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                        related.level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {related.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetailPage;