import React from "react";
import Image from "next/image";

// Define the props interface
interface LoadingProps {
  progress: number; // Specify that progress should be a number
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="min-h-screen bg-[url('/home_bg.png')] bg-no-repeat bg-center bg-cover bg-white flex justify-center">
      <div className="flex flex-col items-center justify-center text-[#5b2a3b]">
        <Image src={"/logo.png"} width={300} height={300} alt="logo" />
        <h1 className="text-center text-5xl mt-4 font-bold">LEMANDU</h1>
        <h2 className="text-center text-3xl tracking-[0.4em] mt-4">
          LEMATANG POSYANDU
        </h2>

        <div className="w-[700px] h-[30px] bg-[#D9D9D9] mt-4 rounded-full">
          <div
            className="h-[30px] bg-red-300 rounded-full"
            style={{ width: `${progress}px` }} // Set the width based on progress
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
