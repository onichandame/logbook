import React, { FC, useState, useEffect, useContext } from "react";
import {
  VERIFY_SESSION,
  VerifySessionInput,
  VerifySessionOutput
} from "@libs/gql";
import { useSnackbar, SnackbarKey } from "notistack";
import { useLazyQuery } from "@apollo/client";
import { UserContext, SessionContext } from "@libs/context";

export const Session: FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loadingToast, setLoadingToast] = useState<null | SnackbarKey>(null);
  const [sess, setSess] = useContext(SessionContext);
  const [, setUser] = useContext(UserContext);
  const [query, { loading, data, error }] = useLazyQuery<
    VerifySessionOutput,
    VerifySessionInput
  >(VERIFY_SESSION);
  useEffect(() => {
    if (sess) {
      query({ variables: { sess } });
    } else {
      setUser(null);
    }
  }, [sess]);
  useEffect(() => {
    if (data) {
      enqueueSnackbar(`logged in!`, { variant: `success` });
      setUser(data.verifySession);
    } else if (error) {
      enqueueSnackbar(error.message, { variant: `error` });
      setSess(``);
      setUser(null);
    }
  }, [data, error]);
  useEffect(() => {
    if (loading) setLoadingToast(enqueueSnackbar(`loggin in`));
    else loadingToast && closeSnackbar(loadingToast);
  }, [loading]);
  return <div></div>;
};
