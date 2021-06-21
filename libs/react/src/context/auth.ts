import { createStateContext } from "./createStateContext";
import { Models } from "@libs/model";

type Auth = { user?: Models.User };

const AuthContext = createStateContext<Auth>({});

export { AuthContext };
