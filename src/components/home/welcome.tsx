import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth';

import { Button } from '../ui/button';

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function WelcomeSection({ title, subtitle, description }: WelcomeSectionProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  return (
    <section className="py-8 md:py-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl text-primary">{subtitle}</p>
        <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
        {!isAuthenticated && (
          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg" onClick={() => router.push('/auth/register')}>
              开店赚钱
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/auth/login')}>
              商家登录
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
