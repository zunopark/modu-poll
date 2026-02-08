"use client";

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Star, Hash, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { MOVES } from '../data/moves';

interface DictionaryPageProps {
  onMoveClick: (id: number) => void;
}

const DictionaryPage: React.FC<DictionaryPageProps> = ({ onMoveClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  // Extract all unique tags
  const allTags = Array.from(new Set(MOVES.flatMap(m => m.tags)));
  const displayedTags = isTagsExpanded ? allTags : allTags.slice(0, 8);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredMoves = MOVES.filter(move => {
    const matchesSearch = move.name.includes(searchTerm) || 
                          move.engName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          move.tags.some(t => t.includes(searchTerm));
    const matchesLevel = selectedLevel === "All" || move.level === selectedLevel;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(t => move.tags.includes(t));
    
    return matchesSearch && matchesLevel && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Sparkles className="text-rose-500" /> 동작 백과
          </h1>
          <p className="text-gray-500">
            3,000여 개의 폴 동작을 검색하고 배워보세요.
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
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'Master'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedLevel === level 
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {level === 'All' ? '전체' : level}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMoves.map((move, idx) => (
            <motion.div
              key={move.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onMoveClick(move.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={move.image} 
                  alt={move.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-white ${
                    move.level === 'Beginner' ? 'bg-emerald-500' :
                    move.level === 'Intermediate' ? 'bg-blue-500' :
                    move.level === 'Advanced' ? 'bg-purple-500' :
                    move.level === 'Master' ? 'bg-rose-500' : 'bg-gray-500'
                  }`}>
                    {move.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white">
                  <Star size={16} />
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-500 transition-colors">{move.name}</h3>
                  <span className="text-xs text-gray-400 font-medium mt-1">{move.category}</span>
                </div>
                <p className="text-gray-400 text-sm font-medium mb-4 font-mono">{move.engName}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {move.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;