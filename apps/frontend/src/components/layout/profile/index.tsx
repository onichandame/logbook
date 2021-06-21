import { FC, useState } from "react";

import { DropdownAnchor, DropdownId } from "./context";
import { Icon } from "./icon";
import { Dropdown } from "./dropdown";

export const Profile: FC = () => {
  const dropdownAnchor = useState<null | HTMLElement>(null);

  return (
    <DropdownAnchor.Provider value={dropdownAnchor}>
      <DropdownId.Provider
        value={`profile_dropdown_${Math.random().toString(36).substr(4, 5)}`}
      >
        <Icon />
        <Dropdown />
      </DropdownId.Provider>
    </DropdownAnchor.Provider>
  );
};
