import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Song from "@/lib/models/song";

/**
 * GET /api/songs/[number]
 * Returns the full song document for a given song number.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  await connectDB();

  const { number } = await params;
  const songNumber = Number(number);

  if (Number.isNaN(songNumber)) {
    return NextResponse.json({ error: "Invalid song number" }, { status: 400 });
  }

  const song = await Song.findOne({ songNumber }, { _id: 0, __v: 0 }).lean();

  if (!song) {
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  return NextResponse.json(song);
}
