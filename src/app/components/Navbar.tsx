"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export const Navbar = () => {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const navLinks = [
      { name: "동작백과", href: "/moves" },
      { name: "콤보메이커", href: "/combo" },
      { name: "폴플레이스", href: "/place" },
      { name: "커뮤니티", href: "/community" },
    ];
  
    const handleNavClick = () => {
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
    };
  
    const isHome = pathname === "/";
    const isTransparentWithWhiteText = isHome && !isScrolled;
  
    const logoColor = isTransparentWithWhiteText ? "text-white" : "text-gray-900";
    const menuTextColor = isTransparentWithWhiteText
      ? "text-gray-200 hover:text-white hover:bg-white/10"
      : "text-gray-600 hover:text-rose-500 hover:bg-gray-50";
    const menuIconColor = isTransparentWithWhiteText ? "text-white" : "text-gray-900";
  
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          !isTransparentWithWhiteText
            ? "bg-white/90 backdrop-blur-xl border-gray-200/50 py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 z-50 cursor-pointer"
            onClick={handleNavClick}
          >
            <span
              className={`text-2xl font-black tracking-tighter ${logoColor}`}
            >
              MODU<span className="text-rose-500">POLE</span>
            </span>
          </Link>
  
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`px-5 py-2 rounded-full text-[15px] font-medium transition-all ${menuTextColor} ${pathname === item.href ? (isTransparentWithWhiteText ? "text-white font-semibold" : "text-rose-500 font-semibold") : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
  
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <Link
                href="/mypage"
                onClick={handleNavClick}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform hover:scale-110"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={handleNavClick}
                className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-rose-500/50"
              >
                시작하기
              </Link>
            )}
          </div>
  
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-gray-900" />
            ) : (
              <Menu className={menuIconColor} />
            )}
          </button>
        </div>
  
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-40 pt-24 px-6 lg:hidden"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between p-4 border-b border-gray-50 text-lg font-bold text-gray-900 active:bg-gray-50 w-full"
                  >
                    {item.name}
                    <ChevronRight
                      className="text-gray-300"
                      size={20}
                    />
                  </Link>
                ))}
                <div className="pt-8 flex flex-col gap-3">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-gray-900">
                          폴린이
                        </div>
                        <div className="text-xs text-gray-500">
                          mypage@modupole.com
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={handleNavClick}
                      className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-center block"
                    >
                      시작하기
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  };