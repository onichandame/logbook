import "@storybook/addon-console";
import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";

import {
  VERIFY_SESSION_SCHEMA,
  LOGIN_SCHEMA,
  USER_QUERY_SCHEMA
} from "@libs/gql";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  apolloClient: {
    MockedProvider,
    ...({
      addTypename: false,
      mocks: [
        {
          request: {
            query: LOGIN_SCHEMA,
            variables: { nameOrEmail: `test`, password: `test` }
          },
          result: { data: { session: `test` } }
        },
        {
          request: { query: USER_QUERY_SCHEMA, variables: { id: `test` } },
          result: {
            data: {
              id: `test`,
              updatedAt: new Date(),
              createdAt: new Date(),
              uuid: `test`,
              name: `test`,
              email: `test`,
              avatar: `test`
            }
          }
        },
        {
          request: {
            query: VERIFY_SESSION_SCHEMA,
            variables: { session: `test` }
          },
          result: {
            data: {
              verifySession: {
                id: `test`,
                updatedAt: new Date(),
                createdAt: new Date(),
                uuid: `test`,
                name: `test`,
                email: `test`,
                avatar: `test`
              }
            }
          }
        }
      ]
    } as MockedProviderProps)
  }
};
