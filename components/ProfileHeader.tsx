interface ProfileHeaderProps {
  account: any;
  summoner: any;
  platform: string;
}

const DDRAGON_VERSION = "14.24.1";

export default function ProfileHeader({
  account,
  summoner,
  platform,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 bg-[#1a1d27] rounded-xl p-6 border border-[#2a2d3a]">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${summoner?.profileIconId}.png`}
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
  );
}
