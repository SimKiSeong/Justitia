import { Column, Entity } from "typeorm";

@Entity("MUSIC_SCORE_FNL", { schema: "justitia" })
export class MusicScoreFnl {
  @Column("datetime", { primary: true, name: "timestamp_kst" })
  timestampKst: Date;

  @Column("varchar", { name: "query", nullable: true, length: 255 })
  query: string | null;

  @Column("tinyint", { name: "auto_calib_view", nullable: true, width: 1 })
  autoCalibView: boolean | null;

  @Column("int", { name: "view_percentile", nullable: true })
  viewPercentile: number | null;

  @Column("decimal", { name: "D_view", nullable: true, precision: 6, scale: 2 })
  dView: string | null;

  @Column("varchar", { name: "scenario", nullable: true, length: 100 })
  scenario: string | null;

  @Column("decimal", {
    name: "w_view_effective",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  wViewEffective: string | null;

  @Column("decimal", {
    name: "w_comment_effective",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  wCommentEffective: string | null;

  @Column("decimal", {
    name: "w_like_effective",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  wLikeEffective: string | null;

  @Column("decimal", {
    name: "w_sent_effective",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  wSentEffective: string | null;

  @Column("decimal", {
    name: "w_social_effective",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  wSocialEffective: string | null;

  @Column("varchar", { name: "ui_weight_mode", nullable: true, length: 255 })
  uiWeightMode: string | null;

  @Column("decimal", {
    name: "ui_w_view",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  uiWView: string | null;

  @Column("decimal", {
    name: "ui_w_comment",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  uiWComment: string | null;

  @Column("decimal", {
    name: "ui_w_like",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  uiWLike: string | null;

  @Column("decimal", {
    name: "ui_w_sent",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  uiWSent: string | null;

  @Column("decimal", {
    name: "social_weight_param",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  socialWeightParam: string | null;

  @Column("decimal", {
    name: "social_norm_mean",
    nullable: true,
    precision: 6,
    scale: 3,
  })
  socialNormMean: string | null;

  @Column("bigint", { name: "view_count", nullable: true })
  viewCount: string | null;

  @Column("int", { name: "comment_count", nullable: true })
  commentCount: number | null;

  @Column("int", { name: "like_count", nullable: true })
  likeCount: number | null;

  @Column("decimal", {
    name: "norm_view",
    nullable: true,
    precision: 6,
    scale: 4,
  })
  normView: string | null;

  @Column("decimal", {
    name: "pct_comment",
    nullable: true,
    precision: 6,
    scale: 4,
  })
  pctComment: string | null;

  @Column("decimal", {
    name: "like_ratio",
    nullable: true,
    precision: 6,
    scale: 4,
  })
  likeRatio: string | null;

  @Column("decimal", {
    name: "sentiment_norm",
    nullable: true,
    precision: 6,
    scale: 3,
  })
  sentimentNorm: string | null;

  @Column("decimal", {
    name: "score_5",
    nullable: true,
    precision: 6,
    scale: 4,
  })
  score_5: string | null;

  @Column("char", { name: "grade", nullable: true, length: 2 })
  grade: string | null;
}
