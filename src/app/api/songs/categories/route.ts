import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Song from "@/lib/models/song";

/**
 * GET /api/songs/categories
 * Returns a sorted list of unique song categories.
 */
export async function GET() {
  await connectDB();

  const categories: string[] = await Song.distinct("category", {
    category: { $nin: [null, ""] },
  });

  return NextResponse.json(categories.sort());
}
