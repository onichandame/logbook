import { Config } from "@jest/types";

export default {
  testMatch: [`**/src/**/?(*.)+(spec|test).ts?(x)`],
  preset: `ts-jest`
} as Config.InitialOptions;
