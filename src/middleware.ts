import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;
  console.log(`Pathname: ${pathname}`);

  // Jika ada access token dan request ke halaman auth
  if (accessToken) {
    const token = "Bearer " + accessToken;
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

      // Jika token tidak valid atau tidak ada
      if (!resData.success) {
        // Menghapus cookie dengan mengatur ulang
        const response = NextResponse.redirect(new URL("/auth/signin", request.url));
        response.headers.append(
          "Set-Cookie",
          serialize("access_token", "", {
            path: "/",
            expires: new Date(0), // tanggal di masa lalu untuk menghapus cookie
          })
        );
        return response;
      }

      // Jika sudah login, tidak boleh mengakses halaman sign-in dan sign-up
      if (pathname === "/auth/signin" || pathname === "/auth/signup" || pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard/scan", request.url));
      }
    } catch (error) {
      console.error(error);
      // Menghapus cookie jika terjadi error saat verifikasi
      const response = NextResponse.redirect(new URL("/auth/signin", request.url));
      localStorage.removeItem("access_token");
      response.headers.append(
        "Set-Cookie",
        serialize("access_token", "", {
          path: "/",
          expires: new Date(0), // tanggal di masa lalu untuk menghapus cookie
        })
      );
      return response;
    }
  }

  // Jika tidak ada token dan mencoba mengakses halaman dashboard
  if (!accessToken && pathname.startsWith("/dashboard")) {
    // Redirect ke halaman login
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Untuk semua request lain, lanjutkan tanpa perubahan
  return NextResponse.next();
}
