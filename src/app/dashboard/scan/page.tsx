"use client";
import React from "react";
import CustomDropZone from "@/components/CustomDropZone";
import { Input, Button } from "@material-tailwind/react";
import { FileWithPath } from "react-dropzone";
import { useState } from "react";
import DashboardNavbar from "../../../components/DashboardNavbar";

const ScanPage = () => {
  const [hasFile, setHasFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (filePresent: boolean) => {
    setHasFile(filePresent);
  };

  // Mock the upload function
  const handleUpload = async (file: FileWithPath) => {
    // Set uploading to true
    setIsUploading(true);

    // Replace this timeout with your actual upload logic
    try {
      // Mock API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // If the upload is successful, you might want to clear the file or display a success message
      console.log("File uploaded successfully:", file);
    } catch (error) {
      // Handle any errors here
      console.error("Upload failed:", error);
    } finally {
      // Set uploading to false
      setIsUploading(false);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <section className="mx-auto w-full h-full min-h-screen flex flex-col gap-2 px-8 mb-16 items-center lg:px-28">
        {/* SECTION 1 */}
        <div className="w-full flex flex-col gap-2 pt-6 ">
          <h1 className="flex-1 font-bold text-header5 text-primary-700">AI Plate Recognition</h1>
          <p className="flex-1 font-regular text-body1 text-black text-justify">
            Unggah gambar plat kendaraan Anda untuk mendeteksi otomatis dengan layanan AI Plate
            Recognition kami, memudahkan identifikasi nomor plat secara cepat dan efisien. Kami
            berkomitmen memberikan pengalaman pengguna yang aman dan nyaman melalui teknologi
            terkini dalam sistem kami.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="w-full flex flex-col py-2 pb-4">
          <h1 className="flex-1 font-bold text-header5 text-primary-700 pb-2">Upload Gambar</h1>
          {/* className="p-16 border border-red-500" */}
          <CustomDropZone
            className="lg:py-24"
            onFileChange={handleFileChange}
            onUpload={handleUpload}
          />
        </div>

        {/* SECTION 3 */}
        <div className="w-full flex flex-col flex-1 mb-8">
          <h1 className="flex-1 font-bold text-header5 text-primary-700 pb-2">Hasil Scan</h1>
          <p className="flex-1 font-regular text-body1 text-black text-justify mb-4">
            Masukkan NIK pemilik kendaraan untuk melihat detail dari kendaraan
          </p>

          <div className="flex flex-col gap-6 w-full px-4 pb-4">
            <Input
              crossOrigin={undefined}
              type="text"
              label="Plat Nomor Kendaraan"
              value={"B **** RKE"}
              disabled={true}
              size="lg"
              placeholder="B **** RKE"
              className="md:w-3/12"
            />

            <div className="flex flex-col gap-4 w-full max-w-md items-center md:flex-row ">
              <Input
                crossOrigin={undefined}
                type="text"
                label="NIK Pemilik Kendaraan"
                value={""}
                size="lg"
                placeholder="31067**********"
              />
              <Button
                fullWidth={false}
                className="max-w-40 bg-primary-500 lg:py-3"
                placeholder={undefined}
              >
                <p className="text-caption lg:text-body2 font-bold text-white">Upload</p>
              </Button>
            </div>

            <div className="flex flex-col gap-4 w-full items-center md:flex-row ">
              <div className="flex flex-1 gap-2 flex-col">
                <p>Pemilik Kendaraan</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Nama Pemilik Kendaraan"
                  value={"Calvindoro"}
                  disabled={true}
                  size="lg"
                  placeholder="User"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>

              <div className="flex flex-1 gap-2 flex-col">
                <p>Jenis Kendaraan</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Jenis Kendaraan"
                  value={"SUV"}
                  disabled={true}
                  size="lg"
                  placeholder="Sedan"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full items-center md:flex-row ">
              <div className="flex flex-1 gap-2 flex-col">
                <p>Nama Kendaraan</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Nama Kendaraan"
                  value={"Fortuner"}
                  disabled={true}
                  size="lg"
                  placeholder="Accord"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>
              <div className="flex flex-1 gap-2 flex-col">
                <p>Nomor Rangka</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Nomor Rangka"
                  value={"3587895"}
                  disabled={true}
                  size="lg"
                  placeholder="3587895"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full items-center md:flex-row ">
              <div className="flex flex-1 gap-2 flex-col">
                <p>Nomor Mesin</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Nomor Mesin"
                  value={"52488756"}
                  disabled={true}
                  size="lg"
                  placeholder="52488756"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>
              <div className="flex flex-1 gap-2 flex-col">
                <p>Tagihan Pajak</p>
                <Input
                  crossOrigin={undefined}
                  type="text"
                  label="Tagihan Pajak"
                  value={`Rp ${1000000}`}
                  disabled={true}
                  size="lg"
                  placeholder="Rp 1000000"
                  className="max-w-80 min-w-72 flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScanPage;
