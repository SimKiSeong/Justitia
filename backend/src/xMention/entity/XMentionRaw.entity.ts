import { Column, Entity } from "typeorm";

@Entity("X_MENTION_RAW", { schema: "justitia" })
export class XMentionRaw {
  @Column("varchar", { name: "tweet_url", length: 200 })
  tweetUrl: string;

  @Column("varchar", { primary: true, name: "tweet_id", length: 40 })
  tweetId: string;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("varchar", { name: "author_id", nullable: true, length: 50 })
  authorId: string | null;

  @Column("varchar", { name: "author_name", nullable: true, length: 100 })
  authorName: string | null;

  @Column("text", { name: "tweet_text", nullable: true })
  tweetText: string | null;
}
