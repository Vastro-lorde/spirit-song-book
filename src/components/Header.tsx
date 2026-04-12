import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-rccg-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
            <svg className="h-5 w-5 text-rccg-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
            </svg>
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide">Spirit Song Book</h1>
            <p className="text-xs text-white/70">
              Your hymns, one place
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
