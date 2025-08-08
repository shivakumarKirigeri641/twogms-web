import axios from "axios";
import { SERVER } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addgarageLoginCredentials } from "../store/slices/garageLoginCredentialsSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [showOtp, setshowOtp] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("9886122415");
  const [password, setpassword] = useState("Shiva@123");
  const [showInvalidOtpError, setshowInvalidOtpError] = useState(false);
  const [showNotRegisteredError, setshowNotRegisteredError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await axios.post(SERVER + "/twogms/login", {
        phoneNumber,
        password,
      });
      console.log(result?.data?.data);
      dispatch(addgarageLoginCredentials(result?.data?.data));
      navigate("/");
    } catch (err) {
      setshowInvalidOtpError(err.message);
    }
  };
  return (
    <div className="relative h-screen lg:w-[25%] lg:mx-auto bg-gradient-to-b from-[#7d8d96] to-[#1a2220] rounded-2xl my-5">
      <img
        className="hidden lg:block fixed w-full h-full inset-0 -z-10"
        src={require("../images/login_background.jpg")}
      ></img>
      <div className="pt-10">
        <img
          className="rounded-full w-25 mx-auto"
          src={require("../images/logo.png")}
        ></img>
        <div className="text-white">
          <p className="text-2xl font-bold text-center mt-8">
            Welcome to TWOGMS
          </p>
          <p className="text-center italic"> - You service, we record</p>
        </div>
        {/**login */}
        <div className="text-yellow-100">
          <p className="text-2xl font-bold text-center mt-8">Garage Sign In</p>
        </div>
        <div className="text-yellow-100">
          {/**sign in field */}
          <div className="input-floating w-full px-2 mt-5">
            <input
              type="text"
              placeholder="Enter 10-digit mobile number"
              required
              className="input"
              id="floatingInput"
            />
            <label className="input-floating-label" for="floatingInput">
              Mobile number
            </label>
          </div>
          {/**sign in field */}
          {/**get otp */}
          <div className="px-2">
            <button
              className="btn btn-accent w-full my-2"
              onClick={() => {
                handleLogin();
              }}
            >
              Get OTP
            </button>
          </div>
          {/**get otp */}
          <div>
            {/**enter otp */}
            <div className="input-floating w-full px-2 mt-5">
              <input
                type="text"
                placeholder="Enter 6-digit otp recieved"
                required
                className="input"
                id="floatingInput"
              />
              <label className="input-floating-label" for="floatingInput">
                OTP
              </label>
            </div>
            {/**enter otp */}
            {/**login */}
            <div className="px-2">
              <button className="btn btn-accent w-full my-2">Sign In</button>
            </div>
          </div>
          {/**login */}
        </div>
        {/**login */}
      </div>
      {/**bottom contatct for login */}
      <div className="fixed bottom-0 m-2 text-xs text-center">
        <div className="flex justify-center items-center text-red-600 font-bold">
          <p>Please call or </p>
          <img
            className="w-5 mx-2"
            src={require("../images/icons/whatsapp.png")}
          ></img>
          <p>+919886122415 for Garage Sign In.</p>
        </div>
      </div>
      {/**bottom contatct for login */}
    </div>
  );
};

export default Login;
