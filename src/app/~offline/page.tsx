"use client";

export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-6xl">📡</div>
        <h1 className="text-3xl font-bold text-rccg-navy dark:text-rccg-gold">
          You&apos;re Offline
        </h1>
        <p className="text-foreground/70 text-lg">
          It looks like you&apos;ve lost your internet connection. Previously
          visited pages may still be available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-block rounded-lg bg-rccg-navy px-6 py-3 font-semibold text-white transition hover:bg-rccg-dark-navy"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
