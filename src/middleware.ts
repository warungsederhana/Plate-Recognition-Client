import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token");

  if (accessToken) {
    const token = "Bearer " + accessToken?.value;
    try {
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const verifyTokenURL = "http://localhost:3344/api/auth/verify-token";
      const res = await fetch(verifyTokenURL, requestOption);
      const resData = await res.json();

      // Jika token tidak valid, alihkan ke login
      if (!resData?.success) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
      }

      // Jika sudah login, tidak boleh mengakses halaman sign-in dan sign-up
      if (pathname === "/auth/signin" || pathname === "/auth/signup") {
        return NextResponse.redirect(new URL("/dashboard/scan", request.url));
      }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  } else if (pathname.startsWith("/dashboard")) {
    // Jika tidak ada token dan pathname adalah dashboard, alihkan ke login
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Lanjutkan ke middleware berikutnya
  return NextResponse.next();
}
