import React, { useState, ContextType, ComponentProps } from "react";
import { Button } from "@material-ui/core";
import { Story, Meta } from "@storybook/react";
import { SessionContext } from "@libs/context";

import { Register } from "./register";

export default { component: Register, title: `Components/Register` } as Meta;

const Template: Story<ComponentProps<typeof Register>> = () => {
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
      <Register open={openState} />
    </SessionContext.Provider>
  );
};

export const Dialog = Template.bind({});
