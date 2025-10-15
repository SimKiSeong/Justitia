export interface ChartSong {
  rank: number;
  previousRank: number;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  isNew: boolean;
  likeCount: number;
  isLiked: boolean;
  overallScore?: number;
  overallGrade?: string;
}