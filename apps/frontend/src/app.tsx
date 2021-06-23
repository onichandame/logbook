import { FC } from "react";
import { Helmet } from "react-helmet";

import { Layout, Provider } from "./components";
import logo from "./logo.svg";

export const App: FC = () => {
  return (
    <Provider>
      <Helmet>
        <title>logbook</title>
        <link rel="icon" href={logo} sizes="any" type="image/svg+xml" />
      </Helmet>
      <Layout></Layout>
    </Provider>
  );
};
