import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("unique_date_query_title", ["dateKst", "query"], { unique: true })
@Entity("DAILY_FINAL_SCORE", { schema: "justitia" })
export class DailyFinalScore {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date_kst", comment: "기준 날짜 (KST)" })
  dateKst: Date;

  @Column("varchar", {
    name: "query",
    comment: "검색 키워드/쿼리",
    length: 255,
  })
  query: string;

  @Column("varchar", { name: "title", comment: "영상 제목", length: 255 })
  title: string;

  @Column("bigint", {
    name: "view_count",
    nullable: true,
    comment: "조회수 (정수)",
  })
  viewCount: string | null;

  @Column("int", {
    name: "comment_count",
    nullable: true,
    comment: "댓글 수 (정수)",
  })
  commentCount: number | null;

  @Column("int", {
    name: "like_count",
    nullable: true,
    comment: "좋아요 수 (정수)",
  })
  likeCount: number | null;

  @Column("decimal", {
    name: "norm_view",
    nullable: true,
    comment: "정규화 조회수",
    precision: 10,
    scale: 4,
  })
  normView: string | null;

  @Column("decimal", {
    name: "pct_comment",
    nullable: true,
    comment: "댓글 비율 (정규화된 댓글 수)",
    precision: 10,
    scale: 4,
  })
  pctComment: string | null;

  @Column("decimal", {
    name: "like_ratio",
    nullable: true,
    comment: "좋아요 비율 (정규화된 좋아요 수)",
    precision: 10,
    scale: 4,
  })
  likeRatio: string | null;

  @Column("decimal", {
    name: "sentiment_true_mean",
    nullable: true,
    comment: "감성분석 평균 점수 (relevance=1)",
    precision: 10,
    scale: 4,
  })
  sentimentTrueMean: string | null;

  @Column("decimal", {
    name: "sentiment_norm",
    nullable: true,
    comment: "감성분석 정규화 점수",
    precision: 10,
    scale: 4,
  })
  sentimentNorm: string | null;

  @Column("decimal", {
    name: "social_norm_mean",
    nullable: true,
    comment: "소셜 지표 정규화 평균",
    precision: 10,
    scale: 4,
  })
  socialNormMean: string | null;

  @Column("varchar", {
    name: "weights",
    nullable: true,
    comment: "적용된 가중치 (view/comment/like/sent/social)",
    length: 50,
  })
  weights: string | null;

  @Column("decimal", {
    name: "D_view",
    nullable: true,
    comment: "일별 조회수 증분 (D_view)",
    precision: 10,
    scale: 4,
  })
  dView: string | null;

  @Column("varchar", {
    name: "scenario",
    nullable: true,
    comment: "적용된 시나리오 이름",
    length: 50,
  })
  scenario: string | null;

  @Column("decimal", {
    name: "score_5",
    nullable: true,
    comment: "최종 5점 척도 점수",
    precision: 10,
    scale: 4,
  })
  score_5: string | null;

  @Column("varchar", {
    name: "grade",
    nullable: true,
    comment: "최종 점수 등급",
    length: 10,
  })
  grade: string | null;

  @Column("datetime", {
    name: "timestamp_kst",
    comment: "데이터 삽입 시간 (KST)",
  })
  timestampKst: Date;
}
