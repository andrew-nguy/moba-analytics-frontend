'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PLATFORMS = [
  { value: 'na1', label: 'North America' },
  { value: 'euw1', label: 'Europe West' },
  { value: 'eun1', label: 'Europe Nordic & East' },
  { value: 'kr', label: 'Korea' },
  { value: 'br1', label: 'Brazil' },
  { value: 'la1', label: 'Latin America North' },
  { value: 'la2', label: 'Latin America South' },
  { value: 'oc1', label: 'Oceania' },
  { value: 'tr1', label: 'Turkiye' },
  { value: 'ru', label: 'Russia' },
  { value: 'jp1', label: 'Japan' },
];

export default function Home() {
  const [input, setInput] = useState('');
  const [platform, setPlatform] = useState('na1');
  const router = useRouter();

  function handleSearch() {
    const [name, tag] = input.split('#');
    if (!name || !tag) return alert('Use format: Name#TAG');
    router.push(`/${platform}/${name.trim()}/${tag.trim()}`);
  }

  return (
    <main className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8 w-full max-w-xl px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">LoL Tracker</h1>
          <p className="text-gray-400 mt-2 text-sm">Search any summoner across all regions</p>
        </div>
        <div className="flex w-full rounded-lg overflow-hidden border border-[#2a2d3a]">
          <select
            value={platform}
            onChange={e => setPlatform(e.target.value)}
            className="bg-[#1a1d27] text-gray-300 text-sm px-3 border-r border-[#2a2d3a] outline-none cursor-pointer"
          >
            {PLATFORMS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="PlayerName#TAG"
            className="flex-1 bg-[#1a1d27] text-white placeholder-gray-500 px-4 py-3 outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
}