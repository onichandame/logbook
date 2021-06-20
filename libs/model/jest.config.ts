import { Config } from "@jest/types";

export default {
  testPathIgnorePatterns: [`dist`],
  preset: `ts-jest`
} as Config.InitialOptions;
