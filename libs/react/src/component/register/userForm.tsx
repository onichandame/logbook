import React, { useEffect, FC, useContext } from "react";
import clamp from "lodash.clamp";
import { CREATE_USER, CreateUserInput, CreateUserOutput } from "@libs/gql";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";

import { StepRangeContext, UserContext, StepContext } from "./context";

export const UserForm: FC<{ onSubmit: () => void; onClose: () => void }> = ({
  onSubmit,
  onClose
}) => {
  const [, setUser] = useContext(UserContext);
  const stepRange = useContext(StepRangeContext);
  const [step, setStep] = useContext(StepContext);
  const [register, { data, error }] = useMutation<
    CreateUserOutput,
    CreateUserInput
  >(CREATE_USER);
  const schema = yup
    .object()
    .required()
    .shape({
      name: yup.string().required().label(`username`).default(``),
      email: yup.string().email().notRequired().default(``),
      avatar: yup.string().email().notRequired().default(``)
    });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: schema.getDefault(),
    onSubmit: async (vals, helpers) => {
      helpers.setSubmitting(true);
      await register({ variables: { input: vals } });
      helpers.setSubmitting(false);
    }
  });

  useEffect(() => {
    setUser(data ? data.createOneUser : null);
  }, [data]);
  return (
    <form>
      <TextField
        name="name"
        fullWidth
        placeholder="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="email"
        fullWidth
        placeholder="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="avatar"
        fullWidth
        placeholder="avatar"
        type="url"
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
        {step > stepRange.last && (
          <Button
            variant="contained"
            onClick={() =>
              setStep(clamp(step - 1, stepRange.first, stepRange.last))
            }
          >
            back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={async () => {
            formik.submitForm();
          }}
        >
          register
        </Button>
      </FormControl>
    </form>
  );
};
