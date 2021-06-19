import { v1 as createUid } from "uuid";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn()
  id!: number;
}

export abstract class Timestamp extends Base {
  @UpdateDateColumn()
  updatedAt!: Date;
  @CreateDateColumn()
  createdAt!: Date;
}

export abstract class Persistent extends Timestamp {
  @DeleteDateColumn()
  deletedAt!: Date;
}

export abstract class Universal extends Persistent {
  @Column({ unique: true })
  uuid!: string;

  @BeforeInsert()
  createUuid() {
    this.uuid = createUid();
  }
}
