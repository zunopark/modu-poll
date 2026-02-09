import { motion } from "motion/react";
import {
  ArrowRight,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const MainFeatures = ({
    onNavigate,
  }: {
    onNavigate: (page: string) => void;
  }) => {
    return (
      <section className="py-16 bg-white relative z-20 px-6 -mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dictionary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onClick={() => {
              onNavigate("dictionary");
              window.scrollTo(0, 0);
            }}
            className="group relative h-[300px] rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=800&auto=format&fit=crop"
                alt="Dictionary"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 w-full">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={12} /> Dictionary
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                동작 백과
              </h3>
              <p className="text-gray-400 text-sm mb-0 group-hover:text-white transition-colors">
                3,000여 개의 폴 기술
              </p>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-rose-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
  
          {/* Place Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => {
              onNavigate("place");
              window.scrollTo(0, 0);
            }}
            className="group relative h-[300px] rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1747326339587-1fe0ef029ed1?q=80&w=800&auto=format&fit=crop"
                alt="Place"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 w-full">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin size={12} /> Place
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                폴 플레이스
              </h3>
              <p className="text-gray-400 text-sm mb-0 group-hover:text-white transition-colors">
                주변 학원/연습실 찾기
              </p>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-emerald-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
  
          {/* Combo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => {
              onNavigate("combo");
              window.scrollTo(0, 0);
            }}
            className="group relative h-[300px] rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1560088224-0c3807b8089e?q=80&w=800&auto=format&fit=crop"
                alt="Combo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 w-full">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={12} /> Generator
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                콤보 메이커
              </h3>
              <p className="text-gray-400 text-sm mb-0 group-hover:text-white transition-colors">
                레벨별 맞춤 ��보 생성
              </p>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-purple-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
  
          {/* Community Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => {
              onNavigate("community");
              window.scrollTo(0, 0);
            }}
            className="group relative h-[300px] rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767128890940-6dfe3d9fc3db?q=80&w=800&auto=format&fit=crop"
                alt="Community"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 w-full">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp size={12} /> Community
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                커뮤니티
              </h3>
              <p className="text-gray-400 text-sm mb-0 group-hover:text-white transition-colors">
                리얼 리뷰와 소통
              </p>
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-blue-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };