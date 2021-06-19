import { Entity, Column } from "typeorm";

import { Universal } from "./base";

@Entity()
export class User extends Universal {
  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;
}
