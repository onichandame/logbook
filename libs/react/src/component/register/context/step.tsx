import { createStateContext } from "@libs/context";
import { createContext } from "react";

const StepContext = createStateContext(0);
export { StepContext };

const StepRangeContext = createContext({ first: 0, last: 0 });
export { StepRangeContext };
