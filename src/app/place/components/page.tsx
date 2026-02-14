"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Upload, MapPin, Camera } from 'lucide-react';
import { Place } from '../../data/places';

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  images?: string[];
}

// Mock reviews data
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "폴린이101",
    rating: 5,
    content: "시설도 깨끗하고 선생님들이 정말 친절하게 알려주세요! 주차도 편리해서 자주 가게 됩니다.",
    date: "2026.02.01",
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop"]
  },
  {
    id: 2,
    author: "유연한나무",
    rating: 4,
    content: "층고가 높아서 좋아요. 다만 저녁 시간에는 사람이 좀 붐비는 편입니다.",
    date: "2026.01.28",
  },
  {
    id: 3,
    author: "근육몬",
    rating: 5,
    content: "최고의 시설! 오픈폴 예약하기도 편하고 조명 맛집이라 영상 찍기 좋습니다.",
    date: "2026.01.15",
    images: ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop"]
  }
];

interface PlaceReviewModalProps {
  place: Place;
  isLoggedIn: boolean;
  onClose: () => void;
}

const PlaceReviewModal = ({ place, isLoggedIn, onClose }: PlaceReviewModalProps) => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newRating, setNewRating] = useState(0);
  const [newContent, setNewContent] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newContent.trim()) return;

    const newReview: Review = {
      id: reviews.length + 1,
      author: "나(로그인됨)", // Mock user name
      rating: newRating,
      content: newContent,
      date: new Date().toLocaleDateString(),
      images: newImages.length > 0 ? newImages : undefined,
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewContent("");
    setNewImages([]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 flex-shrink-0">
            <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            >
                <X size={18} />
            </button>
            <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                    <MapPin size={14} />
                    {place.region}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{place.name}</h2>
                <div className="flex flex-wrap gap-2">
                    {place.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
            {/* Write Review Section (Only if Logged In) */}
            {isLoggedIn ? (
                <div className="mb-8 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Camera className="text-rose-500" size={18} />
                        리뷰 작성하기
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    className={`transition-colors ${star <= newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                >
                                    <Star size={24} />
                                </button>
                            ))}
                            <span className="ml-2 text-sm text-gray-500 font-medium">
                                {newRating > 0 ? `${newRating}점` : '별점을 선택해주세요'}
                            </span>
                        </div>
                        
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="이 학원에 대한 솔직한 리뷰를 남겨주세요."
                            className="w-full h-24 p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-rose-500 resize-none text-sm mb-3"
                        />
                        
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                            >
                                <Upload size={16} />
                                <span className="text-xs">사진 추가</span>
                            </button>
                            <button
                                type="submit"
                                disabled={newRating === 0 || !newContent.trim()}
                                className={`px-4 py-2 rounded-lg text-white font-bold text-sm transition-all ${
                                    newRating > 0 && newContent.trim() 
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-md' 
                                    : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                등록하기
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-3">로그인하고 리뷰를 남겨보세요!</p>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                        로그인 후 작성 가능
                    </button>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                <h3 className="font-bold text-gray-900 text-lg">
                    리뷰 <span className="text-rose-500">{reviews.length}</span>
                </h3>
                
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900">{review.author}</div>
                                    <div className="text-xs text-gray-400">{review.date}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={12} 
                                        className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} 
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {review.content}
                        </p>
                        
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {review.images.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt="Review" 
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-100" 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaceReviewModal;