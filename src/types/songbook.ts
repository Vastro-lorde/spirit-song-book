export enum SongBookType {
  SONG = "song",
  HYMN = "hymn",
}

export interface ISongBook {
  name: string;
  logo: string;
  totalSongs: number;
  type: SongBookType;
  routePath: string;
}
