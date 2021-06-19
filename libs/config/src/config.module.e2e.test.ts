import { Test } from "@nestjs/testing";

import { ConfigModule } from "./config.module";
import { ConfigService } from "./config.service";
import { configFactory } from "./config.data";

const deepEquals = (a: any, b: typeof a): boolean => {
  const aKeys: (string | symbol)[] = [];
  for (const i in a) {
    aKeys.push(i);
    const aVal = a[i];
    const bVal = b[i];
    if (typeof aVal !== typeof bVal) return false;
    else if (Array.isArray(aVal))
      return aVal.every((val, ind) => deepEquals(val, bVal[ind]));
    else if (typeof aVal === `object`) return deepEquals(aVal, bVal);
    else if (aVal !== bVal) return false;
  }
  for (const i in b) {
    if (aKeys.indexOf(i) < 0) return false;
  }
  return true;
};

describe(__filename, () => {
  it(`can load configuration object`, async () => {
    const testApp = (
      await Test.createTestingModule({ imports: [ConfigModule] }).compile()
    ).createNestApplication();
    const data = configFactory();
    for (const i in data) {
      const config = testApp.get(ConfigService).get(i);
      expect(deepEquals((<any>data)[i], config)).toBeTruthy();
    }
  });
});
