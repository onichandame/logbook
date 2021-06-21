import React, { ComponentProps } from "react";
import { Story, Meta } from "@storybook/react";

import { Login } from "./login";

export default { component: Login, title: `Components/Login` } as Meta;

const Template: Story<ComponentProps<typeof Login>> = () => (
  <Login open={true} onClose={() => {}} />
);

export const Form = Template.bind({});
