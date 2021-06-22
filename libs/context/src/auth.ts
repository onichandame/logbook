import { createStateContext } from "./createStateContext";
import { Models } from "@libs/model";

const SessionContext = createStateContext(``);
export { SessionContext };

const UserContext = createStateContext<Models.User | null>(null);
export { UserContext };
