import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataContext } from "./DataContext";

const TambahLansia: React.FC = () => {
  const { addLansia, updateLansia } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData;
  const [umur, setUmur] = useState<string>();

  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    tanggallahir: "",
    telepon: "",
    alamat: "",
    bb: "",
    tb: "",
    ll: "",
    lk: "",
    tensi: "",
    goldar: "",
    keterangan: "",
    jeniskelamin: "",
    noHp: "",
    namawali: "",
    telpwali: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  // Muat data awal jika dalam mode edit
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.tanggallahir) {
        setUmur(calculateAge(initialData.tanggallahir));
      }
    }
  }, [initialData]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tanggallahir") {
      setUmur(calculateAge(value));
    }
  };

  const validateCurrentStep = () => {
    const requiredFieldsByStep = {
      1: [
        "nik",
        "nama",
        "tanggallahir",
        "jeniskelamin",
        "alamat",
        "namawali",
        "telpwali",
      ],
      2: ["bb", "tb", "ll", "lk", "tensi", "goldar", "keterangan"],
    };

    const requiredFields = requiredFieldsByStep[step] || [];
    const newErrors = requiredFields
      .filter((field) => !formData[field]?.trim())
      .map((field) => `Field "${field}" harus diisi.`);

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
      setErrors([]);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setErrors([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCurrentStep()) {
      const dataToSubmit = { ...formData, umur: calculateAge(formData.tanggallahir) };

      if (initialData) {
        // Update mode
        updateLansia(dataToSubmit);
      } else {
        // Add mode
        addLansia(dataToSubmit);
      }

      navigate("/lansia");
    }
  };

  return (
    <div className="p-12 bg-gradient-to-t from-[#FFE2DC] to-white min-h-screen">
      <h2 className="text-2xl text-black font-bold mb-4">
        {initialData ? "Edit Data Lansia/Orang Tua" : "Tambah Data Lansia/Orang Tua"}
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
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="date"
              name="tanggallahir"
              value={formData.tanggallahir}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            {umur && (
              <div className="text-black mt-2">
                <p>Umur: {umur}</p>
              </div>
            )}
            <select
              name="jeniskelamin"
              value={formData.jeniskelamin}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <input
              type="tel"
              name="noHp"
              value={formData.noHp || ""}
              onChange={handleChange}
              placeholder="Nomor Telepon (Opsional)"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="text"
              name="namawali"
              value={formData.namawali}
              onChange={handleChange}
              placeholder="Nama Wali"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="tel"
              name="telpwali"
              value={formData.telpwali}
              onChange={handleChange}
              placeholder="Nomor Telepon Wali"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Alamat"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            ></textarea>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4 text-black">
            <input
              type="number"
              name="bb"
              value={formData.bb}
              onChange={handleChange}
              placeholder="BB Lansia"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="tb"
              value={formData.tb}
              onChange={handleChange}
              placeholder="Tinggi Badan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="ll"
              value={formData.ll}
              onChange={handleChange}
              placeholder="Lingkar Lengan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="lk"
              value={formData.lk}
              onChange={handleChange}
              placeholder="Lingkar Kepala"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <input
              type="number"
              name="tensi"
              value={formData.tensi}
              onChange={handleChange}
              placeholder="Tensi Darah (mmHg)"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            />
            <select
              name="goldar"
              value={formData.goldar}
              onChange={handleChange}
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              placeholder="Keterangan Tambahan"
              className="p-2 bg-white/30 backdrop-blur-md border border-white/50 rounded-lg shadow-lg"
            ></textarea>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={step === 1 ? handleBack : handleNext}
            className="px-6 py-2 bg-gray-500 text-white rounded"
          >
            {step === 1 ? "Kembali" : "Next"}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            {initialData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahLansia;
