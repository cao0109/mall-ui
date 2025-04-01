'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSelectionStore } from '@/store/selection';
import { PricedProduct } from '@/types/product';
import { Building2, Minus, Package, Plus, ShoppingCart, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

interface ProductInfoProps {
  product: PricedProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { toast } = useToast();
  const { addProduct } = useSelectionStore();
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations('product.info');

  const handleAddToSelection = () => {
    const price = product.variants?.[0]?.prices?.[0]?.amount || 0;
    const profitMargin = Number(product.metadata?.profit_margin || 30);
    const suggestedPrice = Math.round(price * (1 + profitMargin / 100));

    addProduct({
      id: product.id!,
      name: product.title || t('defaultSupplier'),
      price: price / 100,
      image: product.thumbnail || '/placeholder-product.png',
      description: product.description || '',
      profitMargin: profitMargin,
      minOrder: Number(product.metadata?.min_order || 1),
      shippingTime: String(product.metadata?.shipping_time || '3-5天'),
      supplier: {
        name: product.collection?.title || t('defaultSupplier'),
        logo: '/suppliers/default.png',
        rating: 4.5,
      },
      suggestedPrice: suggestedPrice / 100,
      shopUrl: `/products/${product.id}`,
      origin: String(product.metadata?.origin || '中国'),
    });

    toast({
      title: t('addedToSelection'),
      description: t('addedToSelectionDesc'),
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2 border-b pb-4 sm:space-y-4 sm:pb-6">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
          {product.title}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
          {product.description}
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
          <div className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            ¥{(product.variants?.[0]?.prices?.[0]?.amount || 0) / 100}
          </div>
          <div className="text-base text-muted-foreground line-through sm:text-lg">
            ¥{(((product.variants?.[0]?.prices?.[0]?.amount || 0) * 1.3) / 100).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {t('sku')}: {product.variants?.[0]?.sku || t('na')}
          </Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {t('stock')}
          </Badge>
        </div>
      </div>

      <Card className="bg-card">
        <CardHeader className="px-4 pb-2 sm:px-6 sm:pb-3">
          <CardTitle className="flex items-center gap-1 text-base font-medium sm:gap-2 sm:text-lg">
            <Building2 className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
            {t('supplierInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 overflow-hidden rounded-full border bg-muted/10 sm:h-12 sm:w-12">
              <Image
                src="/suppliers/default.png"
                alt={product.collection?.title || t('defaultSupplier')}
                width={24}
                height={24}
                layout="fixed"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <h3 className="text-sm font-medium sm:text-base">
                  {product.collection?.title || t('defaultSupplier')}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-xs text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-950 sm:text-sm"
                >
                  {t('verified')}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>
                    {t('productCount')}: {product.collection?.products?.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
                  <span>4.5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="bg-card">
            <CardHeader className="px-3 pb-1 sm:px-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">
                {t('profitMargin')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="text-xl font-bold text-primary sm:text-2xl">
                {String(product.metadata?.profit_margin || 30)}%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="px-3 pb-1 sm:px-6 sm:pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground sm:text-sm">
                {t('shippingTime')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="text-xl font-bold sm:text-2xl">
                {String(product.metadata?.shipping_time || '3-5天')}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm font-medium sm:text-base">{t('selectQuantity')}</h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-l-md rounded-r-none sm:h-10 sm:w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-9 w-14 border-y bg-background text-center text-sm sm:h-10 sm:w-20 sm:text-base"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-l-none rounded-r-md sm:h-10 sm:w-10"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground sm:text-sm">{t('minOrder')}：1</div>
          </div>
        </div>

        <div className="border-t pt-4 sm:pt-6">
          <Button size="lg" className="h-10 w-full sm:h-12" onClick={handleAddToSelection}>
            <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            {t('addToSelection')}
          </Button>
        </div>
      </div>
    </div>
  );
}
