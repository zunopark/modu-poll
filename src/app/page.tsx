"use client";

import { useRouter } from "next/navigation";
import { MainSearch } from "./components/MainSearch";
import { MainFeatures } from "./components/MainFeature";
import { TrendingNow } from "./components/TrendingNow";
import { CommunityPreview } from "./components/CommunityPreview";

export default function App() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-rose-100 selection:text-rose-900">
      <MainSearch />
      <MainFeatures
        onNavigate={(page) => {
          const path = page.startsWith("/") ? page : `/${page}`;
          router.push(path);
        }}
      />
      <TrendingNow />
      <CommunityPreview />
    </div>
  );
}