import React, { useEffect, useContext, FC } from "react";
import { LOGIN_SCHEMA } from "@libs/gql";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormHelperText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { SessionContext } from "@libs/context";

export const Login: FC<{ open: boolean; onClose: () => void }> = args => {
  const [, setSess] = useContext(SessionContext);

  const [login, { data, error }] = useMutation(LOGIN_SCHEMA);
  const schema = yup
    .object()
    .required()
    .shape({
      nameOrEmail: yup.string().default(``).required(),
      password: yup.string().default(``).required()
    });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: schema.getDefault(),
    onSubmit: async (vals, helpers) => {
      helpers.setSubmitting(true);
      await login({ variables: vals });
      helpers.setSubmitting(false);
    }
  });
  useEffect(() => {
    if (data) console.log(data);
    if (data) setSess(data.session);
  }, [data]);
  return (
    <Dialog open={args.open} onClose={args.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          name="nameOrEmail"
          fullWidth
          error={!!error}
          placeholder="Username or Email"
          value={formik.values.nameOrEmail}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          name="password"
          fullWidth
          error={!!error}
          placeholder="password"
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!error && (
          <FormControl error>
            <FormHelperText>error: {error?.message}</FormHelperText>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={args.onClose} disabled={formik.isSubmitting}>
          cancel
        </Button>
        <Button
          onClick={async () => {
            await formik.submitForm();
            args.onClose();
          }}
          disabled={formik.isSubmitting}
        >
          login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
