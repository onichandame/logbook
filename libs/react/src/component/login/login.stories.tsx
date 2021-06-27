import React, { useState, ContextType, ComponentProps } from "react";
import { Button } from "@material-ui/core";
import { Story, Meta } from "@storybook/react";
import { SessionContext } from "@libs/context";

import { Login } from "./login";

export default { component: Login, title: `Components/Login` } as Meta;

const Template: Story<ComponentProps<typeof Login>> = () => {
  const openState = useState(false);
  const state = useState<ContextType<typeof SessionContext>[0]>(``);

  return (
    <SessionContext.Provider value={state}>
      <Button
        onClick={() => openState[1](true)}
        variant="contained"
        color="primary"
      >
        login
      </Button>
      <div>session: {state[0]}</div>
      <Login open={openState} />
    </SessionContext.Provider>
  );
};

export const Form = Template.bind({});
