import { Test } from "@nestjs/testing";

import { ConnectionModule } from "./connection.module";

describe(__filename, () => {
  it(`can spin up database connection for unit test`, async () => {
    const testMod = await Test.createTestingModule({
      imports: [ConnectionModule.forRoot()]
    }).compile();
    const app = testMod.createNestApplication();
    await app.init();
    await app.close();
  });
});
