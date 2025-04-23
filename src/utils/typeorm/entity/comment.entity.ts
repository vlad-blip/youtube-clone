import { Entity, Column, ManyToOne, type Relation } from "typeorm";
import { Base } from "./_base.entity";
import { Video } from "./video.entity";

@Entity()
export class Comment extends Base {
  @Column("uuid")
  user_id: string;

  @Column("text")
  content: string;

  @ManyToOne(() => Video, (video) => video.comments)
  video: Relation<Video>;
}
