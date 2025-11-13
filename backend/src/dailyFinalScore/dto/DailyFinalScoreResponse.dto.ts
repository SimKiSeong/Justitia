import { ApiProperty } from '@nestjs/swagger';

export class DailyFinalScoreResponseDto {
  @ApiProperty({ description: '고유 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '기준 날짜 (KST)', example: '2025-09-05' })
  dateKst: Date;

  @ApiProperty({ description: '검색 키워드/쿼리', example: 'aespa 에스파 \'Rich Man\' MV' })
  query: string;

  @ApiProperty({ description: '영상 제목', example: 'aespa 에스파 \'Rich Man\' MV' })
  title: string;

  @ApiProperty({ description: '조회수', example: '6367192', nullable: true })
  viewCount: string | null;

  @ApiProperty({ description: '댓글 수', example: 17081, nullable: true })
  commentCount: number | null;

  @ApiProperty({ description: '좋아요 수', example: 724478, nullable: true })
  likeCount: number | null;

  @ApiProperty({ description: '정규화 조회수', example: '0.8953', nullable: true })
  normView: string | null;

  @ApiProperty({ description: '댓글 비율 (정규화된 댓글 수)', example: '0.0000', nullable: true })
  pctComment: string | null;

  @ApiProperty({ description: '좋아요 비율 (정규화된 좋아요 수)', example: '0.1138', nullable: true })
  likeRatio: string | null;

  @ApiProperty({ description: '감성분석 평균 점수 (relevance=1)', example: '4.4677', nullable: true })
  sentimentTrueMean: string | null;

  @ApiProperty({ description: '감성분석 정규화 점수', example: '0.8669', nullable: true })
  sentimentNorm: string | null;

  @ApiProperty({ description: '소셜 지표 정규화 평균', example: '0.6862', nullable: true })
  socialNormMean: string | null;

  @ApiProperty({ description: '적용된 가중치 (view/comment/like/sent/social)', example: '0.12/0.12/0.12/0.44/0.20', nullable: true })
  weights: string | null;

  @ApiProperty({ description: '일별 조회수 증분 (D_view)', example: '7.6000', nullable: true })
  dView: string | null;

  @ApiProperty({ description: '적용된 시나리오 이름', example: 'Manual', nullable: true })
  scenario: string | null;

  @ApiProperty({ description: '최종 5점 척도 점수', example: '3.1989', nullable: true })
  score_5: string | null;

  @ApiProperty({ description: '최종 점수 등급', example: 'B+', nullable: true, enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'] })
  grade: string | null;

  @ApiProperty({ description: '데이터 삽입 시간 (KST)', example: '2025-11-08T02:15:59.000Z' })
  timestampKst: Date;
}