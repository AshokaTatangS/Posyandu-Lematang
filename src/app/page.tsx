"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kalender from "./components/Kalender";
import Login from "./components/Login";
import Register from "./components/Register";
import Bayi from "./components/Bayi";
import TambahBayi from "./components/TambahBayi";
import IbuHamil from "./components/IbuHamil";
import { DataProvider } from "./components/DataContext"; // Import DataProvider
import TambahIbu from "./components/TambahIbu";
import Lansia from "./components/Lansia";
import TambahLansia from "./components/TambahLansia";

function App() {
  return (
    // Bungkus seluruh aplikasi dengan DataProvider
    <DataProvider>
      <Router>
        <div className="flex mt-10">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Kalender />} />
              <Route path="/bayi" element={<Bayi />} />
              <Route path="/ibu-hamil" element={<IbuHamil />} />
              <Route path="/lansia" element={<Lansia />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/TambahBayi" element={<TambahBayi />} />
              <Route path="/TambahIbu" element={<TambahIbu />} />
              <Route path="/TambahLansia" element={<TambahLansia />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
