"use client";

import { useState } from "react";
import Link from "next/link";

interface CategoryFilterProps {
  categories: string[];
  currentCategory?: string;
  currentQuery?: string;
}

export default function CategoryFilter({
  categories,
  currentCategory,
  currentQuery,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  function buildHref(cat?: string) {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (currentQuery) params.set("q", currentQuery);
    const qs = params.toString();
    return `/hymns${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Link
          href="/hymns"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !currentCategory
              ? "bg-rccg-navy text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
          }`}
        >
          All
        </Link>

        {currentCategory && (
          <Link
            href={buildHref(currentCategory)}
            className="rounded-full bg-rccg-green px-3 py-1 text-xs font-medium text-white"
          >
            {currentCategory}
          </Link>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          Categories
          <svg
            className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Panel */}
          <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#1a1d3a]">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80">
                Categories
              </h3>
              <button
                onClick={() => setOpen(false)}
                title="Close categories"
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex max-h-60 flex-wrap gap-2 overflow-y-auto">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={buildHref(cat)}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    currentCategory === cat
                      ? "bg-rccg-green text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
