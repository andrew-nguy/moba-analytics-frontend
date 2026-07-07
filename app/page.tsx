'use client';

import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8 w-full max-w-xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">MOBA Analytics</h1>
          <p className="text-gray-400 mt-2 text-sm">Search any summoner across all regions</p>
        </div>
        <div className="flex w-full rounded-lg overflow-hidden border border-[#2a2d3a]">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}