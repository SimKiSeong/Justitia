import { Column, Entity } from "typeorm";

@Entity("X_MENTION_DAILY", { schema: "justitia" })
export class XMentionDaily {
  @Column("date", { primary: true, name: "created_at" })
  createdAt: string;

  @Column("int", { name: "post_count", nullable: true, default: () => "'0'" })
  postCount: number | null;
}
