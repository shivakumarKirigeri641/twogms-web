import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const GarageDashboard = () => {
  const navigate = useNavigate();
  const garagecredentials = useSelector(
    (store) => store.garageCredentialDetails
  );
  useEffect(() => {
    if (!garagecredentials) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <p>dashboard</p>
    </div>
  );
};

export default GarageDashboard;
