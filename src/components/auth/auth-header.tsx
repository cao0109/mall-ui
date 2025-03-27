"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthHeader() {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/auth/register";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">HD</span>
          </div>
          <span className="font-semibold text-xl">HiDoo</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-sm text-muted-foreground">
            {isRegisterPage ? "已有账号？" : "还没有账号？"}
          </div>
          <Link
            href={isRegisterPage ? "/auth/login" : "/auth/register"}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            {isRegisterPage ? "立即登录" : "免费注册"}
          </Link>
        </div>
      </div>
    </div>
  );
}
