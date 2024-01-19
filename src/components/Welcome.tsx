import Image from "next/image";
import React from "react";

const Welcome = () => {
  return (
    // <section className=" mx-auto w-full flex flex-col gap-4 py-10 px-8 pb-16 md:gap-2 lg:pb-20 lg:px-28 lg:gap-16 lg:flex-row ">
    <section className="mx-auto w-full flex flex-col gap-4 py-2 px-8 pb-16 md:pb-20 md:px-16 md:gap-16 md:flex-row lg:px-28">
      {/* kiri */}
      <div className="flex flex-col justify-center items-start md:max-w-96 lg:max-w-full lg:flex-1">
        <h1 className="text-header4 lg:text-header3 text-primary-700 font-bold mb-4">
          Selamat Datang di <br /> AI Plate Recognition
        </h1>
        <p className="text-body1 lg:text-subtitle2 text-black font-regular text-justify">
          AI Plate Recognition merupakan aplikasi berbasis website dan android mobile dengan
          menggunakan machine learning untuk mendeteksi plat kendaraan (License Plate) dengan
          menampilkan keterangan detail dan simulasi pembayaran pajak.
        </p>
      </div>
      {/* kanan */}
      <div className="flex justify-center lg:justify-end  items-center lg:flex-1 lg:pt-5">
        <Image
          src="/img/landing-welcome-img-2.png"
          alt="Tax landing page image"
          width={500}
          height={500}
          className="p-0 m-0 w-full"
        />
      </div>
    </section>
  );
};

export default Welcome;
