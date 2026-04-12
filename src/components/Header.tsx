import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-rccg-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/spirit_songs_logo.png"
            alt="Spirit Song Book"
            width={40}
            height={40}
            className="shrink-0 rounded-full"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide">Spirit Song Book</h1>
            <p className="text-xs text-white/70">
              Your hymns, one place
            </p>
          </div>
        </Link>

        <nav className="ml-auto flex items-center gap-4">
          <Link
            href="/hymns"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Hymns
          </Link>
          <Link
            href="/songs"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Songs
          </Link>
        </nav>
      </div>
    </header>
  );
}
