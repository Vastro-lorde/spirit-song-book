import { notFound } from "next/navigation";
import Link from "next/link";
import HymnActions from "@/components/HymnActions";
import type { IHymn } from "@/types/hymn";
import type { Metadata } from "next";

async function getHymn(number: string): Promise<IHymn | null> {
  const res = await fetch(
    new URL(
      `/api/hymns/${number}`,
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
    ).toString(),
    { cache: "no-store" },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch hymn");
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const hymn = await getHymn(number);
  if (!hymn) return { title: "Hymn Not Found" };

  return {
    title: `Hymn ${hymn.hymnNumber} – ${hymn.title} | RCCG Hymn Book`,
    description: hymn.author
      ? `${hymn.title} by ${hymn.author}`
      : hymn.title,
  };
}

export default async function HymnPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const hymn = await getHymn(number);
  if (!hymn) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-rccg-navy hover:underline dark:text-white/70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Hymns
      </Link>

      <HymnActions hymn={hymn} />
    </main>
  );
}
