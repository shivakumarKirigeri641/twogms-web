import Footer from "./components/general/Footer";
import Statistics from "./components/garagespecific/Statistics";
import GarageDashboard from "./components/garagespecific/GarageDashboard";
import Error from "./components/Error";
import "flowbite";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-sky-300">
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
        path: "/twogms/dashboard",
        element: <GarageDashboard />,
      },
      {
        path: "/twogms/statistics",
        element: <Statistics />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
