import { Universal, Base } from "./base";

export type ExcludeGenerated<T extends Base> = Omit<T, keyof Universal>;
