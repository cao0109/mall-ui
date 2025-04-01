import { ArrowRight, BarChart3, Building2, Globe2, Store, Truck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface BrandIntroProps {
  role?: 'vendor' | 'seller';
}

export function BrandIntro({ role }: BrandIntroProps) {
  const pathname = usePathname();
  const isRegisterPage = pathname.includes('/auth/register');
  const t = useTranslations(isRegisterPage ? 'auth.register.brand' : 'auth.login.brand');

  if (isRegisterPage) {
    return (
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t(`${role}.status`)}
          </div>
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 xl:text-4xl">
            {t('title')}
            <br />
            {t(`${role}.subtitle`)}
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {t(`${role}.description`)}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
              {role === 'vendor' ? (
                <Truck className="h-6 w-6 text-primary" />
              ) : (
                <Store className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 truncate text-base font-semibold">
                {t(`${role}.features.0.title`)}
              </h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {t(`${role}.features.0.description`)}
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 truncate text-base font-semibold">
                {t(`${role}.features.1.title`)}
              </h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {t(`${role}.features.1.description`)}
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 truncate text-base font-semibold">
                {t(`${role}.features.2.title`)}
              </h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {t(`${role}.features.2.description`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {t('status')}
        </div>
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 xl:text-4xl">
          {t('title')}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="grid gap-4">
        {[
          { icon: Globe2, index: 0 },
          { icon: Users, index: 1 },
          { icon: BarChart3, index: 2 },
        ].map(({ icon: Icon, index }) => (
          <div
            key={index}
            className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 truncate text-base font-semibold">
                {t(`features.${index}.title`)}
              </h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {t(`features.${index}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
