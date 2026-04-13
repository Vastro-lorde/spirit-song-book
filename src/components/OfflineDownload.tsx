"use client";

import { useState, useCallback } from "react";

type DownloadStatus = "idle" | "downloading" | "done" | "error";

interface Progress {
  current: number;
  total: number;
  phase: string;
}

const STORAGE_KEY = "offline-download-timestamp";

async function fetchAllNumbers(
  apiPath: string,
  itemsKey: string,
  numberKey: string
): Promise<number[]> {
  const numbers: number[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`${apiPath}?limit=100&page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch ${apiPath} page ${page}`);
    const data = await res.json();

    for (const item of data[itemsKey]) {
      numbers.push(item[numberKey]);
    }

    totalPages = data.pagination.totalPages;
    page++;
  } while (page <= totalPages);

  return numbers;
}

export default function OfflineDownload() {
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [progress, setProgress] = useState<Progress>({
    current: 0,
    total: 0,
    phase: "",
  });
  const [lastDownload, setLastDownload] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const ts = localStorage.getItem(STORAGE_KEY);
    if (!ts) return null;
    return new Date(Number(ts)).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  const downloadAll = useCallback(async () => {
    setStatus("downloading");

    try {
      // Phase 1: Collect all hymn & song numbers
      setProgress({ current: 0, total: 0, phase: "Fetching hymn list…" });
      const hymnNumbers = await fetchAllNumbers(
        "/api/hymns",
        "hymns",
        "hymnNumber"
      );

      setProgress({ current: 0, total: 0, phase: "Fetching song list…" });
      const songNumbers = await fetchAllNumbers(
        "/api/songs",
        "songs",
        "songNumber"
      );

      // Build URLs to pre-cache
      const urls = [
        "/",
        "/hymns",
        "/songs",
        ...hymnNumbers.map((n) => `/hymns/${n}`),
        ...songNumbers.map((n) => `/songs/${n}`),
      ];

      const total = urls.length;
      setProgress({ current: 0, total, phase: "Downloading pages…" });

      // Phase 2: Fetch in batches — SW auto-caches via runtime caching rules
      const BATCH_SIZE = 10;
      let completed = 0;

      for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const batch = urls.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map((url) => fetch(url)));
        completed = Math.min(i + BATCH_SIZE, total);
        setProgress({ current: completed, total, phase: "Downloading pages…" });
      }

      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, String(now));
      setLastDownload(
        new Date(now).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, []);

  const percentage =
    progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0;

  const barRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        node.style.width = `${percentage}%`;
      }
    },
    [percentage]
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-2xl" aria-hidden="true">
          📥
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Offline Access
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-white/60">
            {lastDownload
              ? `Last downloaded ${lastDownload}. Re-download to get the latest hymns and songs.`
              : "Download all hymns and songs to access lyrics without internet."}
          </p>

          {/* Progress bar */}
          {status === "downloading" && (
            <div className="mt-3 space-y-1.5">
              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div
                  ref={barRef}
                  className="h-full rounded-full bg-rccg-green transition-all duration-300"
                />
              </div>
              <p className="text-xs text-gray-400 dark:text-white/40">
                {progress.phase}{" "}
                {progress.total > 0 &&
                  `${progress.current}/${progress.total} (${percentage}%)`}
              </p>
            </div>
          )}

          {status === "done" && (
            <p className="mt-2 text-sm font-medium text-rccg-green">
              ✓ Download complete — lyrics available offline!
            </p>
          )}

          {status === "error" && (
            <p className="mt-2 text-sm text-rccg-red">
              Download failed. Please check your connection and try again.
            </p>
          )}

          <div className="mt-3">
            {status !== "downloading" && (
              <button
                onClick={downloadAll}
                className="rounded-lg bg-rccg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-rccg-dark-navy"
              >
                {lastDownload
                  ? "Re-download All"
                  : "Download All for Offline"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
