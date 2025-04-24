'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PricedProduct } from '@/types/product';

import { PriceDisplay } from '../products/price-display';

interface ProductCardProps {
  product: PricedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className={cn('group overflow-hidden')}>
        {/* 商品图片 */}
        <div className="relative">
          <Image
            src={product.thumbnail || ''}
            alt={product.title || ''}
            width={1}
            height={1}
            layout="responsive"
            className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
          />
          {/* 收藏按钮 */}
          <div className="absolute right-2 top-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white sm:h-8 sm:w-8"
            >
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* 商品信息 */}
        <CardContent className="space-y-2 p-2.5 sm:p-4">
          {/* 商品名称 */}
          <h3 className="line-clamp-2 min-h-[32px] text-sm font-medium sm:min-h-[40px] sm:text-base">
            {product.title}
          </h3>

          {/* 价格和利润率 */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <PriceDisplay prices={product.variants[0].prices} />
              <span className="text-[10px] text-muted-foreground sm:text-xs">/件</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
