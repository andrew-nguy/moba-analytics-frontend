'use client';

import { use, useEffect, useState } from 'react';
import { getAccount, getSummoner, getRanked, getMatchIds, getMatch, getRecentMatchSummary, ApiError, type RecentMatchSummary } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import ProfileHeader from '@/components/ProfileHeader';
import RankedCard from '@/components/RankedCard';
import MatchCard from '@/components/MatchCard';
import SummonerNotFound from '@/components/errors/SummonerNotFoundError';
import ServerError from '@/components/errors/ServerError';
import RateLimitedError from '@/components/errors/RateLimitedError';

export default function ProfilePage({ params }: { params: Promise<{ platform: string; name: string; tag: string }> }) {
  const { platform, name, tag } = use(params);

  const [account, setAccount] = useState<any>(null);
  const [summoner, setSummoner] = useState<any>(null);
  const [ranked, setRanked] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [recentSummary, setRecentSummary] = useState<RecentMatchSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  async function handleGenerateSummary() {
    if (!account?.puuid) return;

    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const result = await getRecentMatchSummary(account.puuid, platform);
      setRecentSummary(result);
    } catch (err) {
      setSummaryError(err instanceof ApiError ? err.message : 'Could not load the recent match summary. Please try again.');
    } finally {
      setSummaryLoading(false);
    }
  }

  useEffect(() => {
    setRecentSummary(null);
    setSummaryError(null);
    setSummaryLoading(false);

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
        if (err instanceof ApiError) {
          setErrorStatus(err.status);
        }
        else {
          setErrorStatus(500);
        }
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

  const soloQueue = ranked.find((e: any) => e.queueType === 'RANKED_SOLO_5x5');
  const flexQueue = ranked.find((e: any) => e.queueType === 'RANKED_FLEX_SR');

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
        <SearchBar defaultPlatform={platform} defaultValue={`${name}#${tag}`} />

        {errorStatus === null ? (
          <>
            <ProfileHeader
              account={account}
              summoner={summoner}
              platform={platform}
              action={(
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={summaryLoading}
                  className="w-full rounded-lg border border-blue-500/40 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  {summaryLoading ? 'Generating summary…' : recentSummary ? 'Regenerate summary' : 'Generate match summary'}
                </button>
              )}
            />

            {summaryError && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {summaryError}
              </p>
            )}

            {recentSummary && (
              <section aria-live="polite" className="rounded-xl border border-[#2a2d3a] bg-[#1a1d27] p-5">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">Recent Match Summary</h2>
                {!recentSummary.summaryGenerated && recentSummary.gamesAnalyzed > 0 && (
                  <p className="mb-2 text-xs text-amber-300">AI summary is unavailable right now; showing a basic summary.</p>
                )}
                <p className="text-sm leading-relaxed text-gray-100">{recentSummary.summary}</p>
              </section>
            )}

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
          </>
        ) : errorStatus === 404 ? (
          <SummonerNotFound name={name} tag={tag} platform={platform} />
        ) : errorStatus === 429 ? (
          <RateLimitedError />
        ) : (
          <ServerError />
        )}
      </div>
    </main>
  );
}
