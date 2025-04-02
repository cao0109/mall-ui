'use client';

import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
// import { useSelectionStore } from "@/store/selection";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  supplier: {
    name: string;
    rating: number;
    logo?: string;
  };
  origin: string;
  minOrder: number;
  shippingTime: string;
  profitMargin: number;
  suggestedPrice: number;
  shopUrl: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // const { addProduct } = useSelectionStore();
  // const { toast } = useToast();

  // const handleAddToSelection = () => {
  //   addProduct(product);
  //   toast({
  //     title: "已加入选品",
  //     description: "商品已成功添加到选品列表",
  //   });
  // };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className={cn('group overflow-hidden', className)}>
        {/* 商品图片 */}
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
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
          {/* 供应商标签 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <div className="flex items-center gap-1 text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs">{product.supplier.name}</span>
            </div>
          </div>
        </div>

        {/* 商品信息 */}
        <CardContent className="space-y-2 p-2.5 sm:p-4">
          {/* 商品名称 */}
          <h3 className="line-clamp-2 min-h-[32px] text-sm font-medium sm:min-h-[40px] sm:text-base">
            {product.name}
          </h3>

          {/* 价格和利润率 */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary sm:text-xl">
                ¥{product.price.toFixed(2)}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-xs">/件</span>
            </div>
            <div className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 sm:text-xs">
              利润率 {product.profitMargin}%
            </div>
          </div>

          {/* 起订量和发货时间 */}
          <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground sm:text-xs">
            <span>≥{product.minOrder}件起订</span>
            <span>{product.shippingTime}发货</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
