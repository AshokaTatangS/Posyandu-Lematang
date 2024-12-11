import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "./DataContext";
import { FaBaby } from "react-icons/fa";

const Bayi: React.FC = () => {
  const { dataBayi, deleteBayi } = useDataContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Partial<Bayi> | null>(null);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = dataBayi.filter(
    (bayi) =>
      bayi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bayi.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEditing = (bayi: Bayi) => {
    navigate("/TambahBayi", { state: { editData: bayi } });
  };

  const confirmDelete = (bayi: Bayi) => {
    setDeleteTarget(bayi);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    if (deleteTarget?.nik) {
      deleteBayi(deleteTarget.nik);
    }
    setShowDeleteConfirmation(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-8 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6 flex items-center">
        <FaBaby className="mr-2" />
        Data Bayi
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
              <th className="px-4 py-2 text-left">NIK</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Jenis Kelamin</th>
              <th className="px-4 py-2 text-left">Umur</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data bayi.
                </td>
              </tr>
            ) : (
              filteredData.map((bayi, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-[#FFE2DC] text-black"
                      : "bg-[#FFEEEA] text-black"
                  }
                >
                  <td className="px-4 py-2">{bayi.nik}</td>
                  <td className="px-4 py-2">{bayi.nama}</td>
                  <td className="px-4 py-2">{bayi.jenisKelamin}</td>
                  <td className="px-4 py-2">{bayi.umur}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => startEditing(bayi)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(bayi)}
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

export default Bayi;
