export class SentimentAnalysisResponse {
  summary: string; // AI 생성 요약
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    total: number;
  };
  keywords: string[]; // 주요 키워드
  trends: SentimentTrend[];
  comments: CommentWithSentiment[];
}

export class SentimentTrend {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
}

export class CommentWithSentiment {
  commentId: string;
  text: string;
  score: number;
  sentimentLabel: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // AI 감성 점수 (0-1)
  publishedAt: Date;
  likeCount: number;
  authorDisplayName: string;
}
