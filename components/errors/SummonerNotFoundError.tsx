interface Props {
  name: string;
  tag: string;
  platform: string;
}

export default function SummonerNotFoundError({ name, tag, platform }: Props) {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="max-w-md w-full flex flex-col gap-6 text-center rounded-xl border border-red-500/20 bg-[#171923] p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-red-400">Summoner Not Found</h1>
          <p className="text-gray-400 text-sm">
            No summoner found for{' '}
            <span className="text-white font-medium">{name}#{tag}</span>{' '}
            on <span className="text-white font-medium">{platform.toUpperCase()}</span>.
            Please check the name and tag and try again.
          </p>
        </div>
      </div>
    </div>
  );
}