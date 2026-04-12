import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hymn from "@/lib/models/hymn";

/**
 * GET /api/hymns/[number]
 * Returns the full hymn document for a given hymn number.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  await connectDB();

  const { number } = await params;
  const hymnNumber = Number(number);

  if (Number.isNaN(hymnNumber)) {
    return NextResponse.json({ error: "Invalid hymn number" }, { status: 400 });
  }

  const hymn = await Hymn.findOne({ hymnNumber }, { _id: 0, __v: 0 }).lean();

  if (!hymn) {
    return NextResponse.json({ error: "Hymn not found" }, { status: 404 });
  }

  return NextResponse.json(hymn);
}
