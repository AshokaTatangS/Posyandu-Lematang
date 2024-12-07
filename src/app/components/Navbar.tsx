import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBaby,
  FaHospital,
  FaUserNurse,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import { MdElderly } from "react-icons/md";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-[#FFC1C1]" : "bg-transparent";

  return (
    <div className="flex static">
      {/* Sidebar */}
      <nav className="w-64 bg-gradient-to-t from-[#FFE2DC] to-white h-full">
        {/* Header tanpa border */}
        <div className="bg-[#FFABAB] py-6 px-4 rounded-tr-2xl mt-10">
          <h1 className="text-4xl font-bold text-white text-center">Lemandu</h1>
          <h2 className="text-white text-center mt-0.5 text-md">
            Portal Posyandu Lematang
          </h2>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-1 mt-4 border-r border-grey-300 bg-transparent">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/"
              )}`}
            >
              <FaHome /> Beranda
            </Link>
          </li>
          {/* Catatan Kesehatan (non-clickable) */}
          <li>
            <div className="flex items-center gap-2 block py-3 px-4 text-gray-700 cursor-default">
              <FaHospital /> Catatan Kesehatan
            </div>
          </li>
          {/* Submenu for Catatan Kesehatan */}
          <ul className="ml-6 space-y-1">
            <li>
              <Link
                to="/bayi"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/bayi"
                )}`}
              >
                <FaBaby /> Bayi dan Balita
              </Link>
            </li>
            <li>
              <Link
                to="/ibu"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/ibu"
                )}`}
              >
                <FaUserNurse /> Ibu Hamil
              </Link>
            </li>
            <li>
              <Link
                to="/lansia"
                className={`flex items-center gap-2 block py-2 px-4 text-gray-600 hover:bg-pink-50 ${isActive(
                  "/lansia"
                )}`}
              >
                <MdElderly /> Lansia
              </Link>
            </li>
          </ul>
          <li>
            <Link
              to="/laporan-posyandu"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/laporan-posyandu"
              )}`}
            >
              <FaClipboardList /> Laporan Posyandu
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/login"
              )}`}
            >
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`flex items-center gap-2 block py-3 px-4 text-gray-700 hover:bg-pink-100 ${isActive(
                "/register"
              )}`}
            >
              <FaUserPlus /> Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
