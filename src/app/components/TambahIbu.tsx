import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataContext } from "./DataContext";

const TambahIbu: React.FC = () => {
  const { addIbu, updateIbu } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { editData } = location.state || {};

  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    tanggallahir: "",
    niksuami: "",
    namasuami: "",
    telepon: "",
    alamat: "",
    bbsebelum: "",
    bbsesudah: "",
    tb: "",
    ll: "",
    goldar: "",
    hemoglobin: "",
    tinggifundus: "",
    jadwallahir: "",
    keluhan: "",
    keterangan: "",
  });

  const [umur, setUmur] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setUmur(calculateAge(editData.tanggallahir));
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tanggallahir") {
      setUmur(calculateAge(value));
    }
  };

  const calculateAge = (tanggallahir: string) => {
    const birthDate = new Date(tanggallahir);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += previousMonthDays;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} tahun, ${months} bulan, ${days} hari`;
  };

  const validateForm = () => {
    const requiredFieldsByStep = {
      1: ["nik", "nama", "tanggallahir", "niksuami", "namasuami", "alamat"],
      2: [
        "bbsebelum",
        "bbsesudah",
        "tb",
        "telepon",
        "goldar",
        "hemoglobin",
        "tinggifundus",
        "jadwallahir",
      ],
    };

    const requiredFields = requiredFieldsByStep[step] || [];
    const newErrors = requiredFields
      .filter((field) => !formData[field]?.trim())
      .map((field) => `Field "${field}" harus diisi.`);

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep((prev) => prev + 1);
      setErrors([]);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (editData) {
        updateIbu(editData.nik, { ...formData, umur });
      } else {
        addIbu({ ...formData, umur });
      }
      navigate("/ibu");
    }
  };

  return (
    <div className="p-12 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">
        {editData ? "Edit Data Ibu Hamil" : "Tambah Data Ibu Hamil"}
      </h2>

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
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 text-black">
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="NIK"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="text"
              name="niksuami"
              value={formData.niksuami}
              onChange={handleChange}
              placeholder="NIK Suami"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="text"
              name="namasuami"
              value={formData.namasuami}
              onChange={handleChange}
              placeholder="Nama Suami"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="date"
              name="tanggallahir"
              value={formData.tanggallahir}
              onChange={handleChange}
              className="p-2 bg-white/30 border rounded-lg"
            />
            {umur && <p>Umur: {umur}</p>}
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Alamat"
              className="p-2 bg-white/30 border rounded-lg"
            ></textarea>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4 text-black">
            <input
              type="number"
              name="bbsebelum"
              value={formData.bbsebelum}
              onChange={handleChange}
              placeholder="BB Sebelum Hamil"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="number"
              name="bbsesudah"
              value={formData.bbsesudah}
              onChange={handleChange}
              placeholder="BB Setelah Hamil"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="number"
              name="tb"
              value={formData.tb}
              onChange={handleChange}
              placeholder="Tinggi Badan"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="number"
              name="tinggifundus"
              value={formData.tinggifundus}
              onChange={handleChange}
              placeholder="Tinggi Fundus (cm)"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="date"
              name="jadwallahir"
              value={formData.jadwallahir}
              onChange={handleChange}
              className="p-2 bg-white/30 border rounded-lg"
            />
            <input
              type="number"
              name="hemoglobin"
              value={formData.hemoglobin}
              onChange={handleChange}
              placeholder="Hemoglobin (g/dL)"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <select
              name="goldar"
              value={formData.goldar}
              onChange={handleChange}
              className="p-2 bg-white/30 border rounded-lg"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              placeholder="Nomor Telepon"
              className="p-2 bg-white/30 border rounded-lg"
            />
            <textarea
              name="keluhan"
              value={formData.keluhan}
              onChange={handleChange}
              placeholder="Keluhan"
              className="p-2 bg-white/30 border rounded-lg"
            ></textarea>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Keterangan"
              className="p-2 bg-white/30 border rounded-lg"
            ></textarea>
          </div>
        )}

        <div className="flex justify-end mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="mr-4 px-4 py-2 bg-gray-400 text-white rounded"
            >
              Kembali
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Berikutnya
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TambahIbu;
