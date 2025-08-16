import React from "react";
import { useRouteError } from "react-router";

const Error = () => {
  const errdata = useRouteError();
  return (
    <div>
      <p>{errdata.message}</p>
    </div>
  );
};

export default Error;
