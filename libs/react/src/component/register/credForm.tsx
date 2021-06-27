import React, { FC, useContext } from "react";
import {
  CreateLocalCredInput,
  CreateLocalCredOutput,
  CREATE_LOCAL_CRED
} from "@libs/gql";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";

import { CredContext, UserContext } from "./context";

export const CredForm: FC<{ onSubmit: () => void; onClose: () => void }> = ({
  onSubmit,
  onClose
}) => {
  const [, setPass] = useContext(CredContext);
  const [user] = useContext(UserContext);
  const [register, { error }] = useMutation<
    CreateLocalCredOutput,
    CreateLocalCredInput
  >(CREATE_LOCAL_CRED);
  const schema = yup
    .object()
    .required()
    .shape({
      pass: yup.string().min(6).max(20).required().default(``),
      confirmPass: yup
        .string()
        .oneOf([yup.ref(`password`), null], `password must match`)
    });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: schema.getDefault(),
    onSubmit: async (vals, helpers) => {
      if (!user) throw new Error(`user not created!`);
      helpers.setSubmitting(true);
      await register({ variables: { user: user.id, pass: vals.pass } });
      helpers.setSubmitting(false);
      setPass(vals);
    }
  });
  return (
    <form>
      <TextField
        name="pass"
        fullWidth
        placeholder="new password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="confirmPass"
        fullWidth
        placeholder="confirm password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {error && (
        <FormControl error>
          <FormHelperText error>{error?.message}</FormHelperText>
        </FormControl>
      )}
      <FormControl>
        <Button variant="contained" onClick={onClose}>
          cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            formik.submitForm;
            onSubmit();
          }}
        >
          finish
        </Button>
      </FormControl>
    </form>
  );
};
