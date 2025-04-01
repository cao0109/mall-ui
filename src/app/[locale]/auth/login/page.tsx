'use client';

import { BrandIntro } from '@/components/auth/login/brand-intro';
import { LoginForm } from '@/components/auth/login/login-form';

export default function LoginPage() {
  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <BrandIntro />
        <LoginForm />
      </div>
    </div>
  );
}
