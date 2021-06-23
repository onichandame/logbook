import { FC, useContext } from "react";
import { SessionContext } from "@libs/context";
import { MenuItem } from "@material-ui/core";

import { CloseDropdown } from "./context";

export const LoggedIn: FC = () => {
  const closeDropdown = useContext(CloseDropdown);
  const [, setSess] = useContext(SessionContext);
  return (
    <>
      <MenuItem
        button
        onClick={() => {
          setSess(``);
          closeDropdown();
        }}
      >
        Log out
      </MenuItem>
    </>
  );
};
