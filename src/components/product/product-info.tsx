'use client';

import { Building2, Package, ShoppingCart, Star, Upload } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSelectionStore } from '@/store/selection';
import { PricedProduct } from '@/types/product';

import { SyncProductData, SyncProductSheet } from '../products/sync-product-sheet';

import { ProductVariantSelector } from './product-variant-selector';

interface ProductInfoProps {
  product: PricedProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { toast } = useToast();
  const { addProduct } = useSelectionStore();
  const t = useTranslations('product.info');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleAddToSelection = () => {
    if (!selectedVariant) return;

    const price = selectedVariant.prices?.[0]?.amount || 0;
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
      // variant: {
      //   id: selectedVariant.id || '',
      //   title: selectedVariant.title || '',
      //   sku: selectedVariant.sku || '',
      // },
    });

    toast({
      title: t('addedToSelection'),
      description: t('addedToSelectionDesc'),
    });
  };

  const handleSync = async (data: SyncProductData) => {
    try {
      setIsSyncing(true);
      // TODO: 实现同步逻辑
      console.log('同步数据:', {
        product,
        ...data,
      });
      toast({
        title: t('syncing'),
        description: t('syncingDesc', { name: product.title || t('defaultSupplier') }),
      });

      // 模拟同步过程
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('syncSuccess'),
        description: t('syncSuccessDesc', { name: product.title || t('defaultSupplier') }),
      });
    } catch (error) {
      toast({
        title: t('syncFailed'),
        description: t('syncFailedDesc'),
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
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
            ¥{(selectedVariant?.prices?.[0]?.amount || 0) / 100}
          </div>
          <div className="text-base text-muted-foreground line-through sm:text-lg">
            ¥{(((selectedVariant?.prices?.[0]?.amount || 0) * 1.3) / 100).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {t('sku')}: {selectedVariant?.sku || t('na')}
          </Badge>
          <Badge
            variant={selectedVariant?.inventory_quantity ? 'secondary' : 'destructive'}
            className="text-xs sm:text-sm"
          >
            {selectedVariant?.inventory_quantity
              ? `${t('stock')}: ${selectedVariant.inventory_quantity}`
              : t('outOfStock')}
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
                src="https://img.alicdn.com/imgextra/i4/O1CN01GbZNxl26Vzotrjqli_!!6000000007668-2-tps-160-160.png"
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

        <div className="space-y-2">
          <h3 className="text-sm font-medium">规格选择</h3>
          <ProductVariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="h-10 w-full sm:h-12"
            onClick={handleAddToSelection}
            disabled={!selectedVariant || selectedVariant.inventory_quantity === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            {selectedVariant?.inventory_quantity === 0 ? t('outOfStock') : t('addToSelection')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-10 w-full sm:h-12"
            onClick={() => setShowSyncModal(true)}
            disabled={isSyncing}
          >
            <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            {isSyncing ? t('syncing') : t('syncProduct')}
          </Button>
        </div>
      </div>

      <SyncProductSheet
        open={showSyncModal}
        onOpenChange={setShowSyncModal}
        onConfirm={handleSync}
      />
    </div>
  );
}
