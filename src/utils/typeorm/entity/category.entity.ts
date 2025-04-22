import { Entity, Column } from "typeorm";

import { Base } from "./_base.entity";

@Entity()
export class Category extends Base {
  @Column()
  title: string;
}
