
import { motion } from "motion/react";
import {
  Search,
} from "lucide-react";

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

export const MainSearch = () => {
    return (
      <section className="relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background with blur and overlay */}
        <div className="absolute inset-0 z-0 bg-gray-950">
          <img
            src={IMAGES.hero_bg}
            alt="Pole Dance Background"
            className="w-full h-full object-cover opacity-50 mix-blend-overlay scale-105 blur-[2px]"
          />
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700" />
        </div>
  
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center text-center mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Refined Glassmorphism Search Bar */}
            <div className="w-full relative group">
              {/* Animated Glow Border - Changed to White/Subtle */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-white/20 via-white/50 to-white/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />
  
              <div className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full p-1.5 shadow-2xl transition-all hover:bg-white/20 hover:border-white/30">
                <Search className="text-white/70 w-5 h-5 ml-4 mr-3" />
                <input
                  type="text"
                  placeholder="동작, 콤보, 학원 검색..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-base font-medium h-11"
                />
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 h-10 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-rose-500/30 active:scale-95">
                  Search
                </button>
              </div>
            </div>
  
            {/* Chip Style Keywords */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {[
                "#아이샤",
                "#핸드스프링",
                "#제이드",
                "#큐피트",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all text-xs font-medium backdrop-blur-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };