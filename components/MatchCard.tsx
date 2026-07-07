'use client';

import { useState } from 'react';
import MatchDetails from './MatchDetails';
import { getSpellUrl } from '@/lib/summonerSpells';

interface MatchCardProps {
  match: any;
  currentPuuid: string;
}

export default function MatchCard({ match, currentPuuid }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const player = match?.info?.participants?.find((p: any) => p.puuid === currentPuuid);
  if (!player) return null;

  const gameDurationMins = Math.floor(match.info.gameDuration / 60);
  const gameDurationSecs = match.info.gameDuration % 60;
  const kda = player.deaths === 0
    ? 'Perfect'
    : ((player.kills + player.assists) / player.deaths).toFixed(2) + ':1';

  return (
    <div className={`rounded-xl border ${player.win ? 'border-blue-900' : 'border-red-900'}`}>

      {/* Collapsed Card */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-4 px-4 py-3 cursor-pointer ${player.win ? 'bg-blue-950/30' : 'bg-red-950/30'} ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
      >
        {/* Win/Loss Bar */}
        <div className={`w-1 self-stretch rounded-full ${player.win ? 'bg-blue-500' : 'bg-red-500'}`} />

        {/* Champion Icon */}
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${player.championName}.png`}
          alt={player.championName}
          className="w-14 h-14 rounded-full border border-[#2a2d3a]"
        />

        {/* Summoner Spells */}
        <div className="flex flex-col gap-1">
          <img
            src={getSpellUrl(player.summoner1Id)}
            alt="Spell 1"
            className="w-7 h-7 rounded border border-[#2a2d3a]"
          />
          <img
            src={getSpellUrl(player.summoner2Id)}
            alt="Spell 2"
            className="w-7 h-7 rounded border border-[#2a2d3a]"
          />
        </div>

        {/* Champion Info */}
        <div className="w-24">
          <p className="text-sm font-medium text-white truncate">{player.championName}</p>
          <p className="text-xs text-gray-400">{player.teamPosition}</p>
        </div>

        {/* KDA */}
        <div className="w-24">
          <p className="text-sm font-medium text-white">{player.kills}/{player.deaths}/{player.assists}</p>
          <p className="text-xs text-gray-400">{kda} KDA</p>
        </div>

        {/* CS */}
        <div className="w-16">
          <p className="text-sm text-white">{player.totalMinionsKilled}</p>
          <p className="text-xs text-gray-400">CS</p>
        </div>

        {/* Items */}
        <div className="flex gap-1">
          {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6].map((itemId: number, i: number) => (
            itemId !== 0 ? (
              <img
                key={i}
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${itemId}.png`}
                alt={`Item ${itemId}`}
                className="w-7 h-7 rounded border border-[#2a2d3a]"
              />
            ) : (
              <div key={i} className="w-7 h-7 rounded border border-[#2a2d3a] bg-[#0f1117]" />
            )
          ))}
        </div>

        {/* Game Info */}
        <div className="ml-auto text-right">
          <p className={`text-xs font-semibold ${player.win ? 'text-blue-400' : 'text-red-400'}`}>
            {player.win ? 'Victory' : 'Defeat'}
          </p>
          <p className="text-xs text-gray-400">{match.info.gameMode}</p>
          <p className="text-xs text-gray-400">{gameDurationMins}m {gameDurationSecs}s</p>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && <MatchDetails match={match} currentPuuid={currentPuuid} />}
    </div>
  );
}