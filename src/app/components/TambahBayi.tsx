import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "./DataContext";

const TambahBayi: React.FC = () => {
  const { addBayi } = useDataContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    umur: "",
    jenisKelamin: "",
    bb: "",
    tb: "",
    tanggalLahir: "",
    namaOrangTua: "",
    nikOrangTua: "",
    lingkarLengan: "",
    lingkarKepala: "",
    keterangan: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors.push(`Field "${key}" harus diisi.`);
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addBayi(formData);
      navigate("/bayi");
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">Tambah Data Bayi dan Balita</h2>

      {/* Tampilkan pesan kesalahan */}
      {errors.length > 0 && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 text-black">
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            placeholder="NIK Anak"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama Anak"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="umur"
            value={formData.umur}
            onChange={handleChange}
            placeholder="Umur"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            placeholder="Jenis Kelamin"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="bb"
            value={formData.bb}
            onChange={handleChange}
            placeholder="BB (Berat Badan)"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="tb"
            value={formData.tb}
            onChange={handleChange}
            placeholder="TB (Tinggi Badan)"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            placeholder="Tanggal Lahir"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="namaOrangTua"
            value={formData.namaOrangTua}
            onChange={handleChange}
            placeholder="Nama Orang Tua"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="nikOrangTua"
            value={formData.nikOrangTua}
            onChange={handleChange}
            placeholder="NIK Orang Tua"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="lingkarLengan"
            value={formData.lingkarLengan}
            onChange={handleChange}
            placeholder="Lingkar Lengan (cm)"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="lingkarKepala"
            value={formData.lingkarKepala}
            onChange={handleChange}
            placeholder="Lingkar Kepala (cm)"
            className="p-2 border rounded"
          />
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            placeholder="Keterangan Tambahan"
            className="p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahBayi;
