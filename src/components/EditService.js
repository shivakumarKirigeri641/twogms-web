import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginCredentials = useSelector((store) => store.loginCredentials);
  useEffect(() => {
    if (!loginCredentials) {
      navigate("/twogms/login");
    }
  }, []);
  return (
    <div>
      <p>edit service</p>
    </div>
  );
};

export default EditService;
