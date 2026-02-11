"use client";

import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  MessageCircle,
  Megaphone,
  HelpCircle,
  PenTool,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { ALL_POSTS, Category, POPULAR_POSTS } from '../data/community';
import { useRouter } from 'next/navigation';

// --- Types ---
type SortOption = "latest" | "popular";

// --- Components ---

const CategoryBadge = ({ category }: { category: Category }) => {
  const colors = {
    "전체": "bg-gray-100 text-gray-600",
    "공지": "bg-red-50 text-red-500",
    "자유": "bg-blue-50 text-blue-500",
    "리뷰": "bg-purple-50 text-purple-500",
    "질문": "bg-amber-50 text-amber-500",
    "팁": "bg-emerald-50 text-emerald-500",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold ${colors[category] || colors["전체"]}`}>
      {category}
    </span>
  );
};

const CommunityPage: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>("전체");
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  // Filter and Sort Logic
  const filteredPosts = ALL_POSTS.filter(post => {
    const matchesCategory = currentCategory === "전체" || post.category === currentCategory;
    const matchesSearch = post.title.includes(searchTerm) || post.author.includes(searchTerm);
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (currentSort === "popular") return b.likes - a.likes;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories: { label: Category; icon: any }[] = [
    { label: "전체", icon: MessageCircle },
    { label: "공지", icon: Megaphone },
    { label: "자유", icon: MessageSquare },
    { label: "리뷰", icon: Star },
    { label: "질문", icon: HelpCircle },
    { label: "팁", icon: PenTool },
  ];

  const handlePostClick = (id: number) => {
    router.push(`/community/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <MessageCircle className="text-rose-500" /> 커뮤니티
          </h1>
          <p className="text-gray-500">
            폴댄스에 대한 모든 이야기를 자유롭게 나눠보세요.
          </p>
        </div>

        {/* Popular Posts Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-rose-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900">실시간 인기글</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_POSTS.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ y: -5 }}
                onClick={() => handlePostClick(post.id)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <CategoryBadge category={post.category} />
                  <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                    <Heart size={12} fill="currentColor" /> {post.likes}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 flex-1">
                  {post.title}
                </h3>

                {post.image && (
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img src={post.image} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-600">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Board Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setCurrentCategory(cat.label);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    currentCategory === cat.label
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
              <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button 
                  onClick={() => setCurrentSort("latest")}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    currentSort === "latest" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  최신순
                </button>
                <button 
                  onClick={() => setCurrentSort("popular")}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    currentSort === "popular" ? "bg-white text-rose-500 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  인기순
                </button>
              </div>
            </div>
          </div>

          {/* List Header (Desktop) - REMOVED ID COLUMN */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 text-xs font-bold text-gray-500 border-b border-gray-100">
            <div className="col-span-1 text-center">분류</div>
            <div className="col-span-7">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-2 text-center">작성일/조회</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-100">
            {currentPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="group p-6 md:py-4 hover:bg-rose-50/30 transition-colors cursor-pointer"
              >
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <CategoryBadge category={post.category} />
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span className="font-medium">{post.author}</span>
                    <div className="flex items-center gap-3">
                       <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                       <span className="flex items-center gap-1 text-rose-400"><Heart size={12} /> {post.likes}</span>
                       <span className="flex items-center gap-1 text-blue-400"><MessageSquare size={12} /> {post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - ADJUSTED COLUMNS */}
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 text-center">
                    <CategoryBadge category={post.category} />
                  </div>
                  <div className="col-span-7">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors truncate">
                        {post.title}
                      </h3>
                      {post.image && <CameraIcon />}
                      {post.comments > 0 && (
                        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-1.5 rounded">
                          {post.comments}
                        </span>
                      )}
                      {post.category === "공지" && (
                         <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm text-gray-600">
                    {post.author}
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="flex items-center gap-0.5"><Eye size={10} /> {post.views}</span>
                        <span className="flex items-center gap-0.5"><Heart size={10} /> {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-100 flex justify-center items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(1, prev - 1)); }}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const pageNum = i + 1; // Simplified for demo
                return (
                  <button
                    key={pageNum}
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(pageNum); }}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

        </section>
      </div>
    </div>
  );
};

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

export default CommunityPage;