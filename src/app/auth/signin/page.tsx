"use client";

import React from "react";
import Image from "next/image";
import { Card, Input, Button } from "@material-tailwind/react";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import { login, loginWithGoogle } from "@/lib/firebase/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthError } from "firebase/auth";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

interface LoginUser {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
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

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!isValidEmail(email) || !isValidPassword(password)) {
      setIsLoading(false);
      return;
    }
    const user: LoginUser = { email, password };

    try {
      const token = await login(user.email, user.password);
      console.log(token);

      localStorage.setItem("access_token", `Bearer ${token}`);
      setCookie(null, "access_token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        path: "/",
      });

      setIsLoading(false);
      router.push("/dashboard/scan");
      toast.success("Login berhasil.");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        let errorMessage = "Terjadi kesalahan saat login.";

        // Menyesuaikan pesan error berdasarkan kode error
        switch ((error as AuthError).code) {
          case "auth/invalid-credential":
            errorMessage = "Kredensial tidak valid.";
            break;
          case "auth/invalid-email":
            errorMessage = "Email yang dimasukkan tidak valid.";
            break;
          case "auth/user-disabled":
            errorMessage = "Akun pengguna telah dinonaktifkan.";
            break;
          case "auth/user-not-found":
            errorMessage = "Pengguna tidak ditemukan.";
            break;
          case "auth/wrong-password":
            errorMessage = "Password salah.";
            break;
          default:
            errorMessage = error.message; // Pesan default dari Firebase
        }

        // Menampilkan toast dengan pesan error yang telah disesuaikan
        toast.error(errorMessage);
      }
    }
  };

  const handleLoginWithGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await loginWithGoogle();

      if (res?.success === false) {
        setIsLoading(false);
        toast.error("Gagal login.");
        return;
      }

      localStorage.setItem("access_token", `Bearer ${res?.data?.token}`);
      setCookie(null, "access_token", res?.data?.token || "", {
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        path: "/",
      });

      setIsLoading(false);
      router.push("/dashboard/scan");
      toast.success("Login berhasil.");
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
              Silahkan Sign In ke Akun Anda
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

                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  error={passwordError}
                />
              </div>

              <Button
                size="lg"
                className="mt-6 bg-primary-700"
                fullWidth={true}
                placeholder={undefined}
                disabled={isLoading ? true : false}
                onClick={(e) => handleLogin(e)}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>

              <p className="mt-4 text-center text-body2 text-neutrals-500">
                Belum memiliki akun?{" "}
                <Link href="/auth/signup" className="hover:text-primary-700 hover:font-bold">
                  Ayo Daftar
                </Link>
              </p>

              <Button
                size="lg"
                className="mt-6 bg-white flex flex-row justify-center items-center"
                fullWidth
                placeholder={undefined}
                disabled={isLoading ? true : false}
                onClick={(e) => handleLoginWithGoogle(e)}
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
