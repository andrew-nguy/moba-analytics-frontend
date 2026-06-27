import TeamTable from './TeamTable';

interface MatchDetailsProps {
  match: any;
  currentPuuid: string;
}

export default function MatchDetails({ match, currentPuuid }: MatchDetailsProps) {
  const blueTeam = match.info.participants.filter((p: any) => p.teamId === 100);
  const redTeam = match.info.participants.filter((p: any) => p.teamId === 200);

  return (
    <div className="border-t border-[#2a2d3a] bg-[#1a1d27] rounded-b-xl p-4 flex flex-col gap-4">
      <TeamTable team={blueTeam} label="Blue Team" win={blueTeam[0]?.win} currentPuuid={currentPuuid} />
      <TeamTable team={redTeam} label="Red Team" win={redTeam[0]?.win} currentPuuid={currentPuuid} />
    </div>
  );
}
