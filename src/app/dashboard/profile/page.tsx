"use client";
import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfilePage = () => {
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nik, setNik] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const router = useRouter();

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
      <section className="mx-auto w-full h-full min-h-max flex flex-col items-center gap-2 px-8 mb-16 lg:px-28">
        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <p>Nama</p>
            <Input
              crossOrigin={undefined}
              type="text"
              label="Plat Nomor Kendaraan"
              value={nama}
              disabled={true}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>

          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <p>Email</p>
            <Input
              crossOrigin={undefined}
              type="text"
              label="Plat Nomor Kendaraan"
              value={email}
              disabled={true}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>

          <div className="flex flex-col gap-2 w-64 lg:w-72">
            <p>NIK</p>
            <Input
              crossOrigin={undefined}
              type="text"
              label="Plat Nomor Kendaraan"
              value={nik}
              disabled={true}
              size="lg"
              placeholder="B **** RKE"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <div className="w-64 lg:w-96">
            <p>Alamat</p>
            <Textarea disabled={true} value={alamat} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 pt-6 lg:justify-normal lg:flex-row lg:gap-6">
          <Button
            fullWidth={false}
            className="max-w-40 bg-primary-500 lg:py-3"
            placeholder={undefined}
            onClick={() => router.push("/dashboard/profile/edit")}
          >
            <p className="text-caption lg:text-body2 font-bold text-white">Edit Profile</p>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
