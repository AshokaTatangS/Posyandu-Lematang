import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-[#FFCBC1]" : "bg-white";

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white">
        {/* Header tanpa border */}
        <div className="bg-[#FFABAB] py-6 px-4 rounded-tr-[20%]">
          <h1 className="text-2xl font-bold text-white">PortalPosyandu</h1>
        </div>

        {/* Navigation Links, border hanya pada bagian bawah */}
        <ul className="space-y-1 mt-4 border-r border-grey-300 h-full">
          <li>
            <Link
              to="/"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/"
              )}`}
            >
              Kalender
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/login"
              )}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/register"
              )}`}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
