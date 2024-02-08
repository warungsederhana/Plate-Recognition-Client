"use client";
import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DashboardNavbar from "../../../../components/DashboardNavbar";

const EditProfilePage = () => {
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nik, setNik] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSimpan = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const data = {
      nama,
      email,
      nik,
      alamat,
    };

    axios
      .put("http://localhost:3344/api/users/profile", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        router.push("/dashboard/scan");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://localhost:3344/api/users/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const { nama, email, nik, alamat } = res.data.data;
        setNama(nama);
        setEmail(email);
        setNik(nik);
        setAlamat(alamat);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <DashboardNavbar />
      <section className="mx-auto w-full h-full min-h-max flex flex-col items-center gap-2 px-8 mb-16 lg:px-28">
        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <Input
              crossOrigin={undefined}
              type="text"
              label="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>

          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <Input
              crossOrigin={undefined}
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>

          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <Input
              crossOrigin={undefined}
              type="text"
              label="NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <div className="w-64 lg:w-96">
            <Textarea label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <Button
            fullWidth={false}
            loading={isLoading}
            className="max-w-40 bg-primary-500 lg:py-3"
            placeholder={undefined}
            onClick={() => router.back()}
          >
            <p className="text-caption lg:text-body2 font-bold text-white">Batal</p>
          </Button>

          <Button
            fullWidth={false}
            loading={isLoading}
            className="max-w-40 bg-primary-500 lg:py-3"
            placeholder={undefined}
            onClick={(e) => handleSimpan(e)}
          >
            <p className="text-caption lg:text-body2 font-bold text-white">Simpan</p>
          </Button>
        </div>
      </section>
    </>
  );
};

export default EditProfilePage;
