import { gql } from "@apollo/client";
import { Models } from "@libs/model";

export const LOGIN_LOCAL = gql`
  mutation ($name: String!, $pass: String!) {
    loginLocal(input: { nameOrEmail: $name, password: $pass }) {
      session
    }
  }
`;
export type LoginLocalOutput = { session: string };
export type LoginLocalInput = { name: string; pass: string };

export const USER_CORE = gql`
  fragment UserCore on User {
    id
    uuid
    name
    email
    avatar
    createdAt
    updatedAt
  }
`;
export type UserCore = Models.User;

export const VERIFY_SESSION = gql`
  ${USER_CORE}
  query verifySession($sess: String!) {
    verifySession(session: $sess) {
      ...UserCore
    }
  }
`;
export type VerifySessionOutput = { verifySession: UserCore };
export type VerifySessionInput = { sess: string };

export const CREATE_USER = gql`
  ${USER_CORE}
  mutation ($input: CreateOneUserInput) {
    createOneUser(input: $input) {
      ...UserCore
    }
  }
`;
export type CreateUserInput = {
  input: Pick<Models.User, "name" | "email" | "avatar">;
};
export type CreateUserOutput = { createOneUser: UserCore };

export const LOCAL_CREDENTIAL = gql`
  fragment LocalCredential on LocalCredential {
    id
    updatedAt
    createdAt
    deletedAt
    user {
      ...UserCore
    }
    password
  }
`;
export type LocalCredential = Models.LocalCredential;

export const CREATE_LOCAL_CRED = gql`
${LOCAL_CREDENTIAL}
mutation($user:Int!,$pass:String!){
  createOneLocalCredential({input:{user:$user,pass:$pass}}){
    ...LocalCredential
  }

  }
`;
export type CreateLocalCredInput = { user: number; pass: string };
export type CreateLocalCredOutput = {
  createOneLocalCredential: LocalCredential;
};
