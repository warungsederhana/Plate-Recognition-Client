"use client";
import React from "react";
import { Navbar, Collapse, Typography, IconButton, NavbarProps } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 font-bold text-body1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:text-subtitle2 text-primary-700">
      <li className="p-1">
        <Link href="/signin" className="flex items-center hover:text-blue-500 transition-colors">
          Sign In
        </Link>
      </li>
      <li className="p-1">
        <Link href="/signup" className="flex items-center hover:text-blue-500 transition-colors">
          Sign Up
        </Link>
      </li>
    </ul>
  );
}

export default function CustomNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      shadow={false}
      fullWidth={true}
      className="mx-auto w-full px-8 py-3 md:px-16 lg:px-28 bg-info-100"
      blurred={false}
      placeholder={undefined}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href={"/"} className="text-header6 lg:text-header5 text-primary-700 font-bold">
          <div className="flex flex-row items-center">
            <Image src={"/img/app-logo-2.png"} alt={""} width={50} height={50} />
            <h1 className="hidden md:block text-header6 lg:text-header5 text-primary-700 font-bold">
              Plate Recognition
            </h1>
          </div>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          placeholder={undefined}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 " strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 " strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
