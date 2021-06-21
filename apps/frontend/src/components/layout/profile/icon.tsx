import { IconButton, Avatar } from "@material-ui/core";
import { FC, useContext } from "react";
import { AuthContext } from "@libs/react";

import { DropdownAnchor, DropdownId } from "./context";

export const Icon: FC = () => {
  const [, setDropdownAnchor] = useContext(DropdownAnchor);
  const dropdownId = useContext(DropdownId);
  const [auth] = useContext(AuthContext);

  return (
    <IconButton
      aria-controls={dropdownId}
      aria-haspopup="true"
      onClick={e => setDropdownAnchor(e.currentTarget)}
    >
      <Avatar src={auth.user?.avatar} />
    </IconButton>
  );
};
