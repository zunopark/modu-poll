// my page test

'use client';

import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Edit2, 
  Settings, 
  Grid, 
  MessageSquare, 
  MapPin, 
  ChevronRight, 
  MoreVertical,
  Trash2,
  X,
  Play,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Mock Data ---
const MY_POSTS = [
  {
    id: 1,
    title: "폴댄스 3개월차, 드디어 아이샤 성공했습니다! 😭",
    category: "자유",
    date: "2026.02.06",
    likes: 156,
    comments: 42,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "오늘 배운 콤보 기록 (도브 - 피터팬 - 클라임)",
    category: "자유",
    date: "2026.02.01",
    likes: 45,
    comments: 12,
    image: null
  },
  {
    id: 3,
    title: "그립제 추천해주세요! 손땀이 너무 많아요",
    category: "질문",
    date: "2026.01.28",
    likes: 23,
    comments: 8,
    image: null
  }
];

const MY_COMBOS = [
  {
    id: 1,
    name: "초급 졸업 작품 콤보",
    date: "2026.02.05",
    moves: [
      { name: "체어", image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=200&auto=format&fit=crop" },
      { name: "백훅", image: "https://images.unsplash.com/photo-1560088224-0c3807b8089e?q=80&w=200&auto=format&fit=crop" },
      { name: "헐리우드", image: "https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=200&auto=format&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "스피닝 폴 루틴 A",
    date: "2026.01.20",
    moves: [
      { name: "에어워크", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=200&auto=format&fit=crop" },
      { name: "팅커벨", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop" },
      { name: "P포즈", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=200&auto=format&fit=crop" },
      { name: "다운", image: "https://images.unsplash.com/photo-1767128890940-6dfe3d9fc3db?q=80&w=200&auto=format&fit=crop" }
    ]
  }
];

const MY_REVIEWS = [
  {
    id: 1,
    placeName: "르폴 스튜디오 강남점",
    rating: 5,
    content: "채광이 너무 좋아서 사진이 잘 나와요! 층고도 높고 시설도 깨끗합니다.",
    date: "2026.02.03",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    placeName: "타임 폴웨어",
    rating: 4,
    content: "배송도 빠르고 디자인도 예쁜데 사이즈가 살짝 작게 나온 것 같아요.",
    date: "2026.01.15",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop"
  }
];

interface MyPageProps {
  onNavigate: (page: string) => void;
}

const MyPage: React.FC<MyPageProps> = ({ onNavigate }) => {
  // State
  const [activeTab, setActiveTab] = useState<'posts' | 'combos' | 'reviews'>('posts');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nickname, setNickname] = useState("하늘을나는다람쥐"); // Random default nickname
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop");
  const [selectedCombo, setSelectedCombo] = useState<typeof MY_COMBOS[0] | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  const handleNicknameSave = () => {
    if (nickname.trim()) {
      setIsEditingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-rose-100 to-purple-100 opacity-50"></div>
            
            <div className="relative flex flex-col md:flex-row items-center gap-6 mt-4">
                {/* Profile Image */}
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full hover:bg-rose-500 transition-colors shadow-lg border-2 border-white"
                    >
                        <Camera size={16} />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange} 
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        {isEditingName ? (
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="text-2xl font-bold text-gray-900 border-b-2 border-rose-500 outline-none bg-transparent w-auto min-w-[150px] text-center md:text-left px-1"
                                    autoFocus
                                />
                                <button 
                                    onClick={handleNicknameSave}
                                    className="p-1.5 bg-rose-500 text-white rounded-md hover:bg-rose-600"
                                >
                                    <Check size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold text-gray-900">{nickname}</h1>
                                <button 
                                    onClick={() => setIsEditingName(true)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <Edit2 size={16} />
                                </button>
                            </>
                        )}
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4">mypage@modupole.com</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-lg text-xs font-bold border border-rose-100">
                            Lv.3 중급자
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold">
                            가입일 D+124
                        </span>
                    </div>
                </div>

                {/* Settings Button */}
                <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
            {[
                { id: 'posts', label: '내가 쓴 글', icon: MessageSquare },
                { id: 'combos', label: '저장한 콤보', icon: Grid },
                { id: 'reviews', label: '내 후기', icon: MapPin },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                            ? "bg-gray-900 text-white shadow-md" 
                            : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    <tab.icon size={16} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Section */}
        <div className="space-y-4">
            
            {/* 1. My Posts */}
            {activeTab === 'posts' && (
                <div className="space-y-4">
                    {MY_POSTS.map((post) => (
                        <div key={post.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">{post.category}</span>
                                    <span className="text-xs text-gray-400">{post.date}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors line-clamp-1">{post.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span>좋아요 {post.likes}</span>
                                    <span>댓글 {post.comments}</span>
                                </div>
                            </div>
                            {post.image && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={post.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 2. My Combos */}
            {activeTab === 'combos' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MY_COMBOS.map((combo) => (
                        <div 
                            key={combo.id} 
                            onClick={() => setSelectedCombo(combo)}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 group-hover:text-purple-500 transition-colors">{combo.name}</h3>
                                <button className="text-gray-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4">
                                {combo.moves.slice(0, 3).map((move, idx) => (
                                    <div key={idx} className="relative w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden -ml-2 first:ml-0 z-10">
                                        <img src={move.image} alt={move.name} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                {combo.moves.length > 3 && (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-500 -ml-2 z-0">
                                        +{combo.moves.length - 3}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
                                <span>{combo.date} 저장됨</span>
                                <span className="flex items-center gap-1 font-bold text-purple-500">
                                    상세보기 <ChevronRight size={14} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 3. My Reviews */}
            {activeTab === 'reviews' && (
                <div className="space-y-4">
                    {MY_REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-4">
                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={review.image} alt="Place" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-gray-900">{review.placeName}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <MoreVertical size={16} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 mb-2 text-yellow-400 text-xs">
                                        {"★".repeat(review.rating)}
                                        <span className="text-gray-300">{"★".repeat(5 - review.rating)}</span>
                                        <span className="text-gray-400 ml-1 text-[10px]">{review.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Combo Detail Modal */}
        <AnimatePresence>
            {selectedCombo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCombo(null)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex items-center justify-between z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedCombo.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{selectedCombo.date} 생성됨</p>
                            </div>
                            <button 
                                onClick={() => setSelectedCombo(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {selectedCombo.moves.map((move, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                        <img src={move.image} alt={move.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 font-bold text-gray-900">
                                        {move.name}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
                                <Play size={20} fill="currentColor" />
                                콤보 슬라이드 재생하기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default MyPage;