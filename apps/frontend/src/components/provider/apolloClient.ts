import { createApolloClient } from "@libs/react";

export const client = createApolloClient({ httpUri: `/graphql` });
