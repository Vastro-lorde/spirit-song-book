import Link from "next/link";
import type { IHymnSummary } from "@/types/hymn";

export default function HymnCard({ hymn }: { hymn: IHymnSummary }) {
  return (
    <Link
      href={`/hymns/${hymn.hymnNumber}`}
      className="group block rounded-xl border border-rccg-navy/10 bg-white p-4 shadow-sm transition-all hover:border-rccg-navy/30 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
    >
      <div className="flex items-start gap-3">
        {/* Number badge */}
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rccg-navy text-sm font-bold text-white group-hover:bg-rccg-red transition-colors">
          {hymn.hymnNumber}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-rccg-dark-navy group-hover:text-rccg-red transition-colors dark:text-white">
            {hymn.title}
          </h3>
          {hymn.author && (
            <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-white/50">
              {hymn.author}
            </p>
          )}
          {hymn.category && (
            <span className="mt-1.5 inline-block rounded-full bg-rccg-green/10 px-2 py-0.5 text-[10px] font-medium text-rccg-green dark:bg-rccg-green/20">
              {hymn.category}
            </span>
          )}
        </div>

        {/* Arrow */}
        <svg
          className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-rccg-red dark:text-white/20"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
