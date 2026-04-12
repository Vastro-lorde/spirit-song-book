import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-rccg-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/rccg_logo.png"
            alt="RCCG Logo"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide">RCCG Hymn Book</h1>
            <p className="text-xs text-white/70">
              The Redeemed Christian Church of God
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
