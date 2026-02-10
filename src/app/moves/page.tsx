"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useMoves } from '../hooks/useMoves';
import { useRouter } from 'next/navigation';

// Placeholder image when API doesn't provide one
const MOVE_PLACEHOLDER_IMAGE = 'data:image/jpeg;base64,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';

interface MovePageProps {
  onMoveClick: (id: number) => void;
}

const MovePage: React.FC<MovePageProps> = ({ onMoveClick }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const { data: moves = [], isLoading, isError, error } = useMoves();

  const allTags = useMemo(
    () => Array.from(new Set(moves.flatMap(m => m.tags.map(t => t.name)))),
    [moves]
  );
  const displayedTags = isTagsExpanded ? allTags : allTags.slice(0, 8);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredMoves = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return moves.filter(move => {
      const moveTagNames = move.tags.map(t => t.name);
      const matchesSearch = !term ||
        move.name.toLowerCase().includes(term) ||
        moveTagNames.some(name => name.toLowerCase().includes(term));
      const matchesLevel = selectedLevel === "All" || move.level === selectedLevel;
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(t => moveTagNames.includes(t));
      return matchesSearch && matchesLevel && matchesTags;
    });
  }, [moves, searchTerm, selectedLevel, selectedTags]);

  const getNameWithLevel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '초급';
      case 'intermediate':
        return '중급';
      case 'advanced':
        return '고급';
      case 'master':
        return '마스터';
      default:
        return level;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">동작 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 pt-[80px] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-gray-900 font-bold mb-2">목록을 불러오지 못했어요</p>
          <p className="text-gray-500 text-sm mb-4">{error?.message ?? '잠시 후 다시 시도해 주세요.'}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Sparkles className="text-rose-500" /> 동작 백과
          </h1>
          <p className="text-gray-500">
            폴 동작을 검색하고 배워보세요.
          </p>
        </div>

        {/* Filter & Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10 sticky top-[90px] z-30 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="동작명, 영어 이름, #태그 검색" 
                className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {['All', 'beginner', 'intermediate', 'advanced', 'master'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedLevel === level 
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {level === 'All' ? '전체' : getNameWithLevel(level)}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter Area */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <div className="mt-1.5 flex items-center gap-2 text-gray-400 min-w-fit">
                <Filter size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Tags</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {displayedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                        selectedTags.includes(tag)
                          ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  
                  {allTags.length > 8 && (
                    <button 
                      onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 text-xs font-medium hover:bg-gray-50 hover:text-gray-600 flex items-center gap-1 transition-colors"
                    >
                      {isTagsExpanded ? '접기' : `+${allTags.length - 8} 더보기`}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isTagsExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                
                {/* Active Filters Summary */}
                {selectedTags.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <span>선택된 태그:</span>
                    <button 
                      onClick={() => setSelectedTags([])}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-rose-500 border border-rose-100 hover:border-rose-200 hover:bg-rose-50 transition-all ml-auto md:ml-0"
                    >
                      <span>필터 초기화</span>
                      <span className="flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full bg-rose-100 text-rose-600 text-[10px] group-hover:bg-rose-200 transition-colors">{selectedTags.length}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Move Grid */}
        {filteredMoves.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="font-medium">조건에 맞는 동작이 없어요.</p>
            <p className="text-sm mt-1">검색어나 필터를 바꿔 보세요.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMoves.map((move, idx) => (
            <motion.div
              key={move.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => router.push(`/moves/${move.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <img
                  src={MOVE_PLACEHOLDER_IMAGE}
                  alt={move.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-white ${
                    move.level === 'beginner' ? 'bg-emerald-500' :
                    move.level === 'intermediate' ? 'bg-blue-500' :
                    move.level === 'advanced' ? 'bg-purple-500' :
                    move.level === 'master' ? 'bg-rose-500' : 'bg-gray-500'
                  }`}>
                    {move.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white">
                  <Star size={16} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors mb-4">
                  {move.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {move.tags.map(tag => (
                    <span key={tag.id} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default MovePage;