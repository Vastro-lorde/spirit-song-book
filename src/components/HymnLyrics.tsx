import type { IHymn } from "@/types/hymn";

export default function HymnLyrics({ hymn }: { hymn: IHymn }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-white/5">
      {/* Card Header */}
      <header className="border-b border-gray-100 bg-gradient-to-r from-rccg-navy to-rccg-dark-navy px-5 py-5 dark:border-white/10">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl font-bold text-white backdrop-blur-sm">
            {hymn.hymnNumber}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
              {hymn.title}
            </h1>
            {hymn.author && (
              <p className="text-sm text-white/70">by {hymn.author}</p>
            )}
          </div>
        </div>

        {/* Meta pills */}
        {(hymn.category || hymn.bibleReference) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {hymn.category && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {hymn.category}
              </span>
            )}
            {hymn.bibleReference && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                📖 {hymn.bibleReference}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Card Body – Lyrics */}
      <div className="space-y-5 px-5 py-5">
        {hymn.verses.map((verse) => (
          <section key={verse.number}>
            <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-rccg-red">
              {verse.qualifier ?? `Verse ${verse.number}`}
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800 dark:text-white/85">
              {verse.text}
            </p>

            {/* Chorus after each verse */}
            {hymn.chorus.text && (
              <div className="mt-3 rounded-lg border-l-4 border-rccg-gold bg-rccg-gold/5 py-2 pl-4 pr-3 dark:bg-rccg-gold/10">
                <h3 className="mb-0.5 text-xs font-bold uppercase tracking-widest text-rccg-gold">
                  {hymn.chorus.qualifier ?? "Chorus"}
                </h3>
                <p className="whitespace-pre-line text-sm italic leading-relaxed text-gray-700 dark:text-white/80">
                  {hymn.chorus.text}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Card Footer – Tunes & History */}
      {(hymn.tunes.length > 0 || hymn.history) && (
        <footer className="border-t border-gray-100 bg-gray-50/50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.02]">
          {hymn.tunes.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                Tune{hymn.tunes.length > 1 ? "s" : ""}
              </h2>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-white/60">
                {hymn.tunes.map((tune, i) => (
                  <li key={i}>
                    {tune.name}
                    {tune.author && (
                      <span className="text-gray-400"> — {tune.author}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hymn.history && (
            <div className={hymn.tunes.length > 0 ? "mt-4" : ""}>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                Hymn History
              </h2>
              <p className="whitespace-pre-line text-sm text-gray-600 dark:text-white/60">
                {hymn.history}
              </p>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}
