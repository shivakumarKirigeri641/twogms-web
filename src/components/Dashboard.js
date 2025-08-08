import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const garageLoginCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  useEffect(() => {
    if (!garageLoginCredentials) {
      navigate("/twogms/login");
    }
  }, []);
  return (
    <div className="relative h-screen lg:w-[40%] lg:mx-auto bg-gradient-to-b from-[#7d8d96] to-[#1a2220]">
      <p>test</p>
    </div>
  );
};

export default Dashboard;
