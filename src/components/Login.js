import { useEffect, useState } from "react";
import { SERVER } from "../utils/constants";
import { Phone, MessageCircle } from "lucide-react";
import axios from "axios";
import {
  addloginCredentials,
  removeloginCredentials,
} from "../store/slices/loginCredentialsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeservicingVehicles } from "../store/slices/servicingVehiclesSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("9886122415");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const validateMobile = (value) => /^[6-9]\d{9}$/.test(value);
  useEffect(() => {
    dispatch(removeloginCredentials());
    dispatch(removeservicingVehicles());
  }, []);
  const handleGetOtp = async () => {
    /*if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
    } else {
      setError("");
      setOtpSent(true);
      console.log("OTP sent to", mobile);
    }*/
    //navigate temporarily to dashboard once logged in with hardcoded logic
    //call api to validate mobile number
    //if good, then save to store
    //navigate to dashbaord
    try {
      setError("");
      const result = await axios.post(
        SERVER + "/twogms/login/" + mobile,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(addloginCredentials(result?.data?.data));
      console.log(result?.data?.data);
      navigate("/");
    } catch (err) {
      if (401 === err.statusCode) {
        setError("Invalid mobile number/mobile number not registered!");
      } else {
        setError(err.message);
      }
    }
  };

  const handleLogin = () => {
    if (otp.length === 6) {
      console.log("Logging in with OTP:", otp);
      // API call to verify OTP
    } else {
      setError("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed px-4"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/08/63/30/05/360_F_863300589_NojEYK8ktAoHEbIQEpTv8VUFAlMR49xx.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-gradient-to-b from-yellow-50 to-yellow-100 backdrop-blur-md rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Welcome to TWOGMS
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Manage your garage services easily with TWOGMS – a smart way to track
          and handle your customers.
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Mobile Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Get OTP Button */}
          <button
            onClick={handleGetOtp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Get OTP
          </button>

          {/* OTP Input + Login */}
          {otpSent && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={otp.length !== 6}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  otp.length === 6
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Login
              </button>
            </div>
          )}

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-700">
          <p>
            For using the service, contact us at{" "}
            <span className="font-medium">98********</span>
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <a
              href="tel:+919812345678"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Phone size={18} /> Call
            </a>
            <a
              href="https://wa.me/919812345678"
              className="flex items-center gap-2 text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
