import { gql } from "@apollo/client";

export const LOGIN_SCHEMA = gql`
  mutation Login($nameOrEmail: String!, $password: String!) {
    loginLocal(input: { nameOrEmail: $nameOrEmail, password: $password }) {
      session
    }
  }
`;

export const USER_QUERY_SCHEMA = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      updatedAt
      createdAt
      uuid
      name
      email
      avatar
    }
  }
`;

export const VERIFY_SESSION_SCHEMA = gql`
  query verifySession($session: String!) {
    verifySession(session: $session) {
      id
      name
      email
      uuid
      avatar
      createdAt
      updatedAt
    }
  }
`;
