interface RankedCardProps {
  entry: any;
}

export default function RankedCard({ entry }: RankedCardProps) {
  const tier = entry.tier.toLowerCase();
  const winRate = Math.round((entry.wins / (entry.wins + entry.losses)) * 100);

  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4 flex items-center gap-4">
      <img
        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${tier}.png`}
        alt={entry.tier}
        className="w-16 h-16 rounded-full flex-shrink-0"
      />
      <div className="flex flex-col">
        <p className="text-gray-400 text-xs mb-1">{entry.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo/Duo' : 'Ranked Flex'}</p>
        <p className="text-lg font-semibold">{entry.tier} {entry.rank}</p>
        <p className="text-gray-400 text-sm">{entry.leaguePoints} LP</p>
        <p className="text-gray-400 text-sm">{entry.wins}W {entry.losses}L · {winRate}% WR</p>
      </div>
    </div>
  );
}
