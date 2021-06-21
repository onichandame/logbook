import { FC, useContext } from "react";
import { MenuItem } from "@material-ui/core";

import { CloseDropdown } from "./context";

export const NotLoggedIn: FC = () => {
  const closeDropdown = useContext(CloseDropdown);
  return (
    <>
      <MenuItem button onClick={closeDropdown}>
        Log In
      </MenuItem>
    </>
  );
};
