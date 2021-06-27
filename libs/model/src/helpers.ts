import { Universal, Base } from "./base";

type ExcludeMethod<ObjectType> = Pick<
  ObjectType,
  {
    [Property in keyof ObjectType]: ObjectType[Property] extends (
      ...args: any[]
    ) => any
      ? never
      : Property;
  }[keyof ObjectType]
>;

export type ExcludeGenerated<T extends Base> = Omit<
  ExcludeMethod<T>,
  keyof Universal
>;
