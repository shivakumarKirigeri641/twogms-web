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
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      console.log(axios.defaults.baseURL);
      console.log(axios.defaults.withCredentials);
      const result = await axios.post(SERVER + "/twogms/login", {
        phoneNumber,
        password,
      });
      console.log(result?.data?.data);
      dispatch(addgarageLoginCredentials(result?.data?.data));
      navigate("/");
    } catch (err) {
      console.log("error");
      setshowInvalidOtpError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Welcome to TWOGMS
        </h1>

        {/* Tagline */}
        <p className="text-center text-gray-600 mt-1 italic">
          you service, we maintain
        </p>

        {/* Small Description */}
        <p className="text-gray-500 text-sm mt-4 text-center">
          We help garages save paper by keeping all your service activities
          recorded digitally. Get timely alerts and notifications for every
          service, ensuring your records are always up-to-date.
        </p>

        {/* Login Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              pattern="[0-9]{10}"
              maxLength="10"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              handleLogin();
            }}
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
