import { createStateContext } from "@libs/react";

const DropdownAnchor = createStateContext<null | HTMLElement>(null);

export { DropdownAnchor };
