'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MoreVertical, 
  ThumbsUp,
  User,
  CornerDownRight,
  Camera,
  Eye,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  isReply?: boolean;
}

interface CommunityPostDetailProps {
  postId: number;
  onBack: () => void;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "폴린이101",
    content: "와 진짜 너무 멋져요! 저도 언젠가는 꼭 성공하고 싶네요 ㅠㅠ 혹시 연습하는데 얼마나 걸리셨나요?",
    date: "2026.02.06 14:30",
    likes: 12
  },
  {
    id: 2,
    author: "작성자",
    content: "감사합니다! 저는 유연성이 부족해서 3개월 정도 꼬박 스트레칭하고 연습했던 것 같아요. 포기하지 마세요!",
    date: "2026.02.06 14:35",
    likes: 5,
    isReply: true
  },
  {
    id: 3,
    author: "근육몬",
    content: "자세가 정말 완벽하시네요. 어깨 각도가 예술입니다.",
    date: "2026.02.06 15:00",
    likes: 8
  }
];

const CommunityPostDetailPage: React.FC<CommunityPostDetailProps> = ({ postId, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(156);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock Data - In a real app, fetch based on postId
  const post = {
    id: postId,
    title: "폴댄스 6개월 차, 드디어 아이샤 성공했습니다! 😭",
    category: "자유",
    author: "폴린이101",
    authorLevel: "Lv.3",
    date: "2026.02.06 13:00",
    views: 1250,
    content: `
      <p>여러분 드디어 제가 아이샤를 성공했습니다!! ㅠㅠ</p>
      <br />
      <p>처음에는 엘보도 너무 아프고 중심 잡기도 힘들어서 몇 번이나 포기하고 싶었는데,</p>
      <p>선생님이 알려주신 팁대로 어깨를 더 열고 코어에 힘을 빡 주니까 거짓말처럼 딱 버텨지더라구요.</p>
      <br />
      <p>아직 유지 시간은 3초 정도밖에 안 되지만... 그래도 너무 뿌듯합니다.</p>
      <p>같이 응원해주신 학원 분들 너무 감사해요!</p>
      <br />
      <p>다음 목표는 핸드스프링입니다! 🔥</p>
    `,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
    ]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleReply = (commentId: number) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(commentId);
      setReplyText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-[80px]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          목록으로 돌아가기
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-sm font-bold">
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{post.author}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">{post.authorLevel}</span>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span>{post.date}</span>
                    <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-800 mb-10">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {post.images && post.images.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden mb-8 border border-gray-100">
                <img src={img} alt="Post Content" className="w-full h-auto" />
              </div>
            ))}

            {/* Like Action */}
            <div className="flex justify-center py-8">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 font-medium ${
                  isLiked 
                    ? "bg-rose-50 border border-rose-200 text-rose-500 shadow-sm" 
                    : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-rose-500"
                }`}
              >
                <ThumbsUp size={20} className={isLiked ? "fill-current" : ""} />
                <span className="text-lg">{likesCount}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50/50 p-8 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              댓글 <span className="text-rose-500">{MOCK_COMMENTS.length}</span>
            </h3>

            {/* Comment Input */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-8 shadow-sm">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="따뜻한 댓글을 남겨주세요."
                className="w-full h-20 resize-none outline-none text-sm mb-3 placeholder-gray-400"
              />
              <div className="flex justify-between items-center">
                <button className="text-gray-400 hover:text-rose-500 p-2 rounded-full hover:bg-rose-50 transition-all">
                  <Camera size={20} />
                </button>
                <button 
                  disabled={!commentText.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    commentText.trim() 
                      ? "bg-gray-900 text-white hover:bg-gray-800" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  등록
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {MOCK_COMMENTS.map((comment) => (
                <div key={comment.id} className={`flex flex-col gap-2 ${comment.isReply ? "pl-12" : ""}`}>
                  <div className="flex gap-4">
                    {comment.isReply && (
                      <CornerDownRight className="text-gray-300 flex-shrink-0 mt-2" size={20} />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${comment.author === "작성자" ? "text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded" : "text-gray-900"}`}>
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <button className="text-gray-300 hover:text-gray-500">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-2 bg-white p-3 rounded-lg border border-gray-100 shadow-sm inline-block min-w-[50%]">
                        {comment.content}
                      </p>
                      
                      {/* Comment Actions - Subtler */}
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 pl-1">
                        <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <Heart size={12} /> {comment.likes}
                        </button>
                        <button 
                          onClick={() => toggleReply(comment.id)}
                          className="hover:text-gray-600 transition-colors font-medium"
                        >
                          답글
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply Input Area */}
                  {replyingTo === comment.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 mt-2 ${comment.isReply ? "pl-12" : "pl-12"}`}
                    >
                      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-1 flex items-center focus-within:border-rose-300 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`${comment.author}님에게 답글 작성...`}
                          className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                          autoFocus
                        />
                        <button 
                          disabled={!replyText.trim()}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-md transition-colors disabled:text-gray-300 disabled:hover:bg-transparent"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPage;