import Footer from "./components/general/Footer";
import Home from "./components/general/Home";
import Statistics from "./components/garagespecific/Statistics";
import GarageDashboard from "./components/garagespecific/GarageDashboard";
import Error from "./components/Error";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import CustomerLoginOrRegister from "./components/general/CustomerLoginOrRegister";
import GarageLoginOrRegister from "./components/general/GarageLoginOrRegister";
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div>
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
        path: "/twogms/dashboard",
        element: <GarageDashboard />,
      },
      {
        path: "/twogms/statistics",
        element: <Statistics />,
      },
      {
        path: "/twogms/garage/loginorregister",
        element: <GarageLoginOrRegister />,
      },
      {
        path: "/twogms/customer/loginorregister",
        element: <CustomerLoginOrRegister />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
