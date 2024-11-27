"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kalender from "./components/Kalender";
import Login from "./components/Login";
import Register from "./components/Register";
import Bayi from "./components/Bayi";
import TambahBayi from "./components/TambahBayi";
import { DataProvider } from "./components/DataContext"; // Import DataProvider

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/TambahBayi" element={<TambahBayi />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
