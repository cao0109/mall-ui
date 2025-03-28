"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
// import { useSelectionStore } from "@/store/selection";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
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
      <Card className={cn("group overflow-hidden", className)}>
        {/* 商品图片 */}
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={1}
            height={1}
            layout="responsive"
            className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
          />
          {/* 收藏按钮 */}
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          {/* 供应商标签 */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-1 text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs">
                {product.supplier.name}
              </span>
            </div>
          </div>
        </div>

        {/* 商品信息 */}
        <CardContent className="p-2.5 sm:p-4 space-y-2">
          {/* 商品名称 */}
          <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[32px] sm:min-h-[40px]">
            {product.name}
          </h3>

          {/* 价格和利润率 */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-bold text-primary">
                ¥{product.price.toFixed(2)}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                /件
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-emerald-600 font-medium px-1.5 py-0.5 rounded bg-emerald-50">
              利润率 {product.profitMargin}%
            </div>
          </div>

          {/* 起订量和发货时间 */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground pt-1">
            <span>≥{product.minOrder}件起订</span>
            <span>{product.shippingTime}发货</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
