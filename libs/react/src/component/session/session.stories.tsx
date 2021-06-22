import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Story, Meta } from "@storybook/react";
import { SessionContext, UserContext, StateContextType } from "@libs/context";

import { Session } from "./session";

export default { component: Session, title: `Components/Session` } as Meta;

const Template: Story = () => {
  const sessState = useState<StateContextType<typeof SessionContext>>(``);
  const userState = useState<StateContextType<typeof UserContext>>(null);
  const trigger = () => sessState[1](`test`);
  const reset = () => sessState[1](``);
  useEffect(() => {
    console.log(userState[0]);
  }, [userState[0]]);
  return (
    <SessionContext.Provider value={sessState}>
      <UserContext.Provider value={userState}>
        <Session />
        <Button onClick={trigger}>login</Button>
        <Button onClick={reset}>logout</Button>
        {userState[0] &&
          Object.keys(userState[0]).map(k => (
            <div>{`${k}: ${(userState[0] as any)[k]}`}</div>
          ))}
      </UserContext.Provider>
    </SessionContext.Provider>
  );
};

export const Trigger = Template.bind({});
