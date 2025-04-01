import { ArrowRight, Building2, Store, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BrandIntroProps {
  role: 'vendor' | 'seller';
}

export function BrandIntro({ role }: BrandIntroProps) {
  const t = useTranslations('auth.register.brand');

  return (
    <div className="sticky top-8 flex flex-col justify-center space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {role === 'vendor' ? t('vendorTitle') : t('sellerTitle')}
        </div>
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 xl:text-4xl">
          {t('joinHiDoo')}
          <br />
          {role === 'vendor' ? t('vendorSubtitle') : t('sellerSubtitle')}
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          {role === 'vendor' ? t('vendorDescription') : t('sellerDescription')}
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
              {role === 'vendor' ? t('vendorFeature1.title') : t('sellerFeature1.title')}
            </h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {role === 'vendor'
                ? t('vendorFeature1.description')
                : t('sellerFeature1.description')}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-base font-semibold">
              {role === 'vendor' ? t('vendorFeature2.title') : t('sellerFeature2.title')}
            </h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {role === 'vendor'
                ? t('vendorFeature2.description')
                : t('sellerFeature2.description')}
            </p>
          </div>
        </div>

        <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900/90">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
            <ArrowRight className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-base font-semibold">
              {role === 'vendor' ? t('vendorFeature3.title') : t('sellerFeature3.title')}
            </h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {role === 'vendor'
                ? t('vendorFeature3.description')
                : t('sellerFeature3.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
