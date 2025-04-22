'use client';

import { useProducts } from 'medusa-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';

interface RecommendedProductsProps {
  collection_id?: string | null;
  categories?: string[] | null;
  limit?: number;
}

export function RecommendedProducts({
  collection_id,
  categories,
  limit = 8,
}: RecommendedProductsProps) {
  const t = useTranslations('product');
  const { products, isLoading } = useProducts({
    limit,
    collection_id: collection_id ? [collection_id] : [],
    category_id: categories ? categories : [],
    is_giftcard: false,
  });

  if (isLoading) {
    return <RecommendedProductsSkeleton count={limit} />;
  }

  if (!products?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-4 text-lg font-medium">{t('recommended')}</h3>
      <div className="space-y-4">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
          >
            {product.thumbnail ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={product.thumbnail}
                  alt={product.title || ''}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-md bg-secondary" />
            )}
            <div className="flex-1 space-y-1">
              <h4 className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                {product.title}
              </h4>
              {product.variants[0]?.prices && (
                <p className="text-sm font-medium text-primary">
                  {formatAmount({
                    amount: product.variants[0].prices[0].amount,
                    currency: product.variants[0].prices[0].currency_code,
                  })}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatAmount({ amount, currency }: { amount: number; currency: string }): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function RecommendedProductsSkeleton({ count = 4 }: { count: number }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <Skeleton className="mb-4 h-6 w-32" />
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-2">
            <Skeleton className="h-16 w-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
