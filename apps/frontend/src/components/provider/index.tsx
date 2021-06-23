import { FC, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { SessionContext, UserContext, StateContextType } from "@libs/context";
import { SnackbarProvider } from "notistack";

import { client } from "./apolloClient";

export const Provider: FC = ({ children }) => {
  const userState = useState<StateContextType<typeof UserContext>>(null);
  const sessState = useState<StateContextType<typeof SessionContext>>(``);
  return (
    <ApolloProvider client={client}>
      <SessionContext.Provider value={sessState}>
        <UserContext.Provider value={userState}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </UserContext.Provider>
      </SessionContext.Provider>
    </ApolloProvider>
  );
};
