export default function ServerError() {
  return (
    <div className="w-full flex justify-center py-20">
      <div className="max-w-md w-full flex flex-col gap-6 text-center rounded-xl border border-red-500/20 bg-[#171923] p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-red-400">Something Went Wrong</h1>
          <p className="text-gray-400 text-sm">
            An unexpected error occurred. This may be a temporary issue. Please try again shortly.
          </p>
        </div>
      </div>
    </div>
  );
}