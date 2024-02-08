"use client";
import React from "react";
import { Input, Button } from "@material-tailwind/react";
import DashboardNavbar from "../../../components/DashboardNavbar";

const TaxPaymentPage = () => {
  return (
    <>
      <DashboardNavbar />
      <section className="mx-auto w-full h-full flex flex-col gap-2 px-8 mb-16 justify-start lg:px-28">
        {/* SECTION 1 */}

        <div className="w-full flex flex-col gap-2 pt-6 ">
          <h1 className=" font-bold text-header5 text-primary-700">Pembayaran Pajak</h1>
          <p className="font-regular text-body1 text-black text-justify">
            Input informasi yang diperlukan untuk melihat dan membayar tagihan pajak dengan cepat
            dan mudah. Sistem kami dirancang untuk memberikan kemudahan akses dan pengelolaan
            pembayaran pajak secara efisien.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="w-full flex flex-col gap-4 mt-2 items-center justify-center md:flex-row">
          <Input
            crossOrigin={undefined}
            type="text"
            label="Plat Nomor Kendaraan"
            value={""}
            size="lg"
            placeholder="B **** RKE"
          />

          <Input
            crossOrigin={undefined}
            type="text"
            label="NIK Pemilik Kendaraan"
            value={""}
            size="lg"
            placeholder="31067**********"
          />

          <Button
            fullWidth={true}
            className="min-w-40 max-w-40  flex-1 bg-primary-500 md:ml-10 lg:py-3"
            placeholder={undefined}
          >
            <p className="text-caption font-bold text-white text-center lg:text-body2">
              Cek Tagihan
            </p>
          </Button>
        </div>

        {/* SECTION 3 */}
        <div className="flex flex-col mt-2 justify-center">
          <p className="text-body1 mb-2">Jumlah tagihan:</p>
          <div className="flex flex-col gap-4 items-center md:flex-row">
            <div className="w-full md:w-fit">
              <Input
                crossOrigin={undefined}
                type="text"
                value={"Rp 1.000.000"}
                disabled={true}
                size="lg"
              />
            </div>

            <Button
              fullWidth={true}
              className="min-w-40 max-w-40 flex-1 bg-success-400 lg:py-3 lg-mr-100"
              placeholder={undefined}
            >
              <p className="text-caption font-bold text-white text-center lg:text-body2">Bayar</p>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxPaymentPage;
