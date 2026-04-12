import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hymn from "@/lib/models/hymn";

/**
 * GET /api/hymns
 *
 * Query params:
 *   q        – full-text search term
 *   category – filter by category
 *   page     – page number (default: 1)
 *   limit    – results per page (default: 20, max: 100)
 */
export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));
  const skip = (page - 1) * limit;

  // Build filter
  const filter: Record<string, unknown> = {};

  if (q) {
    const isNumeric = /^\d+$/.test(q);
    if (isNumeric) {
      filter.$or = [
        { hymnNumber: Number(q) },
        { $text: { $search: q } },
      ];
    } else {
      filter.$text = { $search: q };
    }
  }
  if (category) {
    filter.category = category;
  }

  // Projection: summary fields only for listing
  const projection = {
    hymnNumber: 1,
    title: 1,
    author: 1,
    category: 1,
    _id: 0,
  };

  const [hymns, total] = await Promise.all([
    Hymn.find(filter, projection)
      .sort(q ? { score: { $meta: "textScore" } } : { hymnNumber: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Hymn.countDocuments(filter),
  ]);

  return NextResponse.json({
    hymns,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
