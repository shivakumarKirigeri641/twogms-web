import { motion } from "framer-motion";
import { SERVER } from "../utils/constants";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { addservicingVehicles } from "../store/slices/servicingVehiclesSlice";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginCredentials = useSelector((store) => store.loginCredentials);
  const servicingVehicles = useSelector((store) => store.servicingVehicles);
  useEffect(() => {
    if (!loginCredentials) {
      navigate("/twogms/login");
    }
    const fetchServicingVehicles = async () => {
      const result = await axios.get(SERVER + "/twogms/servicing-vehicles", {
        withCredentials: true,
      });
      dispatch(addservicingVehicles(result?.data?.data));
    };
    fetchServicingVehicles();
  }, []);
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/08/63/30/05/360_F_863300589_NojEYK8ktAoHEbIQEpTv8VUFAlMR49xx.jpg')",
      }}
    >
      <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 p-2 rounded-2xl min-h-screen my-5">
        <div className="text-left space-y-2">
          <motion.h2 className="text-2xl font-bold text-gray-800">
            Ongoing Servicing – Two Wheelers
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm mx-auto text-left py-2"
            transition={{ delay: 0.2 }}
          >
            Below is the list of vehicles currently under service along with
            customer details, contact information, and service status. Use the
            search bar to quickly find a vehicle or customer, and manage
            services with the provided actions.
          </motion.p>
        </div>
        <DataTable data={servicingVehicles} />
      </div>
    </div>
  );
};

export default Dashboard;
