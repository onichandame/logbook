import { FC } from "react";
import { Session } from "@libs/react";

import { Navbar } from "./navbar";

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <Session />
      <Navbar />
      {children}
    </div>
  );
};
