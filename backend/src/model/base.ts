import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn()
  id!: number;
}

@Entity()
export abstract class Timestamp extends Base {
  @UpdateDateColumn()
  updatedAt!: Date;
  @CreateDateColumn()
  createdAt!: Date;
}

@Entity()
export abstract class Persistent extends Timestamp {
  @DeleteDateColumn()
  deletedAt!: Date;
}
