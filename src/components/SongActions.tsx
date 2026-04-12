"use client";

import { useState, useCallback } from "react";
import type { ISong } from "@/types/song";
import SongLyrics from "./SongLyrics";

export default function SongActions({ song }: { song: ISong }) {
  const [copied, setCopied] = useState(false);

  /** Build plain-text version of the lyrics */
  const buildPlainText = useCallback(() => {
    const lines: string[] = [];
    lines.push(`Song ${song.songNumber} – ${song.title}`);
    if (song.author) lines.push(`by ${song.author}`);
    lines.push("");

    for (const verse of song.verses) {
      lines.push(verse.qualifier ?? `Verse ${verse.number}`);
      lines.push(verse.text);
      lines.push("");

      if (song.chorus.text) {
        lines.push(song.chorus.qualifier ?? "Chorus");
        lines.push(song.chorus.text);
        lines.push("");
      }
    }

    return lines.join("\n").trim();
  }, [song]);

  /** Copy lyrics to clipboard */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildPlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = buildPlainText();
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [buildPlainText]);

  /** Download lyrics as PDF with title, sol-fa notes & italicized part labels */
  const handleDownloadPdf = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 25;

    const checkPageBreak = (needed: number) => {
      if (y + needed > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        y = 20;
      }
    };

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const titleLines = doc.splitTextToSize(
      `Song ${song.songNumber} – ${song.title}`,
      maxWidth,
    );
    checkPageBreak(titleLines.length * 8);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8;

    // Author
    if (song.author) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(`by ${song.author}`, margin, y);
      y += 7;
    }

    y += 4;

    // Verses and chorus
    for (const verse of song.verses) {
      // Verse label – italicized
      doc.setFont("helvetica", "bolditalic");
      doc.setFontSize(10);
      const label = verse.qualifier ?? `Verse ${verse.number}`;
      checkPageBreak(6);
      doc.text(label, margin, y);
      y += 6;

      // Verse text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const verseLines = doc.splitTextToSize(verse.text, maxWidth);
      checkPageBreak(verseLines.length * 5);
      doc.text(verseLines, margin, y);
      y += verseLines.length * 5 + 3;

      // Chorus
      if (song.chorus.text) {
        doc.setFont("helvetica", "bolditalic");
        doc.setFontSize(10);
        const chorusLabel = song.chorus.qualifier ?? "Chorus";
        checkPageBreak(6);
        doc.text(chorusLabel, margin + 5, y);
        y += 6;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        const chorusLines = doc.splitTextToSize(song.chorus.text, maxWidth - 5);
        checkPageBreak(chorusLines.length * 5);
        doc.text(chorusLines, margin + 5, y);
        y += chorusLines.length * 5 + 5;
      }

      y += 2;
    }

    // Tunes / Sol-fa notes
    if (song.tunes.length > 0) {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      checkPageBreak(8);
      doc.text(`Tune${song.tunes.length > 1 ? "s" : ""} / Sol-fa`, margin, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      for (const tune of song.tunes) {
        const tuneText = tune.name + (tune.author ? ` — ${tune.author}` : "");
        const tuneLines = doc.splitTextToSize(tuneText, maxWidth);
        checkPageBreak(tuneLines.length * 5);
        doc.text(tuneLines, margin, y);
        y += tuneLines.length * 5 + 2;
      }
    }

    doc.save(
      `song-${song.songNumber}-${song.title.replace(/\s+/g, "-").toLowerCase()}.pdf`,
    );
  }, [song]);

  return (
    <div className="space-y-3">
      {/* Action bar */}
      <div className="flex items-center justify-end gap-2">
        {/* Copy */}
        <button
          onClick={handleCopy}
          title="Copy lyrics"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rccg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {copied ? "Copied!" : "Copy"}
        </button>

        {/* Download PDF */}
        <button
          onClick={handleDownloadPdf}
          title="Download as PDF"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF
        </button>
      </div>

      {/* Lyrics card */}
      <SongLyrics song={song} />
    </div>
  );
}
