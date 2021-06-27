import React, { useState, FC } from "react";
import clamp from "lodash.clamp";
import { State } from "@libs/context";
import { Stepper, Step, StepLabel, Dialog } from "@material-ui/core";

import { UserForm } from "./userForm";
import { CredForm } from "./credForm";
import { StepRangeContext } from "./context";

export const Register: FC<{ open: State<boolean> }> = ({
  open: [open, setOpen]
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      component: <UserForm onSubmit={proceed} onClose={() => setOpen(false)} />,
      label: `create user`
    }
  ];
  const [stepRange] = useState({ first: 0, last: steps.length - 1 });
  return (
    <StepRangeContext.Provider value={stepRange}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Stepper activeStep={activeStep}>
          {steps.map(step => (
            <Step key={step.label}>{step.label}</Step>
          ))}
        </Stepper>
        {steps.map(step => {
          return step.component;
        })}
      </Dialog>
    </StepRangeContext.Provider>
  );
};
