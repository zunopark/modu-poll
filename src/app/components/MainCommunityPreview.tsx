import { ChevronRight } from "lucide-react";

const IMAGES = {
    hero_bg:
      "https://images.unsplash.com/photo-1517130038641-a777d040e692?q=80&w=2000&auto=format&fit=crop",
    trick_card:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    place_card:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", // Studio
    combo_bg:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    community_1:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&auto=format&fit=crop",
    community_2:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
  };

  const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );

export const MainCommunityPreview = () => {
    const posts = [
      {
        type: "REVIEW",
        title: "이번 르니끄 신상 착용샷이에요! 💖",
        author: "폴린이101",
        likes: 124,
        image: IMAGES.community_1,
        tag: "폴웨어",
      },
      {
        type: "QUESTION",
        title: "인버트 할 때 갈비뼈가 너무 아파요 ㅠㅠ",
        author: "멍투성이",
        likes: 45,
        image: null,
        tag: "고민상담",
      },
      {
        type: "TIP",
        title: "손땀 많은 분들 그립제 추천합니다 (내돈내산)",
        author: "드라핸즈",
        likes: 89,
        image: IMAGES.community_2,
        tag: "장비추천",
      },
      {
        type: "INFO",
        title: "2026 서울 폴댄스 ���피언십 일정 공지",
        author: "관리자",
        likes: 256,
        image: null,
        tag: "공지사항",
      },
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              커뮤니티 최신글
            </h2>
            <a
              href="#"
              className="text-rose-500 font-medium hover:text-rose-600 flex items-center"
            >
              더보기 <ChevronRight size={18} />
            </a>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-rose-500 bg-white px-2 py-1 rounded-md border border-rose-100">
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">
                    1시간 전
                  </span>
                </div>
  
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 flex-1 group-hover:text-rose-500 transition-colors">
                  {post.title}
                </h3>
  
                {post.image && (
                  <div className="w-full h-32 rounded-lg bg-white mb-4 overflow-hidden">
                    <img
                      src={post.image}
                      alt="Review"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
  
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-6 h-6 bg-white rounded-full mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-rose-400 text-sm">
                    <HeartIcon filled={idx % 2 === 0} />
                    <span className="ml-1">{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };