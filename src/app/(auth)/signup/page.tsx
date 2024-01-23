"use client";

import React from "react";
import Image from "next/image";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";
import toast from "react-toastify";
import PasswordInput from "@/components/PasswordInput";
import { loginWithGoogle, register } from "@/lib/firebase/services";

interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;

    if (email.length === 0) {
      setEmailError("Email tidak boleh kosong.");
      return false;
    }

    if (!regex.test(email)) {
      setEmailError("Email tidak valid.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;]).{8,}$/;

    if (password.length === 0) {
      setPasswordError("Password tidak boleh kosong.");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password harus memiliki minimal 8 karakter.");
      return false;
    }

    if (!regex.test(password)) {
      setPasswordError("Password harus mengandung huruf kapital, angka, dan karakter spesial.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const isValidConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordError("Konfirmasi password tidak boleh kosong.");
      return false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Password tidak sama.");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isValidConfirmPassword(confirmPassword)
    ) {
      return;
    }
    const user: RegisterUser = { email, password, confirmPassword };
    console.log(user);

    try {
      register(user.email, user.password, user.confirmPassword);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
                <div>
                  <Input
                    crossOrigin={undefined}
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    placeholder="example@email.com"
                  />
                  <p className="text-overline text-danger-500 px-2 mt-1">
                    {emailError ? emailError : null}
                  </p>
                </div>
                <div>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    error={passwordError}
                  />
                </div>
                <div>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    error={confirmPasswordError}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="mt-6 bg-primary-700"
                fullWidth
                placeholder={undefined}
                onClick={(e) => handleRegister(e)}
                loading={isLoading}
              >
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
                onClick={loginWithGoogle}
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
