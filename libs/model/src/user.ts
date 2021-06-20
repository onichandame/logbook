import { Entity, Column } from "typeorm";
import { ObjectType } from "@nestjs/graphql";
import { FilterableField } from "@nestjs-query/query-graphql";

import { Universal } from "./base";

@ObjectType()
@Entity({ name: `user` })
export class User extends Universal {
  @FilterableField()
  @Column()
  name!: string;

  @FilterableField({ nullable: true })
  @Column({ nullable: true })
  email?: string;
}
