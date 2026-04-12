import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hymn from "@/lib/models/hymn";

/**
 * GET /api/categories
 * Returns a sorted list of unique hymn categories.
 */
export async function GET() {
  await connectDB();

  const categories: string[] = await Hymn.distinct("category", {
    category: { $nin: [null, ""] },
  });

  return NextResponse.json(categories.sort());
}
