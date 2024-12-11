import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "./DataContext";
import { FaUserNurse } from "react-icons/fa";

const Lansia: React.FC = () => {
  const { dataLansia = [], deleteLansia } = useDataContext(); // Menambahkan default array kosong untuk dataLansia
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Partial<Lansia> | null>(null);
  const navigate = useNavigate();

  // Handle perubahan input pencarian
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter data lansia berdasarkan nama atau NIK
  const filteredData = dataLansia.filter(
    (lansia) =>
      lansia.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lansia.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mulai proses edit lansia
  const startEditing = (lansia: Lansia) => {
    navigate("/TambahLansia", { state: { editData: lansia } });
  };

  // Konfirmasi hapus data lansia
  const confirmDelete = (lansia: Lansia) => {
    setDeleteTarget(lansia);
    setShowDeleteConfirmation(true);
  };

  // Proses penghapusan data
  const handleDelete = () => {
    if (deleteTarget?.nik) {
      deleteLansia(deleteTarget.nik);
    }
    setShowDeleteConfirmation(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6 flex items-center">
        <FaUserNurse className="mr-2" />
        Data Lansia
      </h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cari nama atau NIK"
          className="px-4 py-2 border border-gray-300 text-black rounded-md"
        />
        <Link
          to="/TambahLansia"
          className="px-4 py-2 bg-[#48D1CC] font-medium text-black rounded-md hover:bg-gray-200"
        >
          Tambah Data
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse rounded-md overflow-hidden">
          <thead className="bg-[#FFABAB] text-gray-900">
            <tr>
              <th className="border-b border-white px-4 py-2 text-center">NIK</th>
              <th className="border-b border-white px-4 py-2 text-center">Nama</th>
              <th className="border-b border-white px-4 py-2 text-center">Tanggal Lahir</th>
              <th className="border-b border-white px-4 py-2 text-center">Umur</th>
              <th className="border-b border-white px-4 py-2 text-center">Alamat</th>
              <th className="border-b border-white px-4 py-2 text-center">Telepon</th>
              <th className="border-b border-white px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Tidak ada data lansia.
                </td>
              </tr>
            ) : (
              filteredData.map((lansia, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-[#FFE2DC] text-black"
                      : "bg-[#FFEEEA] text-black"
                  }
                >
                  <td className="border-b border-white px-4 py-2">{lansia.nik}</td>
                  <td className="border-b border-white px-4 py-2">{lansia.nama}</td>
                  <td className="border-b border-white px-4 py-2">{lansia.tanggallahir}</td>
                  <td className="border-b border-white px-4 py-2">{lansia.umur}</td>
                  <td className="border-b border-white px-4 py-2">{lansia.alamat}</td>
                  <td className="border-b border-white px-4 py-2">{lansia.telepon}</td>
                  <td className="border-b border-white px-4 py-2 flex gap-2">
                    <button
                      onClick={() => startEditing(lansia)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(lansia)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmation && deleteTarget && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg text-black">
            <p>
              Apakah Anda yakin ingin menghapus data {deleteTarget.nama} dengan
              NIK {deleteTarget.nik}?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Hapus
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lansia;
