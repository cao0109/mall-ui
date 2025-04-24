'use client';

import Link from 'next/link';

import { useAuthStore } from '@/store/auth';

import { Button } from '../ui/button';

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function WelcomeSection({ title, subtitle, description }: WelcomeSectionProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="py-8 md:py-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl text-primary">{subtitle}</p>
        <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        {!isAuthenticated && (
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/auth/register" passHref>
              <Button size="lg">开店赚钱</Button>
            </Link>
            <Link href="/auth/login" passHref>
              <Button size="lg" variant="outline">
                商家登录
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
