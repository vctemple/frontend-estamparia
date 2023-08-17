import React from "react";
import Layout from "../components/layout/layout.js";
import { UseAuth } from "../context/auth.js";

const home = () => {
  const [auth, setAuth] = UseAuth();
  return (
    <Layout>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default home