/**
 * SQLite → MongoDB migration script
 *
 * Usage:
 *   1. Set MONGODB_URI in .env.local (or export it)
 *   2. npm run migrate
 *
 * Reads HymnBook.sqlite.db from the project root and inserts all hymns
 * into MongoDB, transforming the flat verse columns into an array.
 */

import Database from "better-sqlite3";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Load env from .env.local ──
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "..", ".env.local") });

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not found. Add it to .env.local");
  process.exit(1);
}

// ── SQLite row type ──
interface SQLiteRow {
  _hymn_number: number;
  hymn_title: string;
  author: string | null;
  category: string | null;
  bible_ref: string | null;
  hymn_history: string | null;
  number_of_verses: number;
  chorus_qualifier: string | null;
  chorus: string | null;
  verse_1_qualifier: string | null;
  verse_1: string | null;
  verse_2_qualifier: string | null;
  verse_2: string | null;
  verse_3_qualifier: string | null;
  verse_3: string | null;
  verse_4_qualifier: string | null;
  verse_4: string | null;
  verse_5_qualifier: string | null;
  verse_5: string | null;
  verse_6_qualifier: string | null;
  verse_6: string | null;
  verse_7_qualifier: string | null;
  verse_7: string | null;
  tune_1: string | null;
  tune_1_author: string | null;
  tune_1_audio: string | null;
  tune_2: string | null;
  tune_2_author: string | null;
  tune_2_audio: string | null;
  music_sheet: string | null;
}

// ── Mongoose schema (inline, avoids path-alias issues in scripts) ──
const VerseSchema = new mongoose.Schema(
  { number: Number, qualifier: String, text: String },
  { _id: false }
);
const ChorusSchema = new mongoose.Schema(
  { qualifier: String, text: String },
  { _id: false }
);
const TuneSchema = new mongoose.Schema(
  { name: String, author: String, audioUrl: String },
  { _id: false }
);
const HymnSchema = new mongoose.Schema(
  {
    hymnNumber: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: String,
    category: { type: String, index: true },
    bibleReference: String,
    history: String,
    numberOfVerses: Number,
    chorus: { type: ChorusSchema, default: () => ({}) },
    verses: [VerseSchema],
    tunes: [TuneSchema],
    musicSheetUrl: String,
  },
  { timestamps: true }
);
HymnSchema.index(
  { title: "text", author: "text", "verses.text": "text", "chorus.text": "text" },
  { weights: { title: 10, author: 5, "chorus.text": 3, "verses.text": 1 } }
);

const Hymn = mongoose.model("Hymn", HymnSchema);

// ── Transform one SQLite row → Hymn document ──
function transform(row: SQLiteRow) {
  const verses: { number: number; qualifier: string | null; text: string }[] = [];
  for (let i = 1; i <= 7; i++) {
    const text = row[`verse_${i}` as keyof SQLiteRow] as string | null;
    if (text) {
      verses.push({
        number: i,
        qualifier: row[`verse_${i}_qualifier` as keyof SQLiteRow] as string | null,
        text,
      });
    }
  }

  const tunes: { name: string | null; author: string | null; audioUrl: string | null }[] = [];
  if (row.tune_1) {
    tunes.push({ name: row.tune_1, author: row.tune_1_author, audioUrl: row.tune_1_audio });
  }
  if (row.tune_2) {
    tunes.push({ name: row.tune_2, author: row.tune_2_author, audioUrl: row.tune_2_audio });
  }

  return {
    hymnNumber: row._hymn_number,
    title: row.hymn_title,
    author: row.author,
    category: row.category,
    bibleReference: row.bible_ref,
    history: row.hymn_history,
    numberOfVerses: row.number_of_verses,
    chorus: { qualifier: row.chorus_qualifier, text: row.chorus },
    verses,
    tunes,
    musicSheetUrl: row.music_sheet,
  };
}

// ── Main ──
async function main() {
  const dbPath = path.resolve(__dirname, "..", "HymnBook.sqlite.db");
  console.log(`📖  Reading SQLite: ${dbPath}`);
  const sqlite = new Database(dbPath, { readonly: true });
  const rows = sqlite.prepare("SELECT * FROM RCCGHymnTable ORDER BY _hymn_number").all() as SQLiteRow[];
  sqlite.close();
  console.log(`   Found ${rows.length} hymns`);

  console.log("🔗  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("   Connected");

  // Clear existing data
  await Hymn.deleteMany({});
  console.log("🗑️   Cleared existing hymns");

  const docs = rows.map(transform);
  await Hymn.insertMany(docs);
  console.log(`✅  Inserted ${docs.length} hymns`);

  await mongoose.disconnect();
  console.log("🔌  Disconnected. Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
