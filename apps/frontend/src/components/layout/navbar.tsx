import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { FC } from "react";

import { Profile } from "./profile";

export const Navbar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Logbook</Typography>
        <div style={{ flexGrow: 1 }} />
        <Profile />
      </Toolbar>
    </AppBar>
  );
};
