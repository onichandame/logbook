import { Entity, Column } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;
}
