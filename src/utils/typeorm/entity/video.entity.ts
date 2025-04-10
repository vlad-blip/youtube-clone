import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  type Relation,
  JoinTable,
} from "typeorm";

import { Channel } from "./channel.entity";
import { Category } from "./category.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn({ type: "int8" })
  readonly id: number;

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

  @Column({ enum: ["video", "shorts"], nullable: true })
  type: "video" | "shorts";

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;
}
