'use client';

import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { SectionHeader } from '@/components/home/section-header';
import { PriceDisplay } from '@/components/products/price-display';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricedProduct } from '@/types/product';

interface ProductsProps {
  hotProducts: PricedProduct[];
  newProducts: PricedProduct[];
}

export default function Products({ hotProducts, newProducts }: ProductsProps) {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState('hot');

  const renderProductList = (products: PricedProduct[], type: 'hot' | 'new') => {
    const isHot = type === 'hot';

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative min-h-[500px] overflow-hidden rounded-2xl">
          {/* 主打商品特色展示 */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/60" />

          {products[0] && (
            <>
              <Image
                src={products[0].thumbnail || ''}
                alt={products[0].title || ''}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                <div className="mb-2 flex items-center">
                  {isHot ? (
                    <Star className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5 text-blue-400" />
                  )}
                  <span className="text-sm font-medium">{isHot ? '爆款推荐' : '新品上市'}</span>
                </div>

                <h3 className="mb-3 text-xl font-bold">{products[0].title}</h3>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">
                    <PriceDisplay prices={products[0].variants[0].prices} />
                  </div>

                  <Link href={`/products/${products[0].id}`}>
                    <Button className="border-white/40 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {products.slice(1, 5).map(product => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="flex h-32 overflow-hidden rounded-xl bg-muted/50 transition-colors hover:bg-muted">
                <div className="relative h-full w-32 flex-shrink-0">
                  <Image
                    src={product.thumbnail || ''}
                    alt={product.title || ''}
                    fill
                    className="object-cover"
                  />
                  {isHot ? (
                    <div className="absolute left-1 top-1 rounded bg-yellow-500/90 px-1.5 py-0.5 text-[10px] text-white">
                      热门
                    </div>
                  ) : (
                    <div className="absolute left-1 top-1 rounded bg-blue-500/90 px-1.5 py-0.5 text-[10px] text-white">
                      新品
                    </div>
                  )}
                </div>

                <div className="flex flex-grow flex-col justify-between p-3">
                  <h3 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="font-semibold">
                      <PriceDisplay prices={product.variants[0].prices} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      加入选品
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title={selectedTab === 'hot' ? t('home.products.hot.title') : t('home.products.new.title')}
        subtitle={
          selectedTab === 'hot' ? t('home.products.hot.subtitle') : t('home.products.new.subtitle')
        }
        action={{
          label: t('home.products.viewMore'),
          onClick: () => {},
        }}
      />

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mx-auto mb-6 w-full max-w-md">
          <TabsTrigger value="hot" className="flex-1">
            {t('home.products.hot.title')}
          </TabsTrigger>
          <TabsTrigger value="new" className="flex-1">
            {t('home.products.new.title')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hot" className="mt-0 animate-in fade-in-50">
          {renderProductList(hotProducts, 'hot')}
        </TabsContent>

        <TabsContent value="new" className="mt-0 animate-in fade-in-50">
          {renderProductList(newProducts, 'new')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
