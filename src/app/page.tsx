"use client";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kalender from "./components/Kalender";
import Login from "./components/Login";
// import Register from "./components/Register";
import Bayi from "./components/Bayi";
import IbuHamil from "./components/IbuHamil";
import TambahBayi from "./components/TambahBayi";
import TambahIbu from "./components/TambahIbu";
import { DataProvider } from "./components/DataContext";
import Lansia from "./components/Lansia";
import TambahLansia from "./components/TambahLansia";
import Loading from "./components/Loading";

function App() {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 70; // Increment by 70px
          if (newProgress >= 700) {
            clearInterval(timer);
            setIsLoading(false);
            return 100;
          }
          return newProgress;
        });
      }, 500); // Update every 100ms

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  return (
    <DataProvider>
      <Router>
        {isLoading ? (
          <Loading progress={progress} />
        ) : (
          <div className="flex">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Kalender />} />
                <Route path="/bayi" element={<Bayi />} />
                <Route path="/ibu" element={<IbuHamil />} />
                <Route path="/lansia" element={<Lansia />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/TambahBayi" element={<TambahBayi />} />
                <Route path="/TambahIbu" element={<TambahIbu />} />
                <Route path="/TambahLansia" element={<TambahLansia />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </DataProvider>
  );
}

export default App;
