import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  type Relation,
} from "typeorm";

import { Video } from "./video.entity";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: "int8" })
  readonly id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  channel_image_filename: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;

  @Column({ type: "uuid" })
  user: string;

  @Column({ type: "int8", default: 0 })
  subscriber_count: number;

  @OneToMany(() => Video, (video) => video.channel)
  videos: Relation<Video[]>;
}
