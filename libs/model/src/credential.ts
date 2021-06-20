import { BeforeInsert, BeforeUpdate, ManyToOne, Entity, Column } from "typeorm";
import {
  FilterableField,
  FilterableRelation
} from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { hash, compare } from "bcryptjs";

import { Persistent } from "./base";
import { User } from "./user";

@FilterableRelation(`user`, () => User, {
  disableRemove: true,
  disableUpdate: true
})
@ObjectType({ isAbstract: true })
class Credential extends Persistent {
  @FilterableField(() => ID)
  @ManyToOne(() => User, user => user.id)
  user!: User;
}

@ObjectType()
@Entity({ name: `local_credential` })
export class LocalCredential extends Credential {
  @Column()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPass() {
    this.password = await hash(this.password, 4);
  }

  async validatePass(raw: string) {
    return compare(raw, this.password);
  }
}
