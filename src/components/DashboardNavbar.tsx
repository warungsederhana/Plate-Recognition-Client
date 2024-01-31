"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Navbar } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import axios from "axios";

const DashboardNavbar = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://localhost:3344/api/auth/verify-token", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const { id, nama, email, isAdmin } = res.data.data;
        setNama(nama);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <Navbar
      shadow={false}
      fullWidth={true}
      className="mx-auto w-full px-8 py-3 md:px-16 lg:px-28 bg-primary-700"
      blurred={false}
      placeholder={undefined}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="text-header6 lg:text-header5 text-primary-700 font-bold">
          <div className="flex flex-row items-center">
            <Image src={"/img/app-logo-2.png"} alt={""} width={50} height={50} />
            <h1 className="hidden md:block text-header6 lg:text-header5 text-info-100 font-bold">
              Plate Recognition
            </h1>
          </div>
        </div>

        <Sidebar />
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
