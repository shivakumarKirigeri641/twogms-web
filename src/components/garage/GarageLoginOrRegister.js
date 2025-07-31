import { useState } from "react";

const GarageLoginOrRegister = () => {
  const [error, seterror] = useState("");
  const [isRegistration, setisRegistration] = useState(false);
  const [garageName, setgarageName] = useState("");
  const [ownerName, setownerName] = useState("");
  const [garageAddress, setgarageAddress] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-full lg:w-[50%] mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend text-4xl mx-auto">
          Garage {isRegistration ? <p>Registration</p> : <p>Login</p>}
        </legend>
        {isRegistration && (
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend text-xl mx-auto">
              Garage details
            </legend>
            {/**GARAGE NAME */}
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Garage name"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            <p className="validator-hint">
              Must be 3 to 30 characters, containing only letters, numbers or
              dash
            </p>
            {/**GARAGE NAME */}
            {/**owner NAME */}
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Owner name"
                pattern="[A-Za-z]*"
                minlength="3"
                maxlength="30"
                title="Only letters"
              />
            </label>
            <p className="validator-hint">Must be only characters</p>
            {/**owner NAME */}
            {/**addres */}
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Address"
                minlength="3"
                maxlength="300"
              />
            </label>
            <p className="validator-hint">Must be only characters</p>
            {/**addres */}
          </fieldset>
        )}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          {isRegistration && (
            <legend className="fieldset-legend text-xl mx-auto">
              Login details
            </legend>
          )}
          {/**phnenumber */}
          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Mobile number"
              pattern="[0-9]*"
              minlength="10"
              maxlength="10"
              title="Only numbers"
            />
          </label>
          <p className="validator-hint">Must be only numbers please</p>
          {/**phnenumber */}

          {/**password */}
          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              pattern="[0-9]*"
              minlength="5"
              maxlength="50"
              title="Passwords only"
            />
          </label>
          <p className="validator-hint">
            Must be only numbers, letters, special characters please
          </p>
          {/**rep password */}
          {isRegistration && (
            <div>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Repeat Password"
                  pattern="[0-9]*"
                  minlength="5"
                  maxlength="50"
                  title="Passwords only"
                />
              </label>
              <p className="validator-hint">Passwords not matching!</p>
            </div>
          )}
          {/**rep password */}
          {!isRegistration && (
            <label className="label text-blue-400 font-bold text-sm py-2">
              Don't have garage account?{" "}
              <span
                className="underline underline-offset-2 cursor-pointer"
                onClick={() => {
                  setisRegistration(true);
                }}
              >
                Create here.
              </span>
            </label>
          )}
          {!isRegistration && (
            <label className="label text-purple-300 font-bold text-sm py-2">
              Forgot your password?{" "}
              <span className="underline underline-offset-2 cursor-pointer">
                Help.
              </span>
            </label>
          )}
          {isRegistration && (
            <label className="label text-blue-400 font-bold text-sm py-2">
              Already have login account?{" "}
              <span
                className="underline underline-offset-2 cursor-pointer"
                onClick={() => {
                  setisRegistration(false);
                }}
              >
                Login here.
              </span>
            </label>
          )}
          {isRegistration && (
            <button className="btn btn-primary mt-4">Register</button>
          )}
          {!isRegistration && (
            <button className="btn btn-primary mt-4">Login</button>
          )}
          {"" !== error && (
            <label className="text-red-500 font-bold text-lg">Error</label>
          )}
        </fieldset>
      </fieldset>
    </div>
  );
};

export default GarageLoginOrRegister;
