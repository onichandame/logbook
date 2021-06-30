import "@storybook/addon-console";
import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";

import {
  VerifySessionOutput,
  VerifySessionInput,
  VERIFY_SESSION,
  LoginLocalInput,
  LoginLocalOutput,
  LOGIN_LOCAL,
  CreateUserInput,
  CreateUserOutput,
  CREATE_USER,
  CreateLocalCredInput,
  CreateLocalCredOutput,
  CREATE_LOCAL_CRED
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
            query: LOGIN_LOCAL,
            variables: { name: `test`, pass: `test` } as LoginLocalInput
          },
          result: { data: { session: `test` } as LoginLocalOutput }
        },
        {
          request: {
            query: VERIFY_SESSION,
            variables: { sess: `test` } as VerifySessionInput
          },
          result: {
            data: {
              verifySession: {
                id: 0,
                updatedAt: new Date(),
                createdAt: new Date(),
                uuid: `test`,
                name: `test`,
                email: `test`,
                avatar: `test`
              }
            } as VerifySessionOutput
          }
        },
        {
          request: {
            query: CREATE_USER,
            variables: {
              input: { name: `test`, email: `test`, avatar: `test` }
            } as CreateUserInput
          },
          result: {
            data: {
              createOneUser: {
                name: `test`,
                uuid: `test`,
                createdAt: new Date(),
                updatedAt: new Date(),
                id: 0
              }
            } as CreateUserOutput
          }
        },
        {
          request: {
            query: CREATE_LOCAL_CRED,
            variables: { user: 0, pass: `test` } as CreateLocalCredInput
          },
          result: {
            data: {
              createOneLocalCredential: {
                user: {
                  id: 0,
                  updatedAt: new Date(),
                  createdAt: new Date(),
                  uuid: `test`,
                  name: `test`
                },
                id: 0,
                updatedAt: new Date(),
                createdAt: new Date(),
                password: `test`
              }
            } as CreateLocalCredOutput
          }
        }
      ]
    } as MockedProviderProps)
  }
};
