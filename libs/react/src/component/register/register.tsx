import React, { useState, FC, useContext } from "react";
import clamp from "lodash.clamp";
import { Models } from "@libs/model";
import {
  LoginLocalInput,
  LoginLocalOutput,
  LOGIN_LOCAL,
  CreateLocalCredOutput,
  CreateLocalCredInput,
  CREATE_LOCAL_CRED,
  CREATE_USER,
  CreateUserInput,
  CreateUserOutput
} from "@libs/gql";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";
import { SessionContext, State } from "@libs/context";
import {
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  Button,
  FormHelperText,
  TextField,
  Stepper,
  Step,
  Dialog
} from "@material-ui/core";

export const Register: FC<{ open: State<boolean> }> = ({
  open: [open, setOpen]
}) => {
  const [, setSess] = useContext(SessionContext);
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState<Models.User | undefined>(undefined);
  const [createUser, createUserRes] = useMutation<
    CreateUserOutput,
    CreateUserInput
  >(CREATE_USER);
  const [createCred, createCredRes] = useMutation<
    CreateLocalCredOutput,
    CreateLocalCredInput
  >(CREATE_LOCAL_CRED);
  const [login] = useMutation<LoginLocalOutput, LoginLocalInput>(LOGIN_LOCAL);
  const UserSchema = yup
    .object()
    .required()
    .shape({
      name: yup.string().required().label(`username`).default(``),
      email: yup.string().email().notRequired().default(``),
      avatar: yup.string().email().notRequired().default(``)
    });
  const UserFormik = useFormik({
    validationSchema: UserSchema,
    initialValues: UserSchema.getDefault(),
    onSubmit: async (vals, helpers) => {
      helpers.setSubmitting(true);
      const { data } = await createUser({ variables: { input: vals } });
      setUser(data?.createOneUser);
      helpers.setSubmitting(false);
    }
  });
  const CredSchema = yup
    .object()
    .required()
    .shape({
      pass: yup.string().min(6).max(20).required().default(``),
      confirmPass: yup
        .string()
        .oneOf([yup.ref(`password`), null], `password must match`)
    });
  const CredFormik = useFormik({
    validationSchema: CredSchema,
    initialValues: CredSchema.getDefault(),
    onSubmit: async (vals, helpers) => {
      if (!user) throw new Error(`user not created!`);
      helpers.setSubmitting(true);
      await createCred({ variables: { user: user.id, pass: vals.pass } });
      helpers.setSubmitting(false);
      const { data } = await login({
        variables: { pass: vals.pass, name: user.name }
      });
      if (data) setSess(data.session);
    }
  });
  const steps = [
    {
      operation: createUser,
      component: (
        <>
          <TextField
            name="name"
            fullWidth
            placeholder="username"
            type="text"
            onChange={UserFormik.handleChange}
            onBlur={UserFormik.handleBlur}
          />
          <TextField
            name="email"
            fullWidth
            placeholder="email"
            type="email"
            onChange={UserFormik.handleChange}
            onBlur={UserFormik.handleBlur}
          />
          <TextField
            name="avatar"
            fullWidth
            placeholder="avatar"
            type="url"
            onChange={UserFormik.handleChange}
            onBlur={UserFormik.handleBlur}
          />
          {createUserRes.error && (
            <FormControl error>
              <FormHelperText error>
                {createUserRes.error?.message}
              </FormHelperText>
            </FormControl>
          )}
        </>
      ),
      label: `create user`
    },
    {
      component: (
        <>
          <TextField
            name="pass"
            fullWidth
            placeholder="new password"
            type="password"
            onChange={CredFormik.handleChange}
            onBlur={CredFormik.handleBlur}
          />
          <TextField
            name="confirmPass"
            fullWidth
            placeholder="confirm password"
            type="password"
            onChange={CredFormik.handleChange}
            onBlur={CredFormik.handleBlur}
          />
          {createCredRes.error && (
            <FormControl error>
              <FormHelperText error>
                {createCredRes.error?.message}
              </FormHelperText>
            </FormControl>
          )}
        </>
      ),
      operation: createCred,
      label: `create password`
    }
  ];

  const proceed = () =>
    setActiveStep(clamp(activeStep + 1, 0, steps.length - 1));
  const cancel = () => {};
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Stepper activeStep={activeStep}>
          {steps.map(step => (
            <Step key={step.label}>{step.label}</Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        {steps.map(step => {
          return step.component;
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={cancel}>
          cancel
        </Button>
        <Button variant="contained" color="primary" onClick={proceed}>
          next
        </Button>
      </DialogActions>
    </Dialog>
  );
};
