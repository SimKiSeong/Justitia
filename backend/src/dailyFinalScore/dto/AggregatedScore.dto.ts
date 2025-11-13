import { ApiProperty } from '@nestjs/swagger';

export class AggregatedScoreDto {
  @ApiProperty({ description: '집계 시작 날짜', example: '2025-09-05' })
  startDate: Date;

  @ApiProperty({ description: '집계 종료 날짜', example: '2025-09-11' })
  endDate: Date;

  @ApiProperty({ description: '검색 쿼리', example: 'aespa 에스파 \'Rich Man\' MV' })
  query: string;

  @ApiProperty({ description: '집계 기간 타입', example: 'weekly', enum: ['daily', 'weekly', 'monthly'] })
  term: string;

  @ApiProperty({ description: '평균 조회수', example: 6367192 })
  avgViewCount: number;

  @ApiProperty({ description: '총 조회수', example: 44570344 })
  sumViewCount: number;

  @ApiProperty({ description: '평균 댓글 수', example: 17081 })
  avgCommentCount: number;

  @ApiProperty({ description: '총 댓글 수', example: 119567 })
  sumCommentCount: number;

  @ApiProperty({ description: '평균 좋아요 수', example: 724478 })
  avgLikeCount: number;

  @ApiProperty({ description: '총 좋아요 수', example: 5071346 })
  sumLikeCount: number;

  @ApiProperty({ description: '평균 정규화 조회수', example: 0.8953 })
  avgNormView: number;

  @ApiProperty({ description: '평균 댓글 비율', example: 0.0268 })
  avgPctComment: number;

  @ApiProperty({ description: '평균 좋아요 비율', example: 0.1138 })
  avgLikeRatio: number;

  @ApiProperty({ description: '평균 감성분석 점수', example: 4.4677 })
  avgSentimentTrueMean: number;

  @ApiProperty({ description: '평균 감성분석 정규화 점수', example: 0.8669 })
  avgSentimentNorm: number;

  @ApiProperty({ description: '평균 소셜 지표 정규화 점수', example: 0.6862 })
  avgSocialNormMean: number;

  @ApiProperty({ description: '평균 일별 조회수 증분', example: 7.6 })
  avgDView: number;

  @ApiProperty({ description: '평균 5점 척도 점수', example: 3.1989 })
  avgScore5: number;

  @ApiProperty({ description: '평균 등급', example: 'B+', enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'N/A'] })
  avgGrade: string;

  @ApiProperty({ description: '집계된 데이터 개수', example: 7 })
  dataCount: number;
}