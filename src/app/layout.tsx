import { Footer } from "@/components/layout/footer";
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
        <div className="flex min-h-screen flex-col">
          <MedusaWrapper>
            <main className="flex-1">{children}</main>
          </MedusaWrapper>
          <Footer />
        </div>
        <LoadingProvider />
        <Toaster />
      </body>
    </html>
  );
}
