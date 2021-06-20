import { v1 as createUid } from "uuid";
import { GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import { IDField, FilterableField } from "@nestjs-query/query-graphql";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";

@ObjectType({ isAbstract: true })
export abstract class Base {
  @IDField(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;
}

@ObjectType({ isAbstract: true })
export abstract class Timestamp extends Base {
  @FilterableField(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updatedAt!: Date;
  @FilterableField(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt!: Date;
}

@ObjectType({ isAbstract: true })
export abstract class Persistent extends Timestamp {
  @FilterableField(() => GraphQLISODateTime)
  @DeleteDateColumn()
  deletedAt?: Date;
}

@ObjectType({ isAbstract: true })
export abstract class Universal extends Persistent {
  @FilterableField()
  @Column({ unique: true })
  uuid!: string;

  @BeforeInsert()
  createUuid() {
    this.uuid = createUid();
  }
}
