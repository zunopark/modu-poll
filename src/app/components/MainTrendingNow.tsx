import { TrendingUp } from "lucide-react";

export const MainTrendingNow = () => {
    const trendingItems = [
      {
        rank: 1,
        title: "러시안 스플릿",
        category: "고급 기술",
        diff: "up",
      },
      {
        rank: 2,
        title: "입문용 3동작 콤���",
        category: "콤보 추천",
        diff: "same",
      },
      {
        rank: 3,
        title: "SL스포츠 신상 리뷰",
        category: "폴웨어",
        diff: "up",
      },
      {
        rank: 4,
        title: "아이샤 성공 꿀팁",
        category: "노하우",
        diff: "down",
      },
      {
        rank: 5,
        title: "강남 폴스튜디오 추천",
        category: "���원 정보",
        diff: "up",
      },
    ];
  
    return (
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
                <TrendingUp size={20} />
                <span>Trending Now</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                실시간 인기 검색어
              </h2>
            </div>
            <span className="text-sm text-gray-400">
              2026.02.07 14:00 기준
            </span>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingItems.map((item) => (
              <div
                key={item.rank}
                className="bg-gray-50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all p-5 rounded-2xl border border-transparent hover:border-gray-100 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-xl font-black ${item.rank <= 3 ? "text-rose-500" : "text-gray-300"}`}
                  >
                    {item.rank}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${item.diff === "up" ? "bg-red-50 text-red-500" : item.diff === "down" ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-400"}`}
                  >
                    {item.diff === "up"
                      ? "▲"
                      : item.diff === "down"
                        ? "▼"
                        : "-"}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 truncate group-hover:text-rose-500 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };