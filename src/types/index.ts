export interface Song {
  url: string;
  title: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverImage: string;
  songs: Song[];
}
