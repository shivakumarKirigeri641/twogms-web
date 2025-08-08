import { useState } from "react";

const Login = () => {
  const [showOtp, setshowOtp] = useState(false);
  const [showInvalidOtpError, setshowInvalidOtpError] = useState(false);
  const [showNotRegisteredError, setshowNotRegisteredError] = useState(false);
  return (
    <div className="relative h-screen">
      <img
        className="fixed w-full h-full inset-0 -z-10"
        src={require("../images/login_background.jpg")}
      ></img>
      <div className="w-full lg:w-[30%] flex justify-center items-center  mx-auto">
        <div className="z-10 w-full">
          <div className="flex justify-center items-center my-3">
            <img
              className="object-cover w-35 rounded-full"
              src={require("../images/logo.png")}
            ></img>
          </div>
          <div class="card m-2">
            <div class="card-body text-center">
              <h5 class="card-title mb-2.5 text-center">Welcome to TWOGMS</h5>
              <p>
                All your two-wheeler service needs—managed online, anytime,
                anywhere.
              </p>
              <p className="my-5 text-left underline underline-offset-2 font-bold text-blue-300 cursor-pointer">
                why TWOGMMS?
              </p>
            </div>
          </div>
          <div class="input-floating w-full px-2">
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="input"
              id="floatingInput"
            />
            <label className="input-floating-label  px-3" for="floatingInput">
              Mobile number
            </label>
            <button class="btn btn-accent w-full my-2">Get OTP</button>
            {showNotRegisteredError && (
              <div class="alert alert-error" role="alert">
                Oops! It seems you have entered an invalid mobile number.
              </div>
            )}
          </div>
          {/**confirm otp */}
          {showOtp && (
            <div class="input-floating w-full px-2">
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="input"
                id="floatingInput"
              />
              <label className="input-floating-label px-3" for="floatingInput">
                OTP
              </label>
              <button class="btn btn-accent w-full my-2">Submit</button>
              {showInvalidOtpError && (
                <div class="alert alert-error" role="alert">
                  Invalid OTP provided!
                </div>
              )}
            </div>
          )}
          {/**confirm otp */}
        </div>
      </div>
    </div>
  );
};

export default Login;
