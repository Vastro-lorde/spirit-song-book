import { notFound } from "next/navigation";
import Link from "next/link";
import HymnActions from "@/components/HymnActions";
import type { IHymn } from "@/types/hymn";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Hymn from "@/lib/models/hymn";

async function getHymn(number: string): Promise<IHymn | null> {
  await connectDB();

  const hymnNumber = Number(number);
  if (Number.isNaN(hymnNumber)) return null;

  const hymn = await Hymn.findOne({ hymnNumber }, { _id: 0, __v: 0 }).lean();
  return hymn as IHymn | null;
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
