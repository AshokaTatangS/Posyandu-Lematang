import React, { createContext, useContext, useState } from "react";

interface Bayi {
  nik: string;
  nama: string;
  umur: string;
  jenisKelamin: string;
  bb: string;
  tb: string;
}

interface DataContextProps {
  dataBayi: Bayi[];
  addBayi: (bayi: Bayi) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataBayi, setDataBayi] = useState<Bayi[]>([]);

  const addBayi = (bayi: Bayi) => {
    setDataBayi((prev) => [...prev, bayi]);
  };

  return (
    <DataContext.Provider value={{ dataBayi, addBayi }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
