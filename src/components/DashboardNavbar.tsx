"use client";
import React, { useEffect, useState } from "react";
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
        <Sidebar />

        <div>
          <p className="font-bold text-info-100 text-body2 lg:text-body1">Hello, {nama}</p>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
