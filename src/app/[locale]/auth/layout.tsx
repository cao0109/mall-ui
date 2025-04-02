'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { BrandIntro } from '@/components/auth/brand-intro';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isRegisterPage = pathname.includes('/auth/register');
  const role = isRegisterPage
    ? (searchParams.get('role') as 'vendor' | 'seller') || 'seller'
    : undefined;

  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <BrandIntro role={role} />
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
