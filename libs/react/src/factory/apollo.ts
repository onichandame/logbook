import {
  ApolloLink,
  split,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

export const createApolloClient = (args: {
  httpUri: string;
  wsUri?: string;
}) => {
  let link: ApolloLink;
  const httpLink = new HttpLink({ uri: args.httpUri });
  if (args.wsUri) {
    const wsLink = new WebSocketLink({
      uri: args.wsUri,
      options: { reconnect: true }
    });
    link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === `OperationDefinition` && def.operation === `subscription`
        );
      },
      wsLink,
      httpLink
    );
  } else {
    link = httpLink;
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
  return client;
};
