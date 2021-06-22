import { ContextType, createContext, Context } from "react";

type State<T> = [T, (_: T) => void];

export const createStateContext = <T>(defaultVal: T) => {
  const context = createContext<State<T>>([defaultVal, () => {}]);
  return context;
};

export type StateType<S extends State<any>> = S extends State<infer T>
  ? T
  : never;

export type StateContextType<T extends Context<State<any>>> = StateType<
  ContextType<T>
>;
