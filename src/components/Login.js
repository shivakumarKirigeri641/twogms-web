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
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="bg-slate-400">
      <p>test</p>
    </div>
  );
};

export default Login;
