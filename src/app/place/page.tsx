"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Navigation, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PLACES, REGIONS, Place } from '../data/places';
import PlaceReviewModal from './components/page';

const PolePlacePage = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [hoveredPlaceId, setHoveredPlaceId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filteredPlaces = PLACES.filter(place => {
    const matchesRegion = selectedRegion === "전체" || place.region === selectedRegion;
    const matchesSearch = place.name.includes(searchTerm) || 
                          place.address.includes(searchTerm) || 
                          place.tags.some(tag => tag.includes(searchTerm));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-20 pt-[80px] flex flex-col lg:flex-row h-screen overflow-hidden">
      
      <AnimatePresence>
        {selectedPlace && (
          <PlaceReviewModal 
            place={selectedPlace} 
            isLoggedIn={!!isLoggedIn} 
            onClose={() => setSelectedPlace(null)} 
          />
        )}
      </AnimatePresence>

      {/* --- Left Column: List & Filters (Scrollable) --- */}
      <div className="w-full lg:w-[450px] flex flex-col bg-white z-20 border-r border-gray-200 h-full">
        
        {/* Header Section */}
        <div className="p-6 pb-4 bg-white sticky top-0 z-30 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="text-rose-500" />
            폴 플레이스
          </h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="학원명, 지역, 태그 검색" 
              className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 transition-colors text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Region Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedRegion === region 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Place List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                onClick={() => setSelectedPlace(place)}
                onMouseEnter={() => setHoveredPlaceId(place.id)}
                onMouseLeave={() => setHoveredPlaceId(null)}
                className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                  hoveredPlaceId === place.id 
                    ? 'bg-rose-50 border-rose-200 shadow-md transform scale-[1.02]' 
                    : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  {hoveredPlaceId === place.id && (
                    <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                      <MapPin className="text-white drop-shadow-md" size={24} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-lg truncate pr-2 ${
                      hoveredPlaceId === place.id ? 'text-rose-600' : 'text-gray-900'
                    }`}>
                      {place.name}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap mt-1">{place.region}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2 truncate">{place.address}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {place.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button 
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle phone call logic or just let it bubble if needed, but usually specific buttons shouldn't trigger the card click
                        }}
                    >
                      <Phone size={12} /> 전화
                    </button>
                    <button 
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-100 text-gray-900 text-xs font-medium hover:bg-gray-200 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle instagram logic
                        }}
                    >
                      <Instagram size={12} /> 인스타
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={24} />
              </div>
              <p className="text-gray-500 font-medium">검색 결과가 없습니다.</p>
              <button 
                onClick={() => {
                  setSelectedRegion('전체');
                  setSearchTerm('');
                }}
                className="mt-4 text-rose-500 text-sm font-bold hover:underline"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Right Column: Mock Map Area --- */}
      <div className="hidden lg:block flex-1 relative bg-gray-100 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[#e8eaf6] opacity-60">
           {/* Grid Pattern to simulate map */}
           <div className="absolute inset-0" style={{ 
             backgroundImage: 'linear-gradient(#dbe0f0 1px, transparent 1px), linear-gradient(90deg, #dbe0f0 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}></div>
        </div>
        
        {/* Placeholder Map Image (Abstract) */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply grayscale"
          alt="Map Background"
        />

        {/* Map Controls (Visual Only) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
            <Navigation size={20} />
          </button>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
             <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold border-b border-gray-100">+</button>
             <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">-</button>
          </div>
        </div>

        {/* Region Label Overlay */}
        {selectedRegion !== '전체' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg"
          >
            📍 {selectedRegion}
          </motion.div>
        )}

        {/* Map Pins */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {filteredPlaces.map((place) => (
              <motion.div
                key={place.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ 
                  left: `${place.x}%`, 
                  top: `${place.y}%`,
                  position: 'absolute',
                  transform: 'translate(-50%, -100%)' // Anchor at bottom center
                }}
                className="z-0 hover:z-50"
              >
                {/* Pin Element */}
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedPlace(place)}
                  onMouseEnter={() => setHoveredPlaceId(place.id)}
                  onMouseLeave={() => setHoveredPlaceId(null)}
                >
                  <div className={`relative flex flex-col items-center transition-transform duration-300 ${
                    hoveredPlaceId === place.id ? 'scale-125 -translate-y-2' : ''
                  }`}>
                    {/* Tooltip Label (Always visible on hover or if place is selected in list) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredPlaceId === place.id ? 1 : 0, y: hoveredPlaceId === place.id ? 0 : 10 }}
                      className="absolute bottom-full mb-2 bg-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap pointer-events-none z-50 flex flex-col items-center border border-gray-100"
                    >
                      <span className="text-gray-900">{place.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{place.tags[0]}</span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                    </motion.div>

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors border-2 ${
                      hoveredPlaceId === place.id 
                        ? 'bg-rose-500 border-white text-white z-20' 
                        : 'bg-white border-white text-rose-500 z-10'
                    }`}>
                       <MapPin fill={hoveredPlaceId === place.id ? "currentColor" : "none"} size={20} />
                    </div>
                    {/* Shadow pulse */}
                    {hoveredPlaceId === place.id && (
                      <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-30"></div>
                    )}
                    {/* Anchor point */}
                    <div className="w-2 h-1 bg-black/20 rounded-full mt-1 blur-[1px]"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Mobile View Map Notice */}
        <div className="lg:hidden absolute inset-0 bg-white flex items-center justify-center p-6 text-center">
          <div>
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">지도는 데스크탑 환경에서<br/>확인하실 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolePlacePage;