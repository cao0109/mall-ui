import { Analytics } from '@vercel/analytics/next';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { ThemeProvider } from 'next-themes';

// import { CookieBanner } from '@/components/cookie/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { AccessibilityProvider } from '@/components/providers/accessibility-provider';
import { LiveRegionProvider } from '@/components/providers/live-region-provider';
import { LoadingProvider } from '@/components/providers/loading-provider';
import { SkipToContent } from '@/components/skip-to-content';
import { Toaster } from '@/components/ui/toaster';
import { routing } from '@/i18n/routing';
import { MedusaWrapper } from '@/lib/medusa-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'HiDoo - 跨境分销生态平台',
  description: '为全球供应商和分销商搭建高效的跨境电商贸易平台，提供一站式选品和供应链解决方案',
  keywords: ['电商', '商城', '在线购物', '批发', '零售'],
  authors: [{ name: 'HiDoo Team' }],
  robots: 'index, follow',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
      type: 'image/x-icon',
    },
  ],
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
      <head>
        <meta name="theme-color" content="hsl(var(--background))" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <LiveRegionProvider>
              <MedusaWrapper>
                <NextIntlClientProvider>
                  <SkipToContent />
                  <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main id="main-content" className="flex-1 p-4 sm:p-6" tabIndex={-1}>
                      {children}
                      <Analytics />
                    </main>
                    <Footer />
                  </div>
                  <LoadingProvider />
                  <Toaster />
                  {/*<CookieBanner />*/}
                </NextIntlClientProvider>
              </MedusaWrapper>
            </LiveRegionProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
