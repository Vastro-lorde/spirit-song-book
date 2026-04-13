import Image from "next/image";
import Link from "next/link";
import OfflineDownload from "@/components/OfflineDownload";

const songBooks = [
  {
    id: "rccg-hymns",
    title: "RCCG Hymn Book",
    subtitle: "The Redeemed Christian Church of God",
    description: "Browse the complete collection of RCCG hymns — search by title, number, or lyrics.",
    href: "/hymns",
    logo: "/rccg_logo.png",
  },
  {
    id: "songs",
    title: "Songs",
    subtitle: "Praise & Worship Collection",
    description: "Browse the collection of songs — search by title, number, or lyrics.",
    href: "/songs",
    logo: "/spirit_songs_logo.png",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      {/* Hero */}
      <section className="mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rccg-gold/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-rccg-gold">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
          </svg>
          YOUR HYMNS, ONE PLACE
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-rccg-dark-navy sm:text-5xl dark:text-white">
          Spirit Song Book
        </h2>
        <p className="mt-4 text-base text-gray-500 sm:text-lg dark:text-white/60">
          Access your favourite hymn books — search, read, and share hymns
          anytime, anywhere.
        </p>
      </section>

      {/* Song Book Cards */}
      <section className="mx-auto mt-12 w-full max-w-lg sm:mt-16">
        <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">
          Choose a Song Book
        </h3>

        <div className="grid gap-4">
          {songBooks.map((book) => (
            <Link
              key={book.id}
              href={book.href}
              className="group relative overflow-hidden rounded-2xl border border-rccg-navy/10 bg-white p-6 shadow-sm transition-all hover:border-rccg-navy/30 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
            >
              <div className="flex items-center gap-5">
                {/* Logo */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-rccg-navy/5 dark:bg-white/10">
                  <Image
                    src={book.logo}
                    alt={book.title}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-bold text-rccg-dark-navy group-hover:text-rccg-navy transition-colors dark:text-white">
                    {book.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-white/50">
                    {book.subtitle}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-white/60">
                    {book.description}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="h-6 w-6 shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-rccg-navy dark:text-white/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>

              {/* Accent bar */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-rccg-green scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* Offline Download */}
      <section className="mx-auto mt-10 w-full max-w-lg">
        <OfflineDownload />
      </section>

      {/* Coming Soon hint */}
      <p className="mt-10 text-center text-xs text-gray-400 dark:text-white/30">
        More song books coming soon.
      </p>
    </main>
  );
}
