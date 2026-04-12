import { notFound } from "next/navigation";
import Link from "next/link";
import SongActions from "@/components/SongActions";
import type { ISong } from "@/types/song";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Song from "@/lib/models/song";

async function getSong(number: string): Promise<ISong | null> {
  await connectDB();

  const songNumber = Number(number);
  if (Number.isNaN(songNumber)) return null;

  const song = await Song.findOne({ songNumber }, { _id: 0, __v: 0 }).lean();
  return song as ISong | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const song = await getSong(number);
  if (!song) return { title: "Song Not Found" };

  return {
    title: `Song ${song.songNumber} – ${song.title} | Spirit Song Book`,
    description: song.author
      ? `${song.title} by ${song.author}`
      : song.title,
  };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const song = await getSong(number);
  if (!song) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
      <Link
        href="/songs"
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
        Back to Songs
      </Link>

      <SongActions song={song} />
    </main>
  );
}
