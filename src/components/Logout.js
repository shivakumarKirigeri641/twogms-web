import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  addloginCredentials,
  removeloginCredentials,
} from "../store/slices/loginCredentialsSlice";
import { useDispatch } from "react-redux";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(removeloginCredentials());
    navigate("/");
  });
  return <div></div>;
};

export default Logout;
