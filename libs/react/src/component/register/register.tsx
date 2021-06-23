import React, { FC } from "react";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { useFormik } from "formik";
import { State } from "@libs/context";
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

export const Register: FC<{ open: State<boolean> }> = ({
  open: [open, setOpen]
}) => {
  const schema = yup
    .object()
    .required()
    .shape({
      name: yup.string().required().label(`username`).default(``),
      email: yup.string().email().notRequired().default(``)
    });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: schema.getDefault(),
    onSubmit: (vals, helpers) => {
      helpers.setSubmitting(true);
      helpers.setSubmitting(false);
    }
  });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Register Yourself</DialogTitle>
      <form>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
          >
            cancel
          </Button>
          <Button
            onClick={async () => {
              await formik.submitForm();
              setOpen(false);
            }}
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
          >
            register
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
