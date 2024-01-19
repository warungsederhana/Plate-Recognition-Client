"use client";

import React from "react";
import Image from "next/image";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <section className="flex flex-wrap w-full min-h-screen">
        {/* Div kiri */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-8 md:p-16">
          <Card
            placeholder={undefined}
            color="transparent"
            shadow={false}
            className="w-full max-w-md"
          >
            <h1 className="font-bold text-header6 lg:text-header5 text-primary-700">
              Selamat Datang
            </h1>
            <h1 className="font-bold text-header6 lg:text-header5 text-primary-700">
              Silahkan Sign In ke Akun Anda
            </h1>
            <form className="mt-8 mb-2 w-full">
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  crossOrigin={undefined}
                  type="email"
                  label="Email"
                  value={email}
                  size="lg"
                  placeholder="example@email.com"
                />

                <Input
                  crossOrigin={undefined}
                  type="password"
                  label="Password"
                  value={password}
                  size="lg"
                  placeholder="********"
                />
              </div>

              <Button size="lg" className="mt-6 bg-primary-700" fullWidth placeholder={undefined}>
                Login
              </Button>

              <p className="mt-4 text-center text-body2 text-neutrals-500">
                Belum memiliki akun?{" "}
                <Link href="/signup" className="hover:text-primary-700 hover:font-bold">
                  Ayo Daftar
                </Link>
              </p>

              <Button
                size="lg"
                className="mt-6 bg-white flex flex-row justify-center items-center"
                fullWidth
                placeholder={undefined}
              >
                <Image
                  className="m-0 p-0"
                  src={"/img/google-logo.png"}
                  alt={"Logo google"}
                  width={24}
                  height={24}
                />
                <p className="text-neutrals-800">Google</p>
              </Button>
            </form>
          </Card>
        </div>

        {/* Div kanan */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center bg-primary-700 p-8 md:p-16">
          <Image
            src="/img/login-img.svg"
            alt="Login page image"
            width={500}
            height={500}
            className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
          />
        </div>
      </section>
    </>
  );
};

export default SignInPage;
