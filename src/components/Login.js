import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [showOtp, setshowOtp] = useState(false);
  const [showInvalidOtpError, setshowInvalidOtpError] = useState(false);
  const [showNotRegisteredError, setshowNotRegisteredError] = useState(false);
  const handleLogin = async () => {
    try {
    } catch (err) {
      setshowInvalidOtpError(err.message);
    }
  };
  return (
    <div className="relative h-screen lg:w-[40%] lg:mx-auto bg-gradient-to-b from-[#245F7F] to-[#78CEB4]">
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
          <div class="input-floating w-full px-2 mt-5">
            <input
              type="text"
              placeholder="Enter 10-digit mobile number"
              required
              class="input"
              id="floatingInput"
            />
            <label class="input-floating-label" for="floatingInput">
              Mobile number
            </label>
          </div>
          {/**sign in field */}
          {/**get otp */}
          <div className="px-2">
            <button class="btn btn-accent w-full my-2">Get OTP</button>
          </div>
          {/**get otp */}
          <div>
            {/**enter otp */}
            <div class="input-floating w-full px-2 mt-5">
              <input
                type="text"
                placeholder="Enter 6-digit otp recieved"
                required
                class="input"
                id="floatingInput"
              />
              <label class="input-floating-label" for="floatingInput">
                OTP
              </label>
            </div>
            {/**enter otp */}
            {/**login */}
            <div className="px-2">
              <button class="btn btn-accent w-full my-2">Sign In</button>
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
