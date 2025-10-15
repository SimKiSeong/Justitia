export interface MusicDetail {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  releaseDate: string;
  genre: string;
  duration: string;
  lyrics?: string;
}

export interface PlatformRating {
  platform: string;
  score: number;
  maxScore: number;
  icon: string;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export interface MusicAnalysis {
  music: MusicDetail;
  overallScore: number;
  ratings: PlatformRating[];
  weeklyPlays: number;
  totalPlays: number;
  peakRank: number;
  currentRank: number;
  weeksOnChart: number;
  sentimentScore: number;
}