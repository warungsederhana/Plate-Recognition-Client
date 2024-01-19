"use client";

import React from "react";
import Image from "next/image";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";

const SignUpPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

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
              Sign Up untuk Membuat Akun
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

                <Input
                  crossOrigin={undefined}
                  type="password"
                  label="Confirmation Password"
                  value={confirmPassword}
                  size="lg"
                  placeholder="********"
                />
              </div>

              <Button size="lg" className="mt-6 bg-primary-700" fullWidth placeholder={undefined}>
                Register
              </Button>

              <p className="mt-4 text-center text-body2 text-neutrals-500">
                Sudah memiliki akun?{" "}
                <Link href="/signin" className="hover:text-primary-700 hover:font-bold">
                  Ayo Masuk
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
            src="/img/sign-up-img.svg"
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

export default SignUpPage;
