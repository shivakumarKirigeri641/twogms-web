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
    <div>
      <p>test</p>
    </div>
  );
};

export default Dashboard;
