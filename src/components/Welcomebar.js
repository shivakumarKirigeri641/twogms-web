import React from "react";
import { useSelector } from "react-redux";

const Welcomebar = () => {
  const garageCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  return garageCredentials ? (
    <div>
      <div className="flex items-center">
        <p className="text-2xl lg:text-4xl font-normal p-5">
          Welcome, {garageCredentials?.staffName}{" "}
        </p>
        {true === garageCredentials?.isGarageOwner ? (
          <p>(Owner)</p>
        ) : (
          <p>(Staff)</p>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Welcomebar;
