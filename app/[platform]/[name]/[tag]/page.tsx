'use client';

import { use, useEffect, useState } from 'react';
import { getAccount, getSummoner, getRanked, getMatchIds, getMatch } from '@/lib/api';
import SearchBar from '@/components/SearchBar';

export default function ProfilePage({ params }: { params: Promise<{ platform: string; name: string; tag: string }> }) {
  const { platform, name, tag } = use(params);

  const [account, setAccount] = useState<any>(null);
  const [summoner, setSummoner] = useState<any>(null);
  const [ranked, setRanked] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

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

        {/* Summoner Header */}
        <div className="flex items-center gap-4 bg-[#1a1d27] rounded-xl p-6 border border-[#2a2d3a]">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${summoner?.profileIconId}.png`}
            alt="Profile Icon"
            className="w-16 h-16 rounded-full border border-[#2a2d3a]"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {account?.gameName}
              <span className="text-gray-400 font-normal text-lg"> #{account?.tagLine}</span>
            </h1>
            <p className="text-gray-400 text-sm">{platform.toUpperCase()} · Level {summoner?.summonerLevel}</p>
          </div>
        </div>

        {/* Ranked Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[soloQueue, flexQueue].map((entry, i) => entry && (
            <div key={i} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">
                {entry.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo/Duo' : 'Ranked Flex'}
              </p>
              <p className="text-lg font-semibold">{entry.tier} {entry.rank}</p>
              <p className="text-gray-400 text-sm">{entry.leaguePoints} LP</p>
              <p className="text-gray-400 text-sm">{entry.wins}W {entry.losses}L · {Math.round((entry.wins / (entry.wins + entry.losses)) * 100)}%</p>
            </div>
          ))}
        </div>

        {/* Match History */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Recent Matches</h2>
          {matches.map((match: any, index: number) => {
            const player = match?.info?.participants?.find((p: any) => p.puuid === account?.puuid);
            if (!player) return null;
            const gameDurationMins = Math.floor(match.info.gameDuration / 60);
            const gameDurationSecs = match.info.gameDuration % 60;
            const kda = player.deaths === 0
              ? 'Perfect'
              : ((player.kills + player.assists) / player.deaths).toFixed(2) + ':1';
            const isExpanded = expandedMatch === index;
            const blueTeam = match.info.participants.filter((p: any) => p.teamId === 100);
            const redTeam = match.info.participants.filter((p: any) => p.teamId === 200);

            return (
              <div key={index} className={`rounded-xl border ${player.win ? 'border-blue-900' : 'border-red-900'}`}>

                {/* Collapsed Card */}
                <div
                  onClick={() => setExpandedMatch(isExpanded ? null : index)}
                  className={`flex items-center gap-4 px-4 py-3 cursor-pointer ${player.win ? 'bg-blue-950/30' : 'bg-red-950/30'} ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
                >
                  <div className={`w-1 self-stretch rounded-full ${player.win ? 'bg-blue-500' : 'bg-red-500'}`} />
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${player.championName}.png`}
                    alt={player.championName}
                    className="w-12 h-12 rounded-full border border-[#2a2d3a]"
                  />
                  <div className="w-24">
                    <p className="text-sm font-medium text-white truncate">{player.championName}</p>
                    <p className="text-xs text-gray-400">{player.teamPosition}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-sm font-medium text-white">{player.kills}/{player.deaths}/{player.assists}</p>
                    <p className="text-xs text-gray-400">{kda} KDA</p>
                  </div>
                  <div className="w-16">
                    <p className="text-sm text-white">{player.totalMinionsKilled}</p>
                    <p className="text-xs text-gray-400">CS</p>
                  </div>
                  <div className="flex gap-1">
                    {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6].map((itemId: number, i: number) => (
                      itemId !== 0 ? (
                        <img key={i} src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${itemId}.png`} alt={`Item ${itemId}`} className="w-7 h-7 rounded border border-[#2a2d3a]" />
                      ) : (
                        <div key={i} className="w-7 h-7 rounded border border-[#2a2d3a] bg-[#0f1117]" />
                      )
                    ))}
                  </div>
                  <div className="ml-auto text-right">
                    <p className={`text-xs font-semibold ${player.win ? 'text-blue-400' : 'text-red-400'}`}>{player.win ? 'Victory' : 'Defeat'}</p>
                    <p className="text-xs text-gray-400">{match.info.gameMode}</p>
                    <p className="text-xs text-gray-400">{gameDurationMins}m {gameDurationSecs}s</p>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="border-t border-[#2a2d3a] bg-[#1a1d27] rounded-b-xl p-4 flex flex-col gap-4">
                    {[{ team: blueTeam, label: 'Blue Team', win: blueTeam[0]?.win }, { team: redTeam, label: 'Red Team', win: redTeam[0]?.win }].map(({ team, label, win }) => (
                      <div key={label}>
                        <p className={`text-xs font-semibold mb-2 ${win ? 'text-blue-400' : 'text-red-400'}`}>
                          {label} — {win ? 'Victory' : 'Defeat'}
                        </p>
                        <table className="w-full text-xs text-gray-300">
                          <thead>
                            <tr className="text-gray-500 border-b border-[#2a2d3a]">
                              <th className="text-left py-1 font-normal">Champion</th>
                              <th className="text-center py-1 font-normal">KDA</th>
                              <th className="text-center py-1 font-normal">Damage</th>
                              <th className="text-center py-1 font-normal">Wards</th>
                              <th className="text-center py-1 font-normal">CS</th>
                              <th className="text-right py-1 font-normal">Items</th>
                            </tr>
                          </thead>
                          <tbody>
                            {team.map((p: any) => (
                              <tr key={p.puuid} className={`border-b border-[#2a2d3a] ${p.puuid === account?.puuid ? 'bg-white/5' : ''}`}>
                                <td className="py-2 flex items-center gap-2">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${p.championName}.png`}
                                    alt={p.championName}
                                    className="w-7 h-7 rounded-full border border-[#2a2d3a]"
                                  />
                                  <span className="truncate max-w-[80px]">{p.riotIdGameName}</span>
                                </td>
                                <td className="text-center py-2">{p.kills}/{p.deaths}/{p.assists}</td>
                                <td className="text-center py-2">{p.totalDamageDealtToChampions.toLocaleString()}</td>
                                <td className="text-center py-2">{p.wardsPlaced}</td>
                                <td className="text-center py-2">{p.totalMinionsKilled}</td>
                                <td className="py-2">
                                  <div className="flex gap-1 justify-end">
                                    {[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6].map((itemId: number, i: number) => (
                                      itemId !== 0 ? (
                                        <img key={i} src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${itemId}.png`} alt={`Item ${itemId}`} className="w-6 h-6 rounded border border-[#2a2d3a]" />
                                      ) : (
                                        <div key={i} className="w-6 h-6 rounded border border-[#2a2d3a] bg-[#0f1117]" />
                                      )
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}