import { Entity, Column, ManyToOne, type Relation, Index } from "typeorm";

import { Video } from "./video.entity";
import { Base } from "./_base.entity";

export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
}

@Index(["video", "user_id"], { unique: true })
@Entity()
export class Reaction extends Base {
  @ManyToOne(() => Video, (video) => video.reactions, {
    onDelete: "CASCADE",
  })
  video: Relation<Video>;

  @Column()
  user_id: string;

  @Column({
    type: "enum",
    enum: ReactionType,
  })
  type: ReactionType;
}
