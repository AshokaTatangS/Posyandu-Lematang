import React from "react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg overflow-hidden w-[100%] max-w-[75%] h-[100%] md:h-[100%]">
        {/* Bagian Form Daftar */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Daftar Akun</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="contoh@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Masukkan Kata Sandi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Masukkan Kata Sandi Lagi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#63C96B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#63C96B] text-white font-semibold rounded-md hover:bg-[#52A95A] transition-colors"
              >
                Daftar Akun
              </button>
            </form>
          </div>
        </div>

        {/* Bagian Informasi Masuk */}
        <div className="flex-1 p-8 bg-[#63C96B] rounded-l-[60px] flex flex-col items-center justify-center font-montserrat">
          <h2 className="text-4xl font-bold text-white mb-4">Halo Teman!</h2>
          <p className="text-center text-white mb-6">
            Masuk ke dalam akun Anda untuk menggunakan semua fitur!
          </p>
          <Link href="../login/Login.tsx">
            <button className="py-2 px-6 bg-[#63C96B] border-2 border-white text-white font-semibold rounded-md hover:bg-[#52A95A] transition-colors">
              Masuk
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
