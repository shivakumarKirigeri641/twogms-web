import ReactDOM from "react-dom/client";
import Dashboard from "./components/Dashboard";
import ServicedVehicles from "./components/ServicedVehicles";
import Error from "./components/Error";
import appStore from "./store/appStore";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Logout from "./components/Logout";
import EditService from "./components/EditService";
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div>
        <Navbar />
        <Outlet />
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
        element: <Dashboard />,
      },
      {
        path: "/twogms/login",
        element: <Login />,
      },
      {
        path: "/twogms/logout",
        element: <Logout />,
      },
      {
        path: "/twogms/edit-service",
        element: <EditService />,
      },
      {
        path: "/twogms/serviced-vehicles",
        element: <ServicedVehicles />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
