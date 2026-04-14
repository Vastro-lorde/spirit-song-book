export default function HymnsLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      {/* Search bar skeleton */}
      <div className="mb-6 space-y-3">
        <div className="skeleton h-11 w-full" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-20" />
          ))}
        </div>
      </div>

      {/* Results info skeleton */}
      <div className="skeleton mb-4 h-5 w-36" />

      {/* Card grid skeleton */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 p-4 dark:border-white/10"
          >
            <div className="skeleton mb-2 h-5 w-16" />
            <div className="skeleton mb-3 h-6 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}
