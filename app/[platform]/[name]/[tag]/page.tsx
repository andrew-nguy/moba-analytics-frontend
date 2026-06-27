'use client';

import { use, useEffect, useState } from 'react';
import { getAccount, getSummoner, getRanked, getMatchIds, getMatch } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import ProfileHeader from '@/components/ProfileHeader';
import RankedCard from '@/components/RankedCard';
import MatchCard from '@/components/MatchCard';

export default function ProfilePage({ params }: { params: Promise<{ platform: string; name: string; tag: string }> }) {
  const { platform, name, tag } = use(params);

  const [account, setAccount] = useState<any>(null);
  const [summoner, setSummoner] = useState<any>(null);
  const [ranked, setRanked] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAll() {
      try {
        const accountData = await getAccount(name, tag, platform);
        setAccount(accountData);

        const [summonerData, rankedData, matchIdData] = await Promise.all([
          getSummoner(accountData.puuid, platform),
          getRanked(accountData.puuid, platform),
          getMatchIds(accountData.puuid, platform),
        ]);

        setSummoner(summonerData);
        setRanked(rankedData);

        const matchDetails = await Promise.all(matchIdData.map((id: string) => getMatch(id, platform)));
        setMatches(matchDetails);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [name, tag, platform]);

  if (loading) return (
    <main className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <p className="text-red-400">{error}</p>
    </main>
  );

  const soloQueue = ranked.find((e: any) => e.queueType === 'RANKED_SOLO_5x5');
  const flexQueue = ranked.find((e: any) => e.queueType === 'RANKED_FLEX_SR');

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
        <SearchBar defaultPlatform={platform} defaultValue={`${name}#${tag}`} />
        <ProfileHeader account={account} summoner={summoner} platform={platform} />
        <div className="grid grid-cols-2 gap-3">
          {[soloQueue, flexQueue].map((entry, i) => entry && (
            <RankedCard key={i} entry={entry} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Recent Matches</h2>
          {matches.map((match: any, index: number) => (
            <MatchCard key={index} match={match} currentPuuid={account?.puuid} />
          ))}
        </div>
      </div>
    </main>
  );
}