import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { YoutubeVideo } from "./YoutubeVideo.entity";

@Index("FK_YoutubeComments_Video", ["videoId"], {})
@Entity("YOUTUBE_COMMENTS", { schema: "justitia" })
export class YoutubeComments {
  @Column("varchar", { primary: true, name: "comment_id", length: 100 })
  commentId: string;

  @Column("varchar", { name: "video_id", length: 50 })
  videoId: string;

  @Column("varchar", { name: "parent_id", nullable: true, length: 100 })
  parentId: string | null;

  @Column("varchar", {
    name: "author_display_name",
    nullable: true,
    length: 200,
  })
  authorDisplayName: string | null;

  @Column("int", { name: "like_count", nullable: true })
  likeCount: number | null;

  @Column("datetime", { name: "published_at", nullable: true })
  publishedAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("text", { name: "text", nullable: true })
  text: string | null;

  @Column("datetime", { name: "collected_at_local", nullable: true })
  collectedAtLocal: Date | null;

  @ManyToOne(
    () => YoutubeVideo,
    (youtubeVideo) => youtubeVideo.youtubeComments,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "video_id", referencedColumnName: "videoId" }])
  video: YoutubeVideo;
}
