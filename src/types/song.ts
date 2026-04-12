export interface IVerse {
  number: number;
  qualifier: string | null;
  text: string;
}

export interface IChorus {
  qualifier: string | null;
  text: string | null;
}

export interface ITune {
  name: string | null;
  author: string | null;
  audioUrl: string | null;
}

export interface ISong {
  songNumber: number;
  title: string;
  author: string | null;
  category: string | null;
  bibleReference: string | null;
  history: string | null;
  numberOfVerses: number;
  chorus: IChorus;
  verses: IVerse[];
  tunes: ITune[];
  musicSheetUrl: string | null;
}

/** Lightweight version for listing / cards */
export type ISongSummary = Pick<
  ISong,
  "songNumber" | "title" | "author" | "category"
>;
