import { useRouteError } from "react-router";

const Error = () => {
  const errordetails = useRouteError();
  console.error(errordetails?.message);
  return (
    <div>
      <p>{errordetails?.message}</p>
    </div>
  );
};

export default Error;
