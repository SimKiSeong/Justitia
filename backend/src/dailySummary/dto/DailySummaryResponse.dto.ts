import { ApiProperty } from '@nestjs/swagger';

export class DailySummaryResponseDto {
  @ApiProperty({ description: '기본키 (자동증가)', example: 1 })
  id: number;

  @ApiProperty({ description: '요약 날짜', example: '2025-11-16' })
  summaryDate: string;

  @ApiProperty({ description: '플랫폼 (twitter/youtube/combined)', example: 'youtube', enum: ['twitter', 'youtube', 'combined'] })
  platform: string;

  @ApiProperty({ description: '요약문 (3-5 줄)', example: '오늘 유튜브에서는 긍정적인 반응이 많았습니다.', nullable: true })
  summaryText: string | null;

  @ApiProperty({ description: '감정 (positive/negative/neutral)', example: 'positive', enum: ['positive', 'negative', 'neutral'], nullable: true })
  sentiment: string | null;

  @ApiProperty({ description: '주요 키워드 (쉼표로 구분)', example: '좋아요, 최고, 멋지다', nullable: true })
  keywords: string | null;

  @ApiProperty({ description: '원본 리뷰/댓글 수', example: 150, nullable: true })
  reviewCount: number | null;

  @ApiProperty({ description: '레코드 생성 시간', example: '2025-11-16T10:00:00.000Z', nullable: true })
  createdAt: Date | null;
}