import mongoose, { Schema, Model } from "mongoose";
import type { IHymn } from "@/types/hymn";

const VerseSchema = new Schema(
  {
    number: { type: Number, required: true },
    qualifier: { type: String, default: null },
    text: { type: String, required: true },
  },
  { _id: false }
);

const ChorusSchema = new Schema(
  {
    qualifier: { type: String, default: null },
    text: { type: String, default: null },
  },
  { _id: false }
);

const TuneSchema = new Schema(
  {
    name: { type: String, default: null },
    author: { type: String, default: null },
    audioUrl: { type: String, default: null },
  },
  { _id: false }
);

const HymnSchema = new Schema<IHymn>(
  {
    hymnNumber: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, default: null },
    category: { type: String, default: null, index: true },
    bibleReference: { type: String, default: null },
    history: { type: String, default: null },
    numberOfVerses: { type: Number, required: true },
    chorus: { type: ChorusSchema, default: () => ({}) },
    verses: { type: [VerseSchema], default: [] },
    tunes: { type: [TuneSchema], default: [] },
    musicSheetUrl: { type: String, default: null },
  },
  { timestamps: true }
);

// Text index for full-text search across title, author, verses, and chorus
HymnSchema.index(
  { title: "text", author: "text", "verses.text": "text", "chorus.text": "text" },
  { weights: { title: 10, author: 5, "chorus.text": 3, "verses.text": 1 } }
);

const Hymn: Model<IHymn> =
  mongoose.models.Hymn ?? mongoose.model<IHymn>("Hymn", HymnSchema);

export default Hymn;
