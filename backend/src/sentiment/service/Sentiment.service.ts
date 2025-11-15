import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YoutubeCommentsScore } from '../../youtube/entity/YoutubeCommentsScore.entity';
import { SimpleSentimentService } from './SimpleSentiment.service';
import {
  SentimentAnalysisResponse,
  CommentWithSentiment,
  SentimentTrend,
} from '../dto/SentimentAnalysisResponse.dto';

@Injectable()
export class SentimentService {
  private readonly logger = new Logger(SentimentService.name);

  constructor(
    @InjectRepository(YoutubeCommentsScore)
    private commentsRepository: Repository<YoutubeCommentsScore>,
    private simpleSentimentService: SimpleSentimentService,
  ) {}

  /**
   * 비디오의 댓글 감성 분석
   * @param videoId YouTube 비디오 ID
   * @returns 감성 분석 결과
   */
  async analyzeVideoComments(
    videoId: string,
  ): Promise<SentimentAnalysisResponse> {
    this.logger.log(`비디오 ${videoId}의 댓글 분석 시작`);

    try {
      // 1. DB에서 댓글 조회 (videoId가 null인 경우도 포함)
      let comments = await this.commentsRepository.find({
        where: { videoId },
        order: { publishedAt: 'DESC' },
        // take 제거 - 전체 댓글 가져오기
      });

      // videoId로 댓글이 없으면 전체 댓글에서 가져오기
      if (comments.length === 0) {
        this.logger.warn(`비디오 ${videoId}의 댓글이 없습니다. 전체 댓글에서 가져옵니다.`);
        comments = await this.commentsRepository.find({
          order: { publishedAt: 'DESC' },
          // take 제거 - 전체 댓글 가져오기
        });
      }

      if (comments.length === 0) {
        this.logger.warn(`DB에 댓글이 전혀 없습니다.`);
        // 빈 결과 반환
        return {
          summary: 'DB에 분석할 댓글이 없습니다. YouTube 댓글을 먼저 수집해주세요.',
          sentiment: { positive: 0, neutral: 0, negative: 0, total: 0 },
          keywords: [],
          trends: [],
          comments: [],
        };
      }

      this.logger.log(`${comments.length}개의 댓글 발견`);

      // 2. 각 댓글 감성 분석 (키워드 기반 - 빠르고 안정적)
      const analyzedComments: CommentWithSentiment[] = comments.map((comment) => {
        const sentiment = this.simpleSentimentService.analyzeSentiment(
          comment.text || '',
        );

        return {
          commentId: comment.commentId,
          text: comment.text || '',
          score: comment.score || 0,
          sentimentLabel: sentiment.label,
          sentimentScore: sentiment.score,
          publishedAt: comment.publishedAt || new Date(),
          likeCount: comment.likeCount || 0,
          authorDisplayName: comment.authorDisplayName || 'Unknown',
        };
      });

      this.logger.log(`${analyzedComments.length}개 댓글 분석 완료`);

      // 3. 감성 통계 계산
      const sentimentStats = {
        positive: analyzedComments.filter(
          (c) => c.sentimentLabel === 'positive',
        ).length,
        neutral: analyzedComments.filter((c) => c.sentimentLabel === 'neutral')
          .length,
        negative: analyzedComments.filter(
          (c) => c.sentimentLabel === 'negative',
        ).length,
        total: analyzedComments.length,
      };

      // 4. 시간대별 트렌드 계산
      const trends = this.calculateTrends(analyzedComments);

      // 5. 키워드 추출
      const keywords = this.simpleSentimentService.extractKeywords(
        analyzedComments.map((c) => c.text),
      );

      // 6. 요약 생성 (통계 기반)
      const summary = this.simpleSentimentService.generateSummary(
        sentimentStats,
        keywords,
      );

      this.logger.log(`비디오 ${videoId} 분석 완료`);

      return {
        summary,
        sentiment: sentimentStats,
        keywords,
        trends,
        comments: analyzedComments,
      };
    } catch (error) {
      this.logger.error(`분석 중 오류 발생: ${error.message} - Stack: ${error.stack}`);
      throw new Error(`감성 분석 실패: ${error.message}`);
    }
  }

  /**
   * 시간대별 감성 트렌드 계산
   * @param comments 분석된 댓글 배열
   * @returns 일별 트렌드 데이터
   */
  private calculateTrends(
    comments: CommentWithSentiment[],
  ): SentimentTrend[] {
    const trendMap: {
      [date: string]: { positive: number; neutral: number; negative: number };
    } = {};

    comments.forEach((comment) => {
      const date = comment.publishedAt.toISOString().split('T')[0];
      if (!trendMap[date]) {
        trendMap[date] = { positive: 0, neutral: 0, negative: 0 };
      }
      trendMap[date][comment.sentimentLabel]++;
    });

    return Object.entries(trendMap)
      .map(([date, counts]) => ({
        date,
        ...counts,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30); // 최근 30일
  }
}
