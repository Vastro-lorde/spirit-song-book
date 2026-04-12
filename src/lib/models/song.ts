import mongoose, { Schema, Model } from "mongoose";
import type { ISong } from "@/types/song";

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

const SongSchema = new Schema<ISong>(
  {
    songNumber: { type: Number, required: true, unique: true, index: true },
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
SongSchema.index(
  { title: "text", author: "text", "verses.text": "text", "chorus.text": "text" },
  { weights: { title: 10, author: 5, "chorus.text": 3, "verses.text": 1 } }
);

const Song: Model<ISong> =
  mongoose.models.Song ?? mongoose.model<ISong>("Song", SongSchema);

export default Song;
