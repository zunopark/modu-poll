"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Shuffle, 
  ListPlus, 
  Search, 
  GripVertical, 
  Trash2, 
  Play, 
  Save, 
  CheckCircle2, 
  RefreshCcw,
  Sparkles
} from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'motion/react';
import { POLE_MOVES, Move } from '../data/moves';

const ComboMakerPage = () => {
  // --- State ---
  const [comboCount, setComboCount] = useState(3);
  const [mode, setMode] = useState<'random' | 'custom'>('random');
  const [difficulty, setDifficulty] = useState<string>('All');
  
  // Custom Mode State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMoves, setSelectedMoves] = useState<Move[]>([]);
  
  // Result State
  const [generatedCombo, setGeneratedCombo] = useState<Move[] | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [expandedMoveIndex, setExpandedMoveIndex] = useState<number | null>(null);

  // --- Logic ---

  // Handle Search
  const filteredMoves = searchQuery 
    ? POLE_MOVES.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.engName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAddMove = (move: Move) => {
    // Add unique ID for drag and drop key purposes even if it's the same move
    const newMove = { ...move, uniqueId: `${move.id}-${Date.now()}` };
    setSelectedMoves([...selectedMoves, newMove as any]);
    setSearchQuery("");
  };

  const handleRemoveMove = (uniqueId: string) => {
    setSelectedMoves(selectedMoves.filter((m: any) => m.uniqueId !== uniqueId));
  };

  // Handle Generate
  const handleGenerate = () => {
    if (mode === 'random') {
      let pool = POLE_MOVES;
      if (difficulty !== 'All') {
        pool = POLE_MOVES.filter(m => m.level === difficulty);
      }
      
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      setGeneratedCombo(shuffled.slice(0, comboCount));
    } else {
      // Custom mode
      if (selectedMoves.length === 0) {
        alert("동작을 최소 1개 이상 추가해주세요!");
        return;
      }
      setGeneratedCombo(selectedMoves);
    }
    setIsSaved(false);
    setExpandedMoveIndex(null);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Logic to save to user's profile would go here
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setGeneratedCombo(null);
    setIsSaved(false);
    setExpandedMoveIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px] pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Header Area (Mobile) --- */}
        <div className="lg:col-span-12 lg:hidden mb-4">
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Sparkles className="text-rose-500" /> 콤보 메이커
          </h1>
          <p className="text-gray-500 text-sm mt-1">나만의 루틴을 만들어보세요.</p>
        </div>

        {/* --- Left Column: Settings & Builder --- */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="hidden lg:block mb-2">
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Sparkles className="text-rose-500" size={32} /> 콤보 메이커
            </h1>
            <p className="text-gray-500 mt-2">오늘의 폴링 루틴을 계획해보세요.</p>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
            
            {/* Mode Selection */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
              <button
                onClick={() => { setMode('random'); setGeneratedCombo(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  mode === 'random' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Shuffle size={16} /> 랜덤 콤보
              </button>
              <button
                onClick={() => { setMode('custom'); setGeneratedCombo(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  mode === 'custom' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ListPlus size={16} /> 직접 선택
              </button>
            </div>

            {/* Random Mode Controls */}
            <AnimatePresence mode="wait">
              {mode === 'random' ? (
                <motion.div 
                  key="random-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Count Stepper */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">동작 개수</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setComboCount(Math.max(1, comboCount - 1))}
                        className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={comboCount}
                        onChange={(e) => setComboCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="flex-1 h-12 bg-gray-50 rounded-2xl text-center font-black text-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      />
                      <button 
                        onClick={() => setComboCount(Math.min(10, comboCount + 1))}
                        className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Difficulty Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">난이도</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            difficulty === level
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {level === 'All' ? '전체' : level}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Custom Mode Controls */
                <motion.div 
                  key="custom-controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Search Input */}
                  <div className="relative z-20">
                    <label className="block text-sm font-bold text-gray-900 mb-3">동작 검색</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="'인버트' 검색해보세요"
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:bg-white transition-all font-medium"
                      />
                    </div>
                    
                    {/* Autocomplete Dropdown */}
                    {searchQuery && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto overflow-hidden">
                        {filteredMoves.length > 0 ? (
                          filteredMoves.map((move) => (
                            <button
                              key={move.id}
                              onClick={() => handleAddMove(move)}
                              className="w-full px-5 py-3 text-left hover:bg-rose-50 flex justify-between items-center group transition-colors"
                            >
                              <div>
                                <span className="font-bold text-gray-900">{move.name}</span>
                                <span className="ml-2 text-xs text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded">{move.level}</span>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                <Plus size={16} />
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">검색 결과가 없습니다.</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Selected List (Drag & Drop) */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-3">
                      <label className="block text-sm font-bold text-gray-900">선택된 동작 ({selectedMoves.length})</label>
                      <span className="text-xs text-gray-400">드래그하여 순서 변경</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-2 min-h-[120px]">
                      {selectedMoves.length > 0 ? (
                        <Reorder.Group axis="y" values={selectedMoves} onReorder={setSelectedMoves} className="space-y-2">
                          {selectedMoves.map((move: any) => (
                            <Reorder.Item key={move.uniqueId} value={move}>
                              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-grab active:cursor-grabbing group">
                                <GripVertical className="text-gray-300 group-hover:text-gray-500" size={18} />
                                <span className="flex-1 font-bold text-gray-800 text-sm">{move.name}</span>
                                <button 
                                  onClick={() => handleRemoveMove(move.uniqueId)}
                                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
                          <ListPlus size={24} className="opacity-50" />
                          <span className="text-xs">동작을 추가해주세요</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <button 
              onClick={handleGenerate}
              className="w-full h-14 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-lg mt-8 shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Play fill="currentColor" size={20} /> 콤보 만들기
            </button>

          </div>
        </div>

        {/* --- Right Column: Result / Preview --- */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {generatedCombo ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">오늘의 콤보</h2>
                  <button 
                    onClick={handleReset}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
                  >
                    <RefreshCcw size={14} /> 다시 만들기
                  </button>
                </div>

                {/* Timeline / Result Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden flex-1">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-1 space-y-0">
                      {generatedCombo.map((move, index) => (
                        <motion.div 
                          key={`${move.id}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex group relative pb-8 last:pb-0 cursor-pointer"
                          onClick={() => setExpandedMoveIndex(expandedMoveIndex === index ? null : index)}
                        >
                          {/* Timeline Line */}
                          {index !== generatedCombo.length - 1 && (
                            <div className="absolute left-[26px] top-10 bottom-0 w-0.5 bg-gray-100 group-hover:bg-rose-100 transition-colors"></div>
                          )}

                          {/* Number Circle */}
                          <div className="relative mr-6">
                            <div className={`w-[52px] h-[52px] rounded-2xl border-2 border-white shadow-lg flex items-center justify-center font-black text-xl transition-all z-10 relative ${
                              expandedMoveIndex === index 
                                ? 'bg-rose-500 text-white scale-110' 
                                : 'bg-gray-50 text-gray-300 group-hover:bg-rose-100 group-hover:text-rose-500'
                            }`}>
                              {index + 1}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="pt-2 flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className={`text-xl font-bold mb-1 transition-colors ${expandedMoveIndex === index ? 'text-rose-500' : 'text-gray-900'}`}>{move.name}</h3>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
                                move.level === 'Novice' ? 'bg-green-50 text-green-600 border-green-100' :
                                move.level === 'Beginner' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                move.level === 'Intermediate' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                'bg-purple-50 text-purple-600 border-purple-100'
                              }`}>
                                {move.level}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">
                              {move.category || 'Basic Technique'}
                            </p>
                            
                            <AnimatePresence>
                              {expandedMoveIndex === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                  className="overflow-hidden rounded-2xl shadow-lg"
                                >
                                  <img src={move.image} alt={move.name} className="w-full h-48 object-cover" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
                      <button 
                        onClick={handleSave}
                        className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all shadow-xl ${
                          isSaved 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-900 text-white hover:bg-black hover:scale-105'
                        }`}
                      >
                        {isSaved ? <CheckCircle2 size={24} /> : <Save size={24} />}
                        {isSaved ? '저장 완료!' : '내 콤보에 저장'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Empty State Placeholder */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full bg-gray-100 rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center text-gray-400"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-500 mb-2">콤보를 만들어보세��!</h3>
                <p className="max-w-xs mx-auto text-sm">
                  왼쪽에서 설정을 선택하고 '콤보 만들기' 버튼을 누르면 나만의 루틴이 생성됩니다.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ComboMakerPage;