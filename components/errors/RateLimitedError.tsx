export default function RateLimitedError() {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="max-w-md w-full flex flex-col gap-6 text-center rounded-xl border border-yellow-500/20 bg-[#171923] p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-yellow-400">Too Many Requests</h1>
          <p className="text-gray-400 text-sm">
            The Riot API rate limit has been reached. Please wait a moment before searching again.
          </p>
        </div>
      </div>
    </div>
  );
}