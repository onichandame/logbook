import { createStateContext } from "@libs/context";
import { Models } from "@libs/model";

const UserContext = createStateContext<Models.User | null>(null);
export { UserContext };
