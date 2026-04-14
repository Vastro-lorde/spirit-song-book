export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="loading-spinner" />
        <p className="mt-4 text-sm text-gray-500 dark:text-white/50">Loading…</p>
      </div>
    </main>
  );
}
