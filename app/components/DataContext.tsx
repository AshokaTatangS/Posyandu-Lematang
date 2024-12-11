import React, { createContext, useContext, useState } from "react";

interface Bayi {
  nik: string;
  nama: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  umur: number;
  bb: number;
  tb: number;
  tanggalLahir: string;
  namaOrangTua: string;
  nikOrangTua: string;
  lk: number;
  ll: number;
  keterangan: string;
}

interface IbuHamil {
  nik: string;
  nama: string;
  tanggallahir: string;
  niksuami: string;
  namasuami: string;
  umur: number;
  telepon: string;
  alamat: string;
  bbsebelum: number;
  bbsesudah: number;
  tb: number;
  ll: number;
  goldar: number;
  hemoglobin: number;
  tinggifundus: number;
  jadwallahir: string;
  keluhan: string;
  keterangan: string;
}

interface Lansia {
  nik: string;
  nama: string;
  tanggallahir: string;
  umur: number;
  jeniskelamin: "Laki-laki" | "Perempuan";
  noHp?: string;
  namawali: string;
  telpwali: string;
  alamat: string;
  bb: number;
  tb: number;
  ll: number;
  lk: number;
  tensi: number;
  goldar: string;
  keterangan: string;
}

interface DataContextProps {
  dataBayi: Bayi[];
  addBayi: (bayi: Bayi) => void;
  deleteBayi: (nik:string) => void; 
  updateBayi: (nik: string, updatedData: Partial<Bayi>) => void;
  dataIbu: IbuHamil[];
  addIbu: (ibu: IbuHamil) => void;
  deleteIbu: (nik:string) => void; 
  updateIbu: (nik: string, updatedData: Partial<IbuHamil>) => void;
  dataLansia: Lansia[];
  addLansia: (lansia: Lansia) => void;
  deleteLansia: (nik:string) => void; 
  updateLansia: (nik: string, updatedData: Partial<Lansia>) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataBayi, setDataBayi] = useState<Bayi[]>([]);
  const [dataIbu, setDataIbu] = useState<IbuHamil[]>([]);
  const [dataLansia, setDataLansia] = useState<Lansia[]>([]);

  // Bayi
  const addBayi = (bayi: Bayi) => setDataBayi((prev) => [...prev, bayi]);
  const deleteBayi = (nik: string) =>{
    setDataBayi((prev) => prev.filter((b) => b.nik !== nik));
  }
  const updateBayi = (nik: string, updatedData: Partial<Bayi>) =>
    setDataBayi((prev) =>
      prev.map((b) => (b.nik === nik ? { ...b, ...updatedData } : b))
    );

  // Ibu Hamil
  const addIbu = (ibu: IbuHamil) => setDataIbu((prev) => [...prev, ibu]);
  const deleteIbu = (nik: string) =>
    setDataIbu((prev) => prev.filter((i) => i.nik !== nik));
  const updateIbu = (nik: string, updatedData: Partial<IbuHamil>) =>
    setDataIbu((prev) =>
      prev.map((i) => (i.nik === nik ? { ...i, ...updatedData } : i))
    );

  // Lansia
  const addLansia = (lansia: Lansia) => setDataLansia((prev) => [...prev, lansia]);
  const deleteLansia = (nik: string) =>
    setDataLansia((prev) => prev.filter((l) => l.nik !== nik));
  const updateLansia = (nik: string, updatedData: Partial<Lansia>) =>
    setDataLansia((prev) =>
      prev.map((l) => (l.nik === nik ? { ...l, ...updatedData } : l))
    );

  return (
    <DataContext.Provider
      value={{
        dataBayi,
        addBayi,
        deleteBayi,
        updateBayi,
        dataIbu,
        addIbu,
        deleteIbu,
        updateIbu,
        dataLansia,
        addLansia,
        deleteLansia,
        updateLansia,
      }}
    >
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
