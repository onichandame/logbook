import { Test } from "@nestjs/testing";

import { SqliteModule } from "./sqlite.module";

describe(__filename, () => {
  it(`can spin up database connection for unit test`, async () => {
    const testMod = await Test.createTestingModule({
      imports: [SqliteModule]
    }).compile();
    const app = testMod.createNestApplication();
    await app.init();
    await app.close();
  });
});
