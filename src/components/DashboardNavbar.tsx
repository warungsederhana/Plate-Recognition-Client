"use client";
import React from "react";
import { Navbar, Collapse, Typography, IconButton, NavbarProps } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";

const DashboardNavbar = () => {
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
          <p className="font-bold text-info-100 text-body2 lg:text-body1">Hello, User</p>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardNavbar;
