import React from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "./DataContext";
import { FaBaby } from "react-icons/fa";

const Bayi: React.FC = () => {
  const { dataBayi } = useDataContext();

  if (!dataBayi || !Array.isArray(dataBayi)) {
    return (
      <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
        <h1 className="text-2xl font-bold text-black mb-6">Data Bayi</h1>
        <div className="flex justify-end mb-4">
          <Link
            to="/TambahBayi"
            className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
          >
            Tambah Data
          </Link>
        </div>
        <div className="text-center py-4">
          Data bayi tidak tersedia atau belum diinisialisasi dengan benar.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-1 flex items-center">
        <FaBaby className="mr-2" />
        Data Bayi
      </h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/TambahBayi"
          className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
        >
          Tambah Data
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse rounded-md overflow-hidden">
          <thead className="bg-[#FFABAB] text-gray-900">
            <tr>
              <th className="border-b border-white px-4 py-2 text-left">NIK</th>
              <th className="border-b border-white px-4 py-2 text-left">
                Nama
              </th>
              <th className="border-b border-white px-4 py-2 text-left">
                Jenis Kelamin
              </th>
              <th className="border-b border-white px-4 py-2 text-left">
                Umur
              </th>
              <th className="border-b border-white px-4 py-2 text-left">BB</th>
              <th className="border-b border-white px-4 py-2 text-left">TB</th>
              <th className="border-b border-white px-4 py-2 text-left">
                Tanggal Lahir
              </th>
              <th className="border-b border-white px-4 py-2 text-left">
                Nama Orang Tua
              </th>
              <th className="border-b border-white px-4 py-2 text-left">
                NIK Orang Tua
              </th>
              <th className="border-b border-white px-4 py-2 text-left">LK</th>
              <th className="border-b border-white px-4 py-2 text-left">LL</th>
              <th className="border-b border-white px-4 py-2 text-left">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {dataBayi.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center py-4 text-gray-500">
                  Tidak ada data bayi.
                </td>
              </tr>
            ) : (
              dataBayi.map((bayi, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-[#FFE2DC] text-black"
                      : "bg-[#FFEEEA] text-black"
                  }
                >
                  <td className="border-b border-white px-4 py-2">
                    {bayi.nik}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.nama}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.jenisKelamin}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.umur}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.bb} kg
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.tb} cm
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.tanggalLahir}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.namaOrangTua}
                  </td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.nikOrangTua}
                  </td>
                  <td className="border-b border-white px-4 py-2">{bayi.lk}</td>
                  <td className="border-b border-white px-4 py-2">{bayi.ll}</td>
                  <td className="border-b border-white px-4 py-2">
                    {bayi.keterangan}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bayi;
