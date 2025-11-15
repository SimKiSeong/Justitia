// API 타입 정의 - 백엔드 Entity 기반

// YouTube 관련 타입
export interface YoutubeVideo {
  videoId: string;
  title: string | null;
  channelTitle: string | null;
  viewCount: string | null;
  commentCount: string | null;
  likeCount: string | null;
  likeRatioPct: string | null;
  publishedAtUtc: Date | null;
  collectedAtKst: Date | null;
  videoUrl: string | null;
}

export interface YoutubeComment {
  commentId: string;
  videoId: string;
  parentId: string | null;
  authorDisplayName: string | null;
  likeCount: number | null;
  publishedAt: Date | null;
  updatedAt: Date | null;
  text: string | null;
  collectedAtLocal: Date | null;
}

export interface YoutubeCommentScore extends YoutubeComment {
  score: number | null; // 감성 점수 (-1: 부정, 0: 중립, 1: 긍정)
  relevance: string | null;
}

// 감성 분석 집계 데이터 타입
export interface SentimentAnalysis {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

// 시간대별 감성 트렌드 데이터
export interface SentimentTrend {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
}

// 댓글 표시용 타입 (감성 라벨 추가)
export type SentimentLabel = 'positive' | 'neutral' | 'negative';

export interface CommentWithSentiment extends YoutubeCommentScore {
  sentimentLabel: SentimentLabel;
}

// Music Score 관련 타입
export interface MusicScoreFnl {
  musicId: string;
  title: string | null;
  artist: string | null;
  averageScore: number | null;
  // 필요한 다른 필드들 추가
}

// X Mention 관련 타입
export interface XMentionScore {
  mentionId: string;
  content: string | null;
  score: number | null;
  // 필요한 다른 필드들 추가
}

// Daily Final Score 관련 타입
export interface DailyFinalScoreResponse {
  date: string;
  score: number;
  // 필요한 다른 필드들 추가
}

export interface AggregatedScore {
  average: number;
  total: number;
  count: number;
  // 필요한 다른 필드들 추가
}
