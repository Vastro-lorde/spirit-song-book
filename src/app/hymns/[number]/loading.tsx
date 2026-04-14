export default function HymnDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
      {/* Back link skeleton */}
      <div className="skeleton mb-4 h-5 w-32" />

      {/* Title area */}
      <div className="mb-6 rounded-2xl border border-gray-200 p-5 dark:border-white/10">
        <div className="skeleton mb-2 h-4 w-20" />
        <div className="skeleton mb-3 h-8 w-3/4" />
        <div className="skeleton mb-4 h-4 w-1/3" />

        {/* Action buttons skeleton */}
        <div className="flex gap-2">
          <div className="skeleton h-9 w-24" />
          <div className="skeleton h-9 w-24" />
        </div>
      </div>

      {/* Lyrics skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
            <div className="skeleton h-4 w-3/4" />
          </div>
        ))}
      </div>
    </main>
  );
}
