import { motion } from "framer-motion";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Dashboard = () => {
  const loginCredentials = useSelector((store) => store.loginCredentials);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginCredentials) {
      navigate("/twogms/login");
    }
  }, []);
  const sampleData = [
    {
      id: 1,
      vehicleNumber: "KA01AB1234",
      brandModel: "Honda Activa",
      customerName: "Ramesh",
      customerMobile: "9876543210",
      serviceStatus: "Completed",
    },
    {
      id: 2,
      vehicleNumber: "KA02XY5678",
      brandModel: "Bajaj Pulsar",
      customerName: "Suresh",
      customerMobile: "9123456780",
      serviceStatus: "In Progress",
    },
    {
      id: 3,
      vehicleNumber: "KA03MN4321",
      brandModel: "TVS Jupiter",
      customerName: "Mahesh",
      customerMobile: "9988776655",
      serviceStatus: "Pending",
    },
    {
      id: 4,
      vehicleNumber: "KA04PQ2468",
      brandModel: "Royal Enfield",
      customerName: "Kiran",
      customerMobile: "9000011111",
      serviceStatus: "Completed",
    },
    {
      id: 5,
      vehicleNumber: "KA05LM9876",
      brandModel: "Suzuki Access",
      customerName: "Ravi",
      customerMobile: "9888777666",
      serviceStatus: "Pending",
    },
    {
      id: 6,
      vehicleNumber: "KA06CD5432",
      brandModel: "Hero Splendor",
      customerName: "Anil",
      customerMobile: "9112233445",
      serviceStatus: "In Progress",
    },
  ];
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
        <DataTable data={sampleData} />
      </div>
    </div>
  );
};

export default Dashboard;
