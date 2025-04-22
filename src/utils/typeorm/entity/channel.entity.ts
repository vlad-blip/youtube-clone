import { Column, Entity, ManyToOne, OneToMany, type Relation } from "typeorm";

import { Video } from "./video.entity";
import { Base } from "./_base.entity";
import { Subscription } from "./subscription.entity";

@Entity()
export class Channel extends Base {
  @Column()
  title: string;

  @Column({ nullable: true })
  channel_image_filename: string;

  @Column({ type: "uuid" })
  user: string;

  @Column({ default: 0 })
  subscriber_count: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Video, (video) => video.channel)
  videos: Relation<Video[]>;

  @ManyToOne(() => Subscription, (subscription) => subscription.channel)
  subscriptions: Relation<Subscription[]>;
}
