import { createStateContext } from "@libs/context";

const DropdownAnchor = createStateContext<null | HTMLElement>(null);

export { DropdownAnchor };
