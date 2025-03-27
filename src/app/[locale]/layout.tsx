import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { Toaster } from "@/components/ui/toaster";
import { routing } from "@/i18n/routing";
import { MedusaWrapper } from "@/lib/medusa-provider";
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <MedusaWrapper>
          <NextIntlClientProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 p-4 sm:p-6">{children}</main>
              <Footer />
            </div>
            <LoadingProvider />
            <Toaster />
          </NextIntlClientProvider>
        </MedusaWrapper>
      </body>
    </html>
  );
}
