import SearchBar from "@/components/SearchBar";
import SongCard from "@/components/SongCard";
import type { ISongSummary } from "@/types/song";
import { connectDB } from "@/lib/db";
import Song from "@/lib/models/song";

interface SongsResponse {
  songs: ISongSummary[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

async function getSongs(params: {
  q?: string;
  category?: string;
  page?: string;
}): Promise<SongsResponse> {
  await connectDB();

  const q = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 24;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};

  if (q) {
    const isNumeric = /^\d+$/.test(q);
    if (isNumeric) {
      filter.$or = [
        { songNumber: Number(q) },
        { $text: { $search: q } },
      ];
    } else {
      filter.$text = { $search: q };
    }
  }
  if (category) {
    filter.category = category;
  }

  const projection = {
    songNumber: 1,
    title: 1,
    author: 1,
    category: 1,
    _id: 0,
  };

  const [songs, total] = await Promise.all([
    Song.find(filter, projection)
      .sort(q ? { score: { $meta: "textScore" } } : { songNumber: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Song.countDocuments(filter),
  ]);

  return {
    songs: songs as ISongSummary[],
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function getCategories(): Promise<string[]> {
  await connectDB();

  const categories: string[] = await Song.distinct("category", {
    category: { $nin: [null, ""] },
  });

  return categories.sort();
}

export default async function SongsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const page = typeof params.page === "string" ? params.page : undefined;

  const [{ songs, pagination }, categories] = await Promise.all([
    getSongs({ q, category, page }),
    getCategories(),
  ]);

  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      {/* Search & Filter */}
      <div className="mb-6 space-y-3">
        <SearchBar basePath="/songs" placeholder="Search songs by title, number, or lyrics…" />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <a
            href="/songs"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !category
                ? "bg-rccg-navy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat}
              href={`/songs?category=${encodeURIComponent(cat)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-rccg-green text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      </div>

      {/* Results info */}
      <p className="mb-4 text-sm text-gray-500 dark:text-white/50">
        {pagination.total} song{pagination.total !== 1 ? "s" : ""} found
        {q && <span> for &ldquo;{q}&rdquo;</span>}
        {category && <span> in {category}</span>}
      </p>

      {/* Song grid */}
      {songs.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <SongCard key={song.songNumber} song={song} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-gray-400">No songs found</p>
          <p className="mt-1 text-sm text-gray-400">Try a different search term or category</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <a
              href={`/songs?page=${currentPage - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
            >
              ← Previous
            </a>
          )}
          <span className="px-3 text-sm text-gray-500 dark:text-white/50">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <a
              href={`/songs?page=${currentPage + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20"
            >
              Next →
            </a>
          )}
        </nav>
      )}
    </main>
  );
}
