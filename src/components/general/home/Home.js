import { useNavigate } from "react-router";
import getgaragepoints from "../../../utils/getGaragePoints";
import getCustomerPoints from "../../../utils/getCustomerPoints";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300 h-full">
      {/**twogms description */}
      <div className="text-gray-800">
        <p className="text-3xl font-bold text-center p-5">
          🏠 Welcome to TWOGMS – Your Digital Garage Partner
        </p>
        <p className="text-xl font-semibold text-center p-3">
          🛵 Simplifying Two-Wheeler Garage Operations Online
        </p>
        <p className="p-3 text-justify">
          TWOGMS (Two Wheeler Online Garage Management System) is a smart,
          all-in-one platform designed for garage owners and customers to
          streamline service bookings, manage vehicle maintenance, and track
          operations – all from one powerful dashboard.
        </p>
      </div>
      {/**twogms description */}
      {/**what you benefits */}
      <div className="md:flex justify-between items-start">
        {/**garage */}
        <div className=" relative border border-gray-400 rounded shadow-2xl m-2 w-full h-full md:h-80 items-end text-sm">
          <div className="flex justify-between items-center border-b border-slate-500">
            <p className="text-lg font-bold p-5">
              What Garage owners benefits?
            </p>
            <button
              className="p-2 px-4 border border-slate-400 rounded-full mx-3 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold hover:bg-gradient-to-t cursor-pointer"
              onClick={() => {
                navigate("twogms/garagelogin");
              }}
            >
              Login/Register
            </button>
          </div>
          <div className="md:flex justify-between items-center">
            <img
              className="block md:hidden w-32 mx-auto rounded-full"
              src={require("../../../images/garage.webp")}
            ></img>
            <ul className="m-2">
              {getgaragepoints().map((x, index) => (
                <li key={index} className="p-2">
                  {x}
                </li>
              ))}
            </ul>
            <img
              className="hidden md:block w-32 mx-auto rounded-full"
              src={require("../../../images/garage.webp")}
            ></img>
          </div>
        </div>
        {/**garage */}
        {/**cust*/}
        <div className=" relative border border-gray-400 rounded shadow-2xl m-2 w-full h-full md:h-80 items-end text-sm">
          <div className="flex justify-between items-center border-b border-slate-500">
            <p className="text-lg font-bold p-5">
              What Two-wheeler owners benefits?
            </p>
            <button className="p-2 px-4 border border-slate-400 rounded-full mx-3 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold hover:bg-gradient-to-t cursor-pointer">
              Login/Register
            </button>
          </div>
          <div className="md:flex justify-between items-center">
            <img
              className="block md:hidden w-32 mx-auto rounded-full"
              src={require("../../../images/customer.png")}
            ></img>
            <ul className="m-2">
              {getCustomerPoints().map((x, index) => (
                <li key={index} className="p-2">
                  {x}
                </li>
              ))}
            </ul>
            <img
              className="hidden md:block w-32 mx-auto rounded-full"
              src={require("../../../images/customer.png")}
            ></img>
          </div>
        </div>
        {/**cust*/}
      </div>
      {/**what you benefits */}
    </div>
  );
};

export default Home;
