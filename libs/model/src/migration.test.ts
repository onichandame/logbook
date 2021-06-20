import { TestModule } from "./base.test-util";

import * as Models from "./models";

describe(__filename, () => {
  let testMod: TestModule;
  beforeAll(async () => {
    testMod = await TestModule.create({ entities: Object.values(Models) });
  });
  afterAll(() => TestModule.close(testMod));

  it(`can run migrations`, () => {
    expect(
      testMod.em.find(Object.values(Models)[0], {})
    ).resolves.toBeDefined();
  });
});
