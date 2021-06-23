import { IconButton, Avatar } from "@material-ui/core";
import { FC, useContext } from "react";
import { UserContext } from "@libs/context";

import { DropdownAnchor, DropdownId } from "./context";

export const Icon: FC = () => {
  const [, setDropdownAnchor] = useContext(DropdownAnchor);
  const dropdownId = useContext(DropdownId);
  const [user] = useContext(UserContext);

  return (
    <IconButton
      aria-controls={dropdownId}
      aria-haspopup="true"
      onClick={e => setDropdownAnchor(e.currentTarget)}
    >
      <Avatar src={user?.avatar} />
    </IconButton>
  );
};
