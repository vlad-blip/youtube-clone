import { Base } from "./_base.entity";
import { Entity, type Relation, Column, ManyToOne } from "typeorm";
import { Channel } from "./channel.entity";

@Entity()
export class Subscription extends Base {
  @Column()
  user_id: string;

  @ManyToOne(() => Channel, (channel) => channel.subscriptions)
  channel: Relation<Channel>;
}
