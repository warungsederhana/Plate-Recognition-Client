import Image from "next/image";
import React from "react";

const Plate = () => {
  return (
    <div className="bg-primary-700">
      {/* <section className="mx-auto w-full flex flex-col gap-4 py-20 lg:py-36 px-8 pb-16 md:pb-20 md:gap-2 lg:px-28 lg:gap-16 lg:flex-row-reverse "> */}
      <section className="mx-auto w-full flex flex-col gap-4 py-20 lg:py-36 px-8 pb-16 md:pb-20 md:px-16 lg:px-28 md:gap-16 md:flex-row-reverse ">
        {/* kiri */}
        <div className="flex flex-col justify-center items-start md:max-w-96 lg:max-w-full lg:flex-1 lg:max-w-1/4 ">
          <h1 className="text-header4 lg:text-header3 text-info-400 font-bold mb-4">
            Mendeteksi Plat Nomor <br /> Kendaraan
          </h1>
          <p className="text-body1 lg:text-subtitle2 text-white font-regular text-justify">
            Dengan menggunakan model machine learning, aplikasi dapat membaca dan memproses plat
            nomor kendaraan dengan cukup akurat. Dengan mengunggah gambar kendaraan yang ingin
            diidentifikasi, lalu akan diproses oleh model dan menguraikan informasi yang terkandung
            dalam plat nomor tersebut.
          </p>
        </div>
        {/* kanan */}
        <div className="flex justify-center lg:justify-end  items-center lg:flex-1 ">
          <Image
            src="/img/landing-plate-img-3.png"
            alt="Tax landing page image"
            width={500}
            height={500}
            className="p-0 m-0 w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default Plate;
