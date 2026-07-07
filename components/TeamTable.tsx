import { getSpellUrl } from '@/lib/summonerSpells';

interface TeamTableProps {
  team: any[];
  label: string;
  win: boolean;
  currentPuuid: string;
}

export default function TeamTable({ team, label, win, currentPuuid }: TeamTableProps) {
  return (
    <div>
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
            <tr
              key={p.puuid}
              className={`border-b border-[#2a2d3a] ${p.puuid === currentPuuid ? 'bg-white/5' : ''}`}
            >
              {/* Champion + Summoner Spells + Name */}
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${p.championName}.png`}
                    alt={p.championName}
                    className="w-10 h-10 rounded-full border border-[#2a2d3a]"
                  />
                  <div className="flex flex-col gap-0.5">
                    <img
                      src={getSpellUrl(p.summoner1Id)}
                      alt="Spell 1"
                      className="w-5 h-5 rounded border border-[#2a2d3a]"
                    />
                    <img
                      src={getSpellUrl(p.summoner2Id)}
                      alt="Spell 2"
                      className="w-5 h-5 rounded border border-[#2a2d3a]"
                    />
                  </div>
                  <span className="truncate max-w-[80px]">{p.riotIdGameName}</span>
                </div>
              </td>

              {/* KDA */}
              <td className="text-center py-2">{p.kills}/{p.deaths}/{p.assists}</td>

              {/* Damage */}
              <td className="text-center py-2">{p.totalDamageDealtToChampions.toLocaleString()}</td>

              {/* Wards */}
              <td className="text-center py-2">{p.wardsPlaced}</td>

              {/* CS */}
              <td className="text-center py-2">{p.totalMinionsKilled}</td>

              {/* Items */}
              <td className="py-2">
                <div className="flex gap-1 justify-end">
                  {[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6].map((itemId: number, i: number) => (
                    itemId !== 0 ? (
                      <img
                        key={i}
                        src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${itemId}.png`}
                        alt={`Item ${itemId}`}
                        className="w-6 h-6 rounded border border-[#2a2d3a]"
                      />
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
  );
}