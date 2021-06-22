import React, { FC, useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { VERIFY_SESSION_SCHEMA } from "@libs/gql";
import { UserContext, SessionContext } from "@libs/context";

export const Session: FC = () => {
  const [sess] = useContext(SessionContext);
  const [, setUser] = useContext(UserContext);
  const [query, { loading, data, error }] = useLazyQuery(VERIFY_SESSION_SCHEMA);
  useEffect(() => {
    if (sess) {
      query({ variables: { session: sess } });
    } else {
      setUser(null);
    }
  }, [sess]);
  useEffect(() => {
    if (data) setUser(data.verifySession);
    if (error) console.log(error);
  }, [data, error]);
  return <div>{loading && `loading`}</div>;
};
