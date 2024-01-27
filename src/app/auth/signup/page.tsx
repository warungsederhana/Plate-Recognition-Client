"use client";

import React from "react";
import Image from "next/image";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordInput from "@/components/PasswordInput";
import { loginWithGoogle, register } from "@/lib/firebase/services";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "nookies";

interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [nama, setNama] = React.useState("");
  const [namaError, setNamaError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

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

  const isValidNama = (nama: string) => {
    if (nama.length === 0) {
      setNamaError("Nama tidak boleh kosong.");
      return false;
    }

    setNamaError("");
    return true;
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    if (
      !isValidNama(nama) ||
      !isValidEmail(email) ||
      !isValidPassword(password) ||
      !isValidConfirmPassword(confirmPassword)
    ) {
      setIsLoading(false);
      return;
    }
    const user: RegisterUser = { email, password, confirmPassword };

    try {
      const res = await register(user.email, user.password, user.confirmPassword);
      if (res.success === false) {
        if (res.errorCode === "auth/email-already-in-use") {
          toast.error("Email sudah terdaftar.");
          setEmailError("Email sudah terdaftar.");
        }
        setIsLoading(false);
        return;
      }
      const data = {
        id: res.data?.id,
        email: email,
        nama: nama,
      };

      await axios.post("http://localhost:3344/api/auth/signup", data);
      setIsLoading(false);
      toast.success("Berhasil membuat akun.");
      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleRegisterWithGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await loginWithGoogle();

      if (res?.success === false) {
        setIsLoading(false);
        toast.error("Gagal membuat akun.");
        return;
      }

      const data = {
        id: res?.data?.id,
        email: res?.data?.email,
        nama: res?.data?.displayName,
      };

      localStorage.setItem("access_token", `Bearer ${res?.data?.token}`);
      setCookie(null, "access_token", res?.data?.token || "", {
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        path: "/",
      });

      await axios.post("http://localhost:3344/api/auth/signup", data);

      setIsLoading(false);
      router.push("/dashboard/scan");
      toast.success("Berhasil membuat akun.");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-wrap w-full h-screen">
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
              <div className="mb-1 flex flex-col gap-4">
                <div>
                  <Input
                    crossOrigin={undefined}
                    type="text"
                    label="Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    size="lg"
                    placeholder="nama lengkap user"
                  />
                  <p className="text-overline text-danger-500 px-2 mt-1">
                    {namaError ? namaError : null}
                  </p>
                </div>
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
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Loading..." : "Register"}
              </Button>

              <p className="mt-4 text-center text-body2 text-neutrals-500">
                Sudah memiliki akun?{" "}
                <Link href="/auth/signin" className="hover:text-primary-700 hover:font-bold">
                  Ayo Masuk
                </Link>
              </p>

              <Button
                size="lg"
                className="mt-6 bg-white flex flex-row justify-center items-center"
                fullWidth
                placeholder={undefined}
                disabled={isLoading ? true : false}
                onClick={(e) => handleRegisterWithGoogle(e)}
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
