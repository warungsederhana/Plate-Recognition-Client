import React from "react";
import Image from "next/image";

const Tax = () => {
  return (
    // <section className="mx-auto w-full flex flex-col gap-4 py-20 lg:py-36 px-8 pb-16 md:pb-20 md:gap-2 lg:pb-20 lg:px-28 lg:gap-16 lg:flex-row ">
    <section className="mx-auto w-full flex flex-col gap-4 py-20 lg:py-36 px-8 pb-16 md:pb-20 md:px-16 lg:px-28 md:gap-16 md:flex-row ">
      {/* kiri */}
      <div className="flex flex-col justify-center items-start md:max-w-96 lg:max-w-full lg:flex-1 lg:max-w-1/4 ">
        <h1 className="text-header4 lg:text-header3 text-primary-700 font-bold mb-4">
          Simulasi Pembayaran Pajak Kendaraan
        </h1>
        <p className="text-body1 lg:text-subtitle2 text-black font-regular text-justify">
          Dengan menggunakan model machine learning, aplikasi dapat membaca dan memproses plat nomor
          kendaraan dengan cukup akurat. Dengan mengunggah gambar kendaraan yang ingin
          diidentifikasi, lalu akan diproses oleh model dan menguraikan informasi yang terkandung
          dalam plat nomor tersebut.
        </p>
      </div>
      {/* kanan */}
      <div className="flex justify-center lg:justify-end  items-center lg:flex-1 ">
        <Image
          src="/img/landing-tax-img.svg"
          alt="Tax landing page image"
          width={500}
          height={500}
          className="p-0 m-0 w-full"
        />
      </div>
    </section>
  );
};

export default Tax;
