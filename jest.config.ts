import { Config } from "@jest/types";

export default {
  preset: `ts-jest`,
  testEnvironment: `node`,
  verbose: true,
  testTimeout: 1000 * 60,
  rootDir: ".",
  projects: [`<rootDir>/apps/*`, `<rootDir>/libs/*`]
} as Config.InitialOptions;
