import { useState, FC, useContext } from "react";
import { Login } from "@libs/react";
import { MenuItem } from "@material-ui/core";

import { CloseDropdown } from "./context";

export const NotLoggedIn: FC = () => {
  const [open, setOpen] = useState(false);
  const closeDropdown = useContext(CloseDropdown);
  return (
    <>
      <MenuItem
        button
        onClick={() => {
          setOpen(true);
          closeDropdown();
        }}
      >
        Log In
      </MenuItem>
      <Login open={open} onClose={() => setOpen(false)} />
    </>
  );
};
