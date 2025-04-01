'use client';

import { PricedProduct } from '@/types/product';
import { Package } from 'lucide-react';
import { useProduct } from 'medusa-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ProductBreadcrumb } from './product-breadcrumb';
import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';
import { ProductTabs } from './product-tabs';

export function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const { product, isLoading, error } = useProduct(productId);
  const t = useTranslations('product.detail');

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto max-w-7xl py-8">
        <div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            {t('loadingFailed')}: {error?.message || t('productNotFound')}
          </p>
        </div>
      </div>
    );
  }

  const pricedProduct = product as PricedProduct;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-8">
        <ProductBreadcrumb product={pricedProduct} />

        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-2 md:gap-12">
          {/* 左侧图片区域 */}
          <div className="sticky top-4 h-fit">
            <ProductGallery images={pricedProduct.images || []} title={pricedProduct.title} />
          </div>

          {/* 右侧信息区域 */}
          <div className="flex flex-col">
            <ProductInfo product={pricedProduct} />
          </div>
        </div>

        {/* 底部标签页区域 */}
        <ProductTabs product={pricedProduct} />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl py-8">
        <div className="animate-pulse space-y-8">
          {/* 面包屑导航骨架屏 */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-16 rounded bg-muted"></div>
            <div className="h-4 w-4 rounded bg-muted"></div>
            <div className="h-4 w-16 rounded bg-muted"></div>
            <div className="h-4 w-4 rounded bg-muted"></div>
            <div className="h-4 w-24 rounded bg-muted"></div>
          </div>

          {/* 商品内容骨架屏 */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="sticky top-4 h-fit space-y-6">
              <div className="aspect-square rounded-xl bg-muted"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-lg bg-muted"></div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-full rounded bg-muted"></div>
              </div>
              <div className="space-y-4">
                <div className="h-10 w-1/3 rounded bg-muted"></div>
                <div className="flex gap-4">
                  <div className="h-6 w-16 rounded bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
