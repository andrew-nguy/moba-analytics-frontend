import type { ReactNode } from 'react';

interface ProfileHeaderProps {
  account: any;
  summoner: any;
  platform: string;
  action?: ReactNode;
}

const DDRAGON_VERSION = "14.24.1";

export default function ProfileHeader({
  account,
  summoner,
  platform,
  action,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#2a2d3a] bg-[#1a1d27] p-6 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${summoner?.profileIconId}.png`}
          alt="Profile Icon"
          className="h-16 w-16 rounded-full border border-[#2a2d3a]"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">
            {account?.gameName}
            <span className="text-lg font-normal text-gray-400"> #{account?.tagLine}</span>
          </h1>
          <p className="text-sm text-gray-400">{platform.toUpperCase()} · Level {summoner?.summonerLevel}</p>
        </div>
      </div>
      {action && <div className="sm:ml-auto">{action}</div>}
    </div>
  );
}
