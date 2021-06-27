import "@storybook/addon-console";
import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";

import { VERIFY_SESSION, LOGIN_LOCAL } from "../src";

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
            query: LOGIN_LOCAL,
            variables: { name: `test`, pass: `test` }
          },
          result: { data: { session: `test` } }
        },
        {
          request: {
            query: VERIFY_SESSION,
            variables: { sess: `test` }
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
