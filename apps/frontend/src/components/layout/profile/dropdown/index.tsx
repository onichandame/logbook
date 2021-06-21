import { FC, useContext } from "react";
import { AuthContext } from "@libs/react";
import { Menu } from "@material-ui/core";

import { DropdownAnchor, DropdownId } from "../context";
import { CloseDropdown } from "./context";
import { NotLoggedIn } from "./notLoggedIn";
import { LoggedIn } from "./loggedIn";

export const Dropdown: FC = () => {
  const [dropdownAnchor, setDropdownAnchor] = useContext(DropdownAnchor);
  const dropdownId = useContext(DropdownId);
  const [auth] = useContext(AuthContext);

  const isLoggedIn = !!auth.user;

  const closeDropdown = () => setDropdownAnchor(null);
  return (
    <CloseDropdown.Provider value={closeDropdown}>
      <Menu
        getContentAnchorEl={null}
        id={dropdownId}
        anchorEl={dropdownAnchor}
        keepMounted
        anchorOrigin={{ vertical: `top`, horizontal: `right` }}
        transformOrigin={{ vertical: `top`, horizontal: `right` }}
        open={!!dropdownAnchor}
        onClose={closeDropdown}
      >
        {isLoggedIn ? <LoggedIn /> : <NotLoggedIn />}
      </Menu>
    </CloseDropdown.Provider>
  );
};
