// API 호출 유틸리티 함수
import {
  YoutubeVideo,
  YoutubeComment,
  YoutubeCommentScore,
  SentimentAnalysis,
  SentimentTrend,
  CommentWithSentiment,
  SentimentLabel,
  MusicScoreFnl,
  XMentionScore,
  DailyFinalScoreResponse,
  AggregatedScore,
  AISentimentAnalysis,
  DailySummaryResponse,
} from '@/types/api';

// 환경변수에서 API URL 가져오기, 없으면 배포된 서버 주소 사용
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://34.59.147.161:8000';

// 기본 fetch 래퍼
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log('🔍 API 요청:', fullUrl); // 디버깅용
    
    const response = await fetch(fullUrl, {
      cache: 'no-store', // SSR에서 매번 새로운 데이터 가져오기
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`API 호출 실패: ${endpoint}`, error);
    throw error;
  }
}

// YouTube API 호출 함수들
export const youtubeAPI = {
  // 모든 비디오 조회
  getVideos: (): Promise<YoutubeVideo[]> => {
    return fetchAPI<YoutubeVideo[]>('/youtube/videos');
  },

  // 모든 댓글 조회
  getComments: (): Promise<YoutubeComment[]> => {
    return fetchAPI<YoutubeComment[]>('/youtube/comments');
  },

  // 감성 점수가 있는 댓글 조회
  getCommentsWithScore: (): Promise<YoutubeCommentScore[]> => {
    return fetchAPI<YoutubeCommentScore[]>('/youtube/comments-score');
  },

  // 특정 비디오의 댓글만 필터링
  getCommentsByVideoId: async (videoId: string): Promise<YoutubeCommentScore[]> => {
    const allComments = await fetchAPI<YoutubeCommentScore[]>('/youtube/comments-score');
    return allComments.filter(comment => comment.videoId === videoId);
  },
};

// Music Score API
export const musicScoreAPI = {
  getAll: (): Promise<MusicScoreFnl[]> => {
    return fetchAPI<MusicScoreFnl[]>('/music-score-fnl');
  },
};

// X Mention API
export const xMentionAPI = {
  getScore: (): Promise<XMentionScore[]> => {
    return fetchAPI<XMentionScore[]>('/x-mention/score');
  },
  getDaily: (): Promise<any[]> => {
    return fetchAPI<any[]>('/x-mention/daily');
  },
  getRaw: (): Promise<any[]> => {
    return fetchAPI<any[]>('/x-mention/raw');
  },
};

// Daily Final Score API
export const dailyFinalScoreAPI = {
  get: (params?: { date?: string; endDate?: string; period?: string }): Promise<DailyFinalScoreResponse[]> => {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.append('date', params.date);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.period) queryParams.append('period', params.period);
    
    const query = queryParams.toString();
    return fetchAPI<DailyFinalScoreResponse[]>(`/daily-final-score${query ? `?${query}` : ''}`);
  },
  
  getAggregated: (params?: { date?: string; endDate?: string }): Promise<AggregatedScore> => {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.append('date', params.date);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    const query = queryParams.toString();
    return fetchAPI<AggregatedScore>(`/daily-final-score/aggregated${query ? `?${query}` : ''}`);
  },
};

// Sentiment AI API (신규 추가)
export const sentimentAPI = {
  // 특정 비디오의 AI 감성 분석 결과 조회
  analyzeVideo: (videoId: string): Promise<AISentimentAnalysis> => {
    return fetchAPI<AISentimentAnalysis>(`/sentiment/analyze/${videoId}`);
  },
};

// Daily Summary API
export const dailySummaryAPI = {
  get: (params?: { startDate?: string; endDate?: string; platform?: string }): Promise<DailySummaryResponse[]> => {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.platform) queryParams.append('platform', params.platform);
    
    const query = queryParams.toString();
    return fetchAPI<DailySummaryResponse[]>(`/daily-summary${query ? `?${query}` : ''}`);
  },
};

// 감성 분석 유틸리티 함수들
export const sentimentUtils = {
  // 댓글 배열에서 감성 집계 (score: 1~5 점수를 긍정/중립/부정으로 분류)
  analyzeSentiment: (comments: YoutubeCommentScore[]): SentimentAnalysis => {
    const positive = comments.filter(c => c.score && c.score >= 4).length; // 4~5점: 긍정
    const neutral = comments.filter(c => c.score === 3).length; // 3점: 중립
    const negative = comments.filter(c => c.score && c.score <= 2).length; // 1~2점: 부정
    
    return {
      positive,
      neutral,
      negative,
      total: comments.length
    };
  },

  // score를 감성 라벨로 변환 (1~5 점수 기준)
  scoreToLabel: (score: number | null): SentimentLabel => {
    if (!score) return 'neutral';
    if (score >= 4) return 'positive'; // 4~5점
    if (score <= 2) return 'negative'; // 1~2점
    return 'neutral'; // 3점
  },

  // 댓글에 감성 라벨 추가
  addSentimentLabel: (comment: YoutubeCommentScore): CommentWithSentiment => {
    return {
      ...comment,
      sentimentLabel: sentimentUtils.scoreToLabel(comment.score)
    };
  },

  // 댓글 배열에 감성 라벨 추가
  addSentimentLabels: (comments: YoutubeCommentScore[]): CommentWithSentiment[] => {
    return comments.map(sentimentUtils.addSentimentLabel);
  },

  // 시간대별 감성 트렌드 생성 (일별)
  generateDailyTrend: (comments: YoutubeCommentScore[]): SentimentTrend[] => {
    // 날짜별로 그룹화
    const groupedByDate = comments.reduce((acc, comment) => {
      if (!comment.publishedAt) return acc;
      
      const date = new Date(comment.publishedAt);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      if (!acc[dateKey]) {
        acc[dateKey] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      // 1~5 점수 기준으로 분류
      if (comment.score && comment.score >= 4) acc[dateKey].positive++;
      else if (comment.score && comment.score <= 2) acc[dateKey].negative++;
      else acc[dateKey].neutral++;
      
      return acc;
    }, {} as Record<string, { positive: number; neutral: number; negative: 0 }>);

    // 배열로 변환하고 날짜순 정렬
    const allTrends = Object.entries(groupedByDate)
      .map(([date, counts]) => ({
        time: date,
        ...counts
      }))
      .sort((a, b) => a.time.localeCompare(b.time));
    
    // 모든 일별 트렌드 반환 (11/1부터 현재까지)
    return allTrends;
  },

  // 시간대별 감성 트렌드 (시간별)
  generateHourlyTrend: (comments: YoutubeCommentScore[]): SentimentTrend[] => {
    // 시간별로 그룹화
    const groupedByHour = comments.reduce((acc, comment) => {
      if (!comment.publishedAt) return acc;
      
      const date = new Date(comment.publishedAt);
      const hourKey = `${date.toISOString().split('T')[0]} ${String(date.getHours()).padStart(2, '0')}:00`;
      
      if (!acc[hourKey]) {
        acc[hourKey] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      // 1~5 점수 기준으로 분류
      if (comment.score && comment.score >= 4) acc[hourKey].positive++;
      else if (comment.score && comment.score <= 2) acc[hourKey].negative++;
      else acc[hourKey].neutral++;
      
      return acc;
    }, {} as Record<string, { positive: number; neutral: number; negative: number }>);

    // 배열로 변환하고 시간순 정렬
    return Object.entries(groupedByHour)
      .map(([time, counts]) => ({
        time,
        ...counts
      }))
      .sort((a, b) => a.time.localeCompare(b.time));
  },

  // 감성별 댓글 필터링
  filterBysentiment: (
    comments: CommentWithSentiment[], 
    sentiment: SentimentLabel | 'all'
  ): CommentWithSentiment[] => {
    if (sentiment === 'all') return comments;
    return comments.filter(c => c.sentimentLabel === sentiment);
  },
};
