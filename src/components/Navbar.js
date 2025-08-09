import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [openMenu, setopenMenu] = useState(false);
  const garageCredentials = useSelector(
    (store) => store.garageLoginCredentials
  );
  return garageCredentials ? <div>inside after login</div> : <></>;
};

export default Navbar;
