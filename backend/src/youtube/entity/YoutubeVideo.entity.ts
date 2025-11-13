import { Column, Entity, OneToMany } from "typeorm";
import { YoutubeComments } from "./YoutubeComments.entity";
import { YoutubeCommentsScore } from "./YoutubeCommentsScore.entity";

@Entity("YOUTUBE_VIDEO", { schema: "justitia" })
export class YoutubeVideo {
  @Column("varchar", { primary: true, name: "video_id", length: 50 })
  videoId: string;

  @Column("varchar", { name: "title", nullable: true, length: 500 })
  title: string | null;

  @Column("varchar", { name: "channel_title", nullable: true, length: 200 })
  channelTitle: string | null;

  @Column("bigint", { name: "view_count", nullable: true })
  viewCount: string | null;

  @Column("bigint", { name: "comment_count", nullable: true })
  commentCount: string | null;

  @Column("bigint", { name: "like_count", nullable: true })
  likeCount: string | null;

  @Column("decimal", {
    name: "like_ratio_pct",
    nullable: true,
    precision: 10,
    scale: 3,
  })
  likeRatioPct: string | null;

  @Column("datetime", { name: "published_at_utc", nullable: true })
  publishedAtUtc: Date | null;

  @Column("datetime", { name: "collected_at_kst", nullable: true })
  collectedAtKst: Date | null;

  @Column("varchar", { name: "video_url", nullable: true, length: 500 })
  videoUrl: string | null;

  @OneToMany(() => YoutubeComments, (youtubeComments) => youtubeComments.video)
  youtubeComments: YoutubeComments[];

  @OneToMany(
    () => YoutubeCommentsScore,
    (youtubeCommentsScore) => youtubeCommentsScore.video
  )
  youtubeCommentsScores: YoutubeCommentsScore[];
}
