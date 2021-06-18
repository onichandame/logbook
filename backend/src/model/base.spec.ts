import { Entity, Column, EntityManager } from "typeorm";
import { TypeOrmModule, getEntityManagerToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { SqliteModule } from "../db-connection";

import { Base, Timestamp } from "./base";

@Entity()
class TestBase extends Base {
  @Column()
  random!: number;
}

@Entity()
class TestTimestamp extends Timestamp {
  @Column()
  random!: number;
}

describe(__filename, () => {
  let testMod: TestingModule;
  let em: EntityManager;
  beforeAll(async () => {
    testMod = await Test.createTestingModule({
      imports: [
        SqliteModule,
        TypeOrmModule.forFeature([TestBase, TestTimestamp])
      ]
    }).compile();
    expect(testMod).toBeTruthy();
    em = testMod.get<EntityManager>(getEntityManagerToken());
    expect(em).toBeTruthy();
  });

  it(`can extend base`, async () => {
    const doc = await em.save(em.create(TestBase, { random: Math.random() }));
    expect(doc.id).toBeDefined();
  });

  it(`can extend timestamp`, async () => {
    let doc = await em.save(
      em.create(TestTimestamp, { random: Math.random() })
    );
    expect(doc.createdAt).toBeTruthy();
    doc.random = Math.random();
    doc = await em.save(doc);
    expect(doc.updatedAt).toBeTruthy();
  });
});
