import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  type Relation,
  JoinTable,
  OneToMany,
} from "typeorm";

import { Channel } from "./channel.entity";
import { Category } from "./category.entity";
import { Reaction } from "./reaction.entity";
import { Base } from "./_base.entity";
import { Comment } from "./comment.entity";

export enum VideoType {
  VIDEO = "video",
  SHORTS = "shorts",
}

@Entity()
export class Video extends Base {
  @Column()
  media_name: string;

  @ManyToOne(() => Channel, (channel) => channel.videos)
  channel: Relation<Channel>;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column()
  title: string;

  @Column()
  thumbnail_name: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column()
  file_size: number;

  @Column()
  status: string;

  @Column({ default: 0 })
  like_count: number;

  @Column({ default: 0 })
  dislike_count: number;

  @Column({ default: 0 })
  view_count: number;

  @Column({ enum: VideoType, nullable: true })
  type: VideoType;

  @OneToMany(() => Reaction, (reaction) => reaction.video, { nullable: true })
  reactions: Relation<Reaction[]>;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Relation<Comment[]>;
}
