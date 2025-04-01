import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BrandIntro() {
  const t = useTranslations('auth.login.brand');

  return (
    <div className="hidden flex-col justify-center space-y-8 lg:flex">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {t('loginStatus')}
        </div>
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 xl:text-4xl">
          {t('welcome')}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="grid gap-4">
        <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-base font-semibold">{t('feature1.title')}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {t('feature1.description')}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-base font-semibold">{t('feature2.title')}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {t('feature2.description')}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-base font-semibold">{t('feature3.title')}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {t('feature3.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
