interface RankedCardProps {
  entry: any;
}

export default function RankedCard({ entry }: RankedCardProps) {
  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4">
      <p className="text-gray-400 text-xs mb-1">
        {entry.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo/Duo' : 'Ranked Flex'}
      </p>
      <p className="text-lg font-semibold">{entry.tier} {entry.rank}</p>
      <p className="text-gray-400 text-sm">{entry.leaguePoints} LP</p>
      <p className="text-gray-400 text-sm">
        {entry.wins}W {entry.losses}L · {Math.round((entry.wins / (entry.wins + entry.losses)) * 100)}%
      </p>
    </div>
  );
}
