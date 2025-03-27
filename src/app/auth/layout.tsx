"use client";

import { AuthHeader } from "@/components/auth/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AuthHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
}
