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

interface SearchBarProps {
  defaultPlatform?: string;
  defaultValue?: string;
}

export default function SearchBar({ defaultPlatform = 'na1', defaultValue = '' }: SearchBarProps) {
  const [input, setInput] = useState(defaultValue);
  const [platform, setPlatform] = useState(defaultPlatform);
  const router = useRouter();

  function handleSearch() {
    const [name, tag] = input.split('#');
    if (!name || !tag) return alert('Use format: Name#TAG');
    router.push(`/${platform}/${name.trim()}/${tag.trim()}`);
  }

  return (
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
  );
}