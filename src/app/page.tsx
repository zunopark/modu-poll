"use client";

import { MainSearch } from "./components/MainSearch";
import { MainFeatures } from "./components/MainFeature";
import { MainTrendingNow } from "./components/MainTrendingNow";
import { MainCommunityPreview } from "./components/MainCommunityPreview";


export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-900">
      <MainSearch />
      <MainFeatures/>
      <MainTrendingNow />
      <MainCommunityPreview />
    </div>
  );
}