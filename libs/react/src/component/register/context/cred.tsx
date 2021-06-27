import { createStateContext } from "@libs/context";

const CredContext = createStateContext<{ pass: string } | null>(null);
export { CredContext };
