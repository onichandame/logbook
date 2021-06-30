import React, { useState, ContextType, ComponentProps } from "react";
import { Button } from "@material-ui/core";
import { Story, Meta } from "@storybook/react";
import { SessionContext, UserContext } from "@libs/context";

import { Register } from "./register";

export default { component: Register, title: `Components/Register` } as Meta;

const Template: Story<ComponentProps<typeof Register>> = () => {
  const openState = useState(false);
  const sessState = useState<ContextType<typeof SessionContext>[0]>(``);
  const userState = useState<ContextType<typeof UserContext>[0]>(null);

  return (
    <UserContext.Provider value={userState}>
      <SessionContext.Provider value={sessState}>
        <Button
          onClick={() => openState[1](true)}
          variant="contained"
          color="primary"
        >
          register
        </Button>
        <div>session: {sessState[0]}</div>
        <div>user: {userState[0]?.name}</div>
        <Register open={openState} />
      </SessionContext.Provider>
    </UserContext.Provider>
  );
};

export const Dialog = Template.bind({});
