import Footer from "./components/general/Footer";
import GarageDashboard from "./components/garage/GarageDashboard";
import Home from "./components/general/home/Home";
import Error from "./components/Error";
import ReactDOM from "react-dom/client";
import GarageLoginOrRegister from "./components/garage/GarageLoginOrRegister";
import Navbar from "./components/general/home/Navbar";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CurrentVehicleInService from "./components/garage/currentvehicle/CurrentVehicleInService";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/twogms/garageloginregister",
        element: <GarageLoginOrRegister />,
      },
      {
        path: "/twogms/garage/garagedashboard",
        element: <GarageDashboard />,
      },
      {
        path: "/twogms/garage/currentvehicleinservice/:vehicleId",
        element: <CurrentVehicleInService />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
