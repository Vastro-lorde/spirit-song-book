"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useTransition } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";

  // Focus on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.delete("page"); // reset pagination on new search
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-xl">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search hymns by title, number, or lyrics…"
        defaultValue={q}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-full border-2 border-rccg-navy/20 bg-white px-5 py-3 pr-12 text-sm text-rccg-dark-navy shadow-sm outline-none placeholder:text-gray-400 focus:border-rccg-navy focus:ring-2 focus:ring-rccg-navy/20 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50 dark:focus:border-white/50"
      />
      {/* Search icon */}
      <svg
        className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
          isPending ? "animate-spin text-rccg-red" : "text-rccg-navy/50 dark:text-white/40"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        {isPending ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        )}
      </svg>
    </div>
  );
}
