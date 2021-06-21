import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

export const Login: FC<{ open: boolean; onClose: () => void }> = args => {
  return (
    <Dialog open={args.open} onClose={args.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button>cancel</Button>
        <Button>login</Button>
      </DialogActions>
    </Dialog>
  );
};
