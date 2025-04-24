'use client';

import { useTranslate } from '@tolgee/react';
import { ArrowRight } from 'lucide-react';
import { useProductCategories } from 'medusa-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function Categories() {
  const t = useTranslations();
  const { t: tTolgee } = useTranslate();

  const { product_categories, isLoading } = useProductCategories({
    limit: 4,
    parent_category_id: 'null',
    expand: 'products',
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded-md bg-muted"></div>
            <div className="h-4 w-48 animate-pulse rounded-md bg-muted"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-32 animate-pulse bg-muted sm:h-40"></div>
              <CardContent className="space-y-2 p-3 sm:p-4">
                <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
                <div className="h-3 w-16 animate-pulse rounded bg-muted"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{t('home.categories.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('home.categories.description')}</p>
        </div>
        <Link href="/products" className="hidden sm:inline-flex">
          <Button variant="ghost" className="gap-1 text-sm sm:gap-2 sm:text-base">
            {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {product_categories?.map(category => (
          <Link key={category.id} href={`/products?category_id=${category.id}`} className="group">
            <Card className="overflow-hidden">
              <div className="relative h-32 sm:h-40">
                <Image
                  src={category.image || '/images/placeholder.png'}
                  alt={category.name}
                  fill
                  priority
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="p-3 sm:p-4">
                <h3 className="text-sm font-semibold sm:text-base">
                  {tTolgee(`${category.id}.name`)}
                </h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {category.products?.length || 0} {t('home.categories.productCount')}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
