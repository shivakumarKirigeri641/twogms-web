import { useEffect, useState } from "react";
import {
  Wrench,
  CarFront,
  PlusCircle,
  BarChart3,
  CreditCard,
  Wallet,
  UserCog,
  Users,
  User,
  Car,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const ownerMenu = [
  { name: "Servicing Vehicles", href: "/", icon: <Wrench size={18} /> },
  {
    name: "Serviced Vehicles",
    href: "/twogms/serviced-vehicles",
    icon: <CarFront size={18} />,
  },
  {
    name: "Add Vehicle",
    href: "/twogms/add-vehicle",
    icon: <PlusCircle size={18} />,
  },
  { name: "Statistics", href: "#", icon: <BarChart3 size={18} /> },
  { name: "Service Payments", href: "#", icon: <CreditCard size={18} /> },
  { name: "Recharge & Wallets", href: "#", icon: <Wallet size={18} /> },
  {
    name: "Manage Services",
    icon: <UserCog size={18} />,
    submenu: [
      { name: "Staff", href: "#", icon: <Users size={16} /> },
      { name: "Customer", href: "#", icon: <User size={16} /> },
      { name: "Vehicle", href: "#", icon: <Car size={16} /> },
    ],
  },
  { name: "Settings", href: "#", icon: <Settings size={18} /> },
  { name: "Profile", href: "#", icon: <User size={18} /> },
  { name: "Logout", href: "/twogms/logout", icon: <LogOut size={18} /> },
];

const staffMenu = [
  { name: "Servicing Vehicles", href: "/", icon: <Wrench size={18} /> },
  {
    name: "Serviced Vehicles",
    href: "/twogms/serviced-vehicles",
    icon: <CarFront size={18} />,
  },
  {
    name: "Add Vehicle",
    href: "/twogms/add-vehicle",
    icon: <PlusCircle size={18} />,
  },
  { name: "Profile", href: "#", icon: <User size={18} /> },
  { name: "Logout", href: "/twogms/logout", icon: <LogOut size={18} /> },
];
export default function Navbar({ role = "owner", ownerName = "Shivakumar" }) {
  const loginCredentials = useSelector((store) => store.loginCredentials);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginCredentials) {
      navigate("/twogms/login");
    }
  }, []);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const menuItems = role === "owner" ? ownerMenu : staffMenu;

  return (
    loginCredentials && (
      <div>
        <div className="sticky top-0 z-50 shadow-2xl bg-white text-sm bg-gradient-to-b from-yellow-50 to-yellow-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">🚗 TWOGMS</div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6">
              {menuItems.map((item, idx) =>
                item.submenu ? (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setOpenSubmenu(true)}
                    onMouseLeave={() => setOpenSubmenu(false)}
                  >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition">
                      {item.icon} {item.name}
                    </button>
                    {openSubmenu && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2">
                        {item.submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            to={sub.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
                          >
                            {sub.icon} {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={idx}
                    to={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
                  >
                    {item.icon} {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Bottom Part */}
          <div className="bg-blue-50 px-4 py-2 text-gray-700 font-medium">
            Welcome, <span className="text-blue-600">{ownerName}</span>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-lg border-t px-4 py-3 space-y-2 animate-slideDown">
              {menuItems.map((item, idx) =>
                item.submenu ? (
                  <div key={idx}>
                    <button
                      onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                      className="flex w-full items-center justify-between text-gray-700 hover:text-blue-600 transition py-2"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon} {item.name}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          mobileSubmenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileSubmenuOpen && (
                      <div className="ml-6 space-y-2">
                        {item.submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            to={sub.href}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
                          >
                            {sub.icon} {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={idx}
                    to={item.href}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition py-2"
                  >
                    {item.icon} {item.name}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
}
