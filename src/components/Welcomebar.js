import React from "react";
import { useSelector } from "react-redux";

const Welcomebar = () => {
  const garageCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  return garageCredentials ? (
    <div className="bg-gradient-to-b from-lime-50 to-lime-300 text-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-xl lg:text-2xl font-normal p-2">
            Welcome, {garageCredentials?.staffName}{" "}
          </p>
        </div>
        {garageCredentials?.isGarageOwner && (
          <div className="px-3">
            <p>Wallet balance:</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Welcomebar;
