import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("X_MENTION_SCORE", { schema: "justitia" })
export class XMentionScore {
  @PrimaryGeneratedColumn({ type: "int", name: "score_id" })
  scoreId: number;

  @Column("date", { name: "created_at" })
  createdAt: string;

  @Column("varchar", { name: "score_type", length: 50 })
  scoreType: string;

  @Column("float", {
    name: "score",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  score: number | null;
}
