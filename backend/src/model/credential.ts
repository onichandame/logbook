import { BeforeInsert, BeforeUpdate, ManyToOne, Entity, Column } from "typeorm";
import { hash, compare } from "bcryptjs";

import { Persistent } from "./base";
import { User } from "./user";

abstract class Credential extends Persistent {
  @ManyToOne(() => User, user => user.id)
  user!: User;
}

@Entity()
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
