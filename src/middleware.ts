import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 不需要登录的路由
const publicRoutes = [
  "/auth/login", 
  "/auth/register",
  "/",
  "/products",
  "/products/(.*)", // 允许访问所有产品详情页
  "/categories",
];

// 需要登录的路由
const protectedRoutes = [
  "/my-stores/(.*)",
  "/selected-products",
  "/profile",
  "/settings",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // 如果是公开路由且已登录，重定向到首页
  if (publicRoutes.includes(pathname) && token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 如果是受保护路由且未登录，重定向到登录页
  if (protectedRoutes.some(route => pathname.match(route)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}; 