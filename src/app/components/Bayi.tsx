// Bayi.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "./DataContext";

const Bayi: React.FC = () => {
  const { dataBayi } = useDataContext();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Data Bayi dan Balita</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/TambahBayi"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Tambah Data
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-400">
            <tr>
              <th className="border-b border-white px-4 py-2 text-left rounded-l-lg">NIK</th>
              <th className="border-b border-white px-4 py-2 text-left">Nama Anak</th>
              <th className="border-b border-white px-4 py-2 text-left">Umur</th>
              <th className="border-b border-white px-4 py-2 text-left">Jenis Kelamin</th>
              <th className="border-b border-white px-4 py-2 text-left">BB</th>
              <th className="border-b border-white px-4 py-2 text-left rounded-r-lg">TB</th>
            </tr>
          </thead>
          <tbody>
            {dataBayi.map((bayi, index) => (
              <tr key={index} className="bg-gray-200 text-black">
                <td className="border-b border-white px-4 py-2 rounded-l-lg">{bayi.nik}</td>
                <td className="border-b border-white px-4 py-2">{bayi.nama}</td>
                <td className="border-b border-white px-4 py-2">{bayi.umur}</td>
                <td className="border-b border-white px-4 py-2">{bayi.jenisKelamin}</td>
                <td className="border-b border-white px-4 py-2">{bayi.bb} kg</td>
                <td className="border-b border-white px-4 py-2 rounded-r-lg">{bayi.tb} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bayi;
