import SearchBar from "@/components/SearchBar";
import HymnCard from "@/components/HymnCard";
import type { IHymnSummary } from "@/types/hymn";

interface HymnsResponse {
  hymns: IHymnSummary[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

async function getHymns(params: {
  q?: string;
  category?: string;
  page?: string;
}): Promise<HymnsResponse> {
  const url = new URL("/api/hymns", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
  if (params.q) url.searchParams.set("q", params.q);
  if (params.category) url.searchParams.set("category", params.category);
  if (params.page) url.searchParams.set("page", params.page);
  url.searchParams.set("limit", "24");

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch hymns");
  return res.json();
}

async function getCategories(): Promise<string[]> {
  const res = await fetch(
    new URL("/api/categories", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").toString(),
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const page = typeof params.page === "string" ? params.page : undefined;

  const [{ hymns, pagination }, categories] = await Promise.all([
    getHymns({ q, category, page }),
    getCategories(),
  ]);

  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      {/* Search & Filter */}
      <div className="mb-6 space-y-3">
        <SearchBar />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <a
            href="/"
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
              href={`/?category=${encodeURIComponent(cat)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
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
        {pagination.total} hymn{pagination.total !== 1 ? "s" : ""} found
        {q && <span> for &ldquo;{q}&rdquo;</span>}
        {category && <span> in {category}</span>}
      </p>

      {/* Hymn grid */}
      {hymns.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hymns.map((hymn) => (
            <HymnCard key={hymn.hymnNumber} hymn={hymn} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-gray-400">No hymns found</p>
          <p className="mt-1 text-sm text-gray-400">Try a different search term or category</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <a
              href={`/?page=${currentPage - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
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
              href={`/?page=${currentPage + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
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
