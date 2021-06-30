import { createStateContext } from "./createStateContext";
import { UserCore } from "@libs/gql";

const SessionContext = createStateContext(``);
export { SessionContext };

const UserContext = createStateContext<UserCore | null>(null);
export { UserContext };
