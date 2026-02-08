import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  MessageSquare, 
  Eye, 
  Share2, 
  MoreVertical,
  ThumbsUp,
  User
} from 'lucide-react';
import { Post } from '../data/community';
import { motion } from 'motion/react';

interface CommunityDetailPageProps {
  post: Post;
  onBack: () => void;
}

const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({ post, onBack }) => {
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const categoryColors = {
    "전체": "bg-gray-100 text-gray-600",
    "공지": "bg-red-50 text-red-500",
    "자유": "bg-blue-50 text-blue-500",
    "리뷰": "bg-purple-50 text-purple-500",
    "질문": "bg-amber-50 text-amber-500",
    "팁": "bg-emerald-50 text-emerald-500",
  };

  return (
    <div className="min-h-screen bg-white pb-20 pt-[80px]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            목록으로
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Post Header */}
        <div className="mb-8 border-b border-gray-100 pb-8">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${categoryColors[post.category]}`}>
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <User size={20} />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{post.author}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{post.date}</span>
                  <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="min-h-[200px] mb-12">
            {post.image && (
                <div className="mb-8 rounded-2xl overflow-hidden bg-gray-50">
                    <img src={post.image} alt="Content" className="w-full h-auto object-cover max-h-[500px]" />
                </div>
            )}
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                {post.content || "내용이 없습니다."}
            </p>
        </div>

        {/* Like Button */}
        <div className="flex justify-center mb-16">
            <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-sm border ${
                    isLiked 
                    ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-rose-100' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
                <ThumbsUp size={20} className={isLiked ? "fill-current" : ""} />
                <span>추천 {likes}</span>
            </button>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-rose-500" />
                댓글 <span className="text-gray-500 font-medium">{post.comments}</span>
            </h3>

            {/* Comment Input */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-200">
                    <User size={20} />
                </div>
                <div className="flex-1">
                    <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="댓글을 남겨보세요."
                        className="w-full h-24 p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 resize-none bg-white mb-2 text-sm"
                    />
                    <div className="flex justify-end">
                        <button 
                            disabled={!commentText.trim()}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>

            {/* Comment List (Mock) */}
            <div className="space-y-6">
                {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-200">
                            <span className="text-xs font-bold text-gray-500">U{idx+1}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-gray-900 text-sm">익명 유저 {idx+1}</span>
                                <span className="text-xs text-gray-400">1시간 전</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                {idx === 0 ? "정말 좋은 정보네요! 감사합니다." : idx === 1 ? "저도 이거 써봤는데 좋더라고요~" : "다음 편도 기대됩니다!"}
                            </p>
                            <button className="text-xs text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1">
                                <Heart size={10} /> 좋아요 0
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;