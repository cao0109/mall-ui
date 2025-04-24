'use client';

import { useTranslations } from 'next-intl';

import { PricedProduct } from '@/types/product';

import { ProductBreadcrumb } from './product-breadcrumb';
import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';
import { ProductTabs } from './product-tabs';
import { RecommendedProducts } from './recommended-products';

interface ProductDetailProps {
  product: PricedProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations('product.detail');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-8">
        <ProductBreadcrumb product={product} />

        <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-2 md:gap-12">
          {/* 左侧图片区域 */}
          <div className="sticky top-4 h-fit">
            <ProductGallery images={product.images || []} title={product.title} />
          </div>

          {/* 右侧信息区域 */}
          <div className="flex flex-col">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* 底部推荐商品和标签页区域 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8">
          {/* 左侧推荐商品列表 */}
          <div className="md:col-span-1">
            <RecommendedProducts
              collection_id={product.collection_id}
              categories={product.categories?.map(cat => cat.id) || []}
            />
          </div>

          {/* 右侧产品标签页 */}
          <div className="md:col-span-3">
            <ProductTabs product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
