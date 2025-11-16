import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_date_platform", ["summaryDate", "platform"], {})
@Entity("DAILY_SUMMARY", { schema: "justitia" })
export class DailySummary {
  /** 기본키 (자동증가) */
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  /** 요약 날짜 */
  @Column("date", { name: "summary_date" })
  summaryDate: string;

  /** 플랫폼 (twitter/youtube/combined) */
  @Column("varchar", { name: "platform", length: 20 })
  platform: string;

  /** 요약문 (3-5 줄) */
  @Column("text", { name: "summary_text", nullable: true })
  summaryText: string | null;

  /** 감정 (positive/negative/neutral) */
  @Column("varchar", { name: "sentiment", nullable: true, length: 20 })
  sentiment: string | null;

  /** 주요 키워드 (쉼표로 구분) */
  @Column("varchar", { name: "keywords", nullable: true, length: 500 })
  keywords: string | null;

  /** 원본 리뷰/댓글 수 */
  @Column("int", { name: "review_count", nullable: true })
  reviewCount: number | null;

  /** 레코드 생성 시간 */
  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
