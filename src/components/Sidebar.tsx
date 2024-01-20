"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import CustomNavbar from "./CustomNavbar";

export function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <div
        onClick={openDrawer}
        className="text-header6 lg:text-header5 text-primary-700 font-bold hover:cursor-pointer"
      >
        <div className="flex flex-row items-center">
          <Image src={"/img/app-logo-2.png"} alt={""} width={50} height={50} />
          <h1 className="hidden md:block text-header6 lg:text-header5 text-info-100 font-bold">
            Plate Recognition
          </h1>
        </div>
      </div>

      {/* belum tau overlaynya biar satu halaman */}
      <Drawer overlay={false} placeholder={undefined} open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <div className="flex flex-row items-center">
            <Image src={"/img/app-logo-2.png"} alt={""} width={50} height={50} />
            <p className="text-subtitle2 pl-2 lg:text-subtitle2 text-primary-700 font-bold">
              Plate Recognition
            </p>
          </div>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
            placeholder={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        <List placeholder={undefined}>
          <Link href="/scan">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Image src={"/img/barcode.svg"} alt={""} width={24} height={24} />
              </ListItemPrefix>
              Scan Plat Nomor
            </ListItem>
          </Link>

          <Link href="/tax-payment">
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <Image src={"/img/payment.svg"} alt={""} width={24} height={24} />
              </ListItemPrefix>
              Bayar Pajak
            </ListItem>
          </Link>

          <hr className="my-2 border-blue-gray-50" />

          <ListItem placeholder={undefined}>
            <ListItemPrefix placeholder={undefined}>
              <Image src={"/img/sign-out.svg"} alt={""} width={24} height={24} />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
