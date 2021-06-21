import { createContext } from "react";

export const createStateContext = <T>(defaultVal: T) => {
  const context = createContext<[T, (_: T) => void]>([defaultVal, () => {}]);
  return context;
};
