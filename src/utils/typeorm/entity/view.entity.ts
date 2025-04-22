import { Entity, Column, ManyToOne, type Relation } from "typeorm";

import { Base } from "./_base.entity";
import { Video } from "./video.entity";

@Entity()
export class View extends Base {
  @Column({ nullable: true })
  user_id?: string;

  @ManyToOne(() => Video, {
    onDelete: "CASCADE",
  })
  video: Relation<Video>;
}
