import mongoose, { Schema, Model } from "mongoose";
import type { ISongBook } from "@/types/songbook";
import { SongBookType } from "@/types/songbook";

const SongBookSchema = new Schema<ISongBook>(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    totalSongs: { type: Number, required: true, default: 0 },
    type: {
      type: String,
      enum: Object.values(SongBookType),
      required: true,
    },
    routePath: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const SongBook: Model<ISongBook> =
  mongoose.models.SongBook ??
  mongoose.model<ISongBook>("SongBook", SongBookSchema);

export default SongBook;
