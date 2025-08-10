import ReactDOM from "react-dom/client";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Error from "./components/Error";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Provider, useSelector } from "react-redux";
import appStore from "./store/appStore";
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <Navbar />
      <Outlet />
      <Footer />
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
        path: "/twogms/about",
        element: <About />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
