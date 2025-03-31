'use client';

import { SectionHeader } from '@/components/home/section-header';
import { ProductCard } from '@/components/product/product-card';
import { products } from '@/lib/data';
import { Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FlashSale() {
  const t = useTranslations();

  return (
    <section className="space-y-6">
      <SectionHeader
        title="限时特惠"
        subtitle="每日精选，限时抢购"
        icon={<Timer className="h-6 w-6 text-red-500" />}
        badge={{ text: 'Flash Sale' }}
        action={{
          label: '查看更多',
          onClick: () => {},
        }}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map(product => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              origin: product.origin || '中国',
              shopUrl: product.shopUrl || `/products/${product.id}`,
              name: t(`home.products.items.${product.shopUrl.split('/').pop()}.name`),
              description: t(`home.products.items.${product.shopUrl.split('/').pop()}.description`),
              price: parseFloat(t(`home.products.items.${product.shopUrl.split('/').pop()}.price`)),
              profitMargin: parseInt(
                t(`home.products.items.${product.shopUrl.split('/').pop()}.profitMargin`)
              ),
              minOrder: parseInt(
                t(`home.products.items.${product.shopUrl.split('/').pop()}.minOrder`)
              ),
              shippingTime: t(
                `home.products.items.${product.shopUrl.split('/').pop()}.shippingTime`
              ),
              supplier: {
                ...product.supplier,
                name: t(`home.products.items.${product.shopUrl.split('/').pop()}.supplier`),
                rating: parseFloat(
                  t(`home.products.items.${product.shopUrl.split('/').pop()}.rating`)
                ),
              },
              suggestedPrice: parseFloat(
                t(`home.products.items.${product.shopUrl.split('/').pop()}.suggestedPrice`)
              ),
            }}
          />
        ))}
      </div>
    </section>
  );
}
