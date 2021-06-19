import { Config } from "@jest/types";

export default {
  preset: `ts-jest`,
  testEnvironment: `node`,
  verbose: true,
  testTimeout: 1000 * 60,
  testPathIgnorePatterns: [`dist/*`],
  rootDir: ".",
  projects: [`<rootDir>/libs/*`]
} as Config.InitialOptions;
