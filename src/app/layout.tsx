import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { Toaster } from "@/components/ui/toaster";
import { MedusaWrapper } from "@/lib/medusa-provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiDoo Mall",
  description: "HiDoo Mall - Your One-Stop Shopping Destination",
  keywords: ["电商", "商城", "在线购物", "批发", "零售"],
  authors: [{ name: "HiDoo Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <MedusaWrapper>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 p-4 sm:p-6">{children}</main>
            <Footer />
          </div>
          <LoadingProvider />
          <Toaster />
        </MedusaWrapper>
      </body>
    </html>
  );
}
