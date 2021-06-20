import { Entity, Column } from "typeorm";

import { TestModule } from "./base.test-util";
import { Base, Timestamp, Persistent, Universal } from "./base";

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

@Entity()
class TestPersistent extends Persistent {
  @Column()
  random!: number;
}

@Entity()
class TestUniversal extends Universal {
  @Column()
  random!: number;
}

describe(__filename, () => {
  let testMod: TestModule;
  beforeAll(async () => {
    testMod = await TestModule.create({
      synchronize: true,
      entities: [TestBase, TestTimestamp, TestPersistent, TestUniversal]
    });
  });
  afterAll(() => TestModule.close(testMod));

  it(`can extend base`, async () => {
    const em = testMod.em;
    const doc = await em.save(em.create(TestBase, { random: Math.random() }));
    expect(doc.id).toBeDefined();
  });

  it(`can extend timestamp`, async () => {
    const em = testMod.em;
    let doc = await em.save(
      em.create(TestTimestamp, { random: Math.random() })
    );
    expect(doc.createdAt).toBeTruthy();
    doc.random = Math.random();
    doc = await em.save(doc);
    expect(doc.updatedAt).toBeTruthy();
  });

  it(`can extend persistent`, async () => {
    const em = testMod.em;
    const random = Math.random();
    const doc = await em.save(em.create(TestPersistent, { random }));
    await em.softRemove(TestPersistent, doc);
    // soft deleted docs not returned by find
    expect(em.findOne(TestPersistent, doc.id)).resolves.toBeFalsy();
    expect(
      em.findOne(TestPersistent, doc.id, { withDeleted: true })
    ).resolves.toBeTruthy();
    await em.restore(TestPersistent, { id: doc.id });
    // restored docs are returned
    const restoredDoc = await em.findOne(TestPersistent, doc.id);
    expect(restoredDoc).toBeTruthy();
    expect(restoredDoc?.deletedAt).toBeFalsy();
    expect(restoredDoc?.random).toEqual(random);
  });

  it(`can extend universal`, async () => {
    const em = testMod.em;
    const random = Math.random();
    const doc1 = await em.save(em.create(TestUniversal, { random }));
    const doc2 = await em.save(em.create(TestUniversal, { random }));
    // should auto-generate uuid
    expect(doc1.uuid && doc2.uuid).toBeTruthy();
    expect(doc1.uuid).not.toEqual(doc2.uuid);
  });
});
