import React, { useState, ContextType, ComponentProps } from "react";
import { Button } from "@material-ui/core";
import { Story, Meta } from "@storybook/react";
import { SessionContext } from "@libs/context";

import { Login } from "./login";

export default { component: Login, title: `Components/Login` } as Meta;

const Template: Story<ComponentProps<typeof Login>> = () => {
  const [open, setOpen] = useState(false);
  const state = useState<ContextType<typeof SessionContext>[0]>(``);

  return (
    <SessionContext.Provider value={state}>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        login
      </Button>
      <div>session: {state[0]}</div>
      <Login
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </SessionContext.Provider>
  );
};

export const Form = Template.bind({});
