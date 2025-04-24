import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { PriceDisplay } from './price-display';
import { SyncProductData, SyncProductSheet } from './sync-product-sheet';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    thumbnail: string;
    description: string;
    price: number;
    suggestedPrice: number;
    profitMargin: number;
    minOrder: number;
    shippingTime: string;
    supplier: {
      name: string;
      logo: string;
      rating: number;
    };
    categoryId?: string;
    prices?: Array<{
      amount: number;
      currency_code: string;
    }>;
  };
  viewMode: 'grid' | 'list';
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const { toast } = useToast();
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async (data: SyncProductData) => {
    try {
      setIsSyncing(true);
      // TODO: 实现同步逻辑
      console.log('同步数据:', {
        product,
        ...data,
      });
      toast({
        title: '同步中',
        description: `商品"${product.name}"正在同步到目标店铺`,
      });

      // 模拟同步过程
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: '同步成功',
        description: `商品"${product.name}"已成功同步到目标店铺`,
      });
    } catch (error) {
      toast({
        title: '同步失败',
        description: '同步过程中出现错误，请稍后重试',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const thumbnail = product.thumbnail || '/placeholder.png';
  const profitMargin = Number(product.profitMargin) || 30;
  const supplierLogo =
    'https://img.alicdn.com/imgextra/i4/O1CN01GbZNxl26Vzotrjqli_!!6000000007668-2-tps-160-160.png';
  const supplierRating = Number(product.supplier?.rating) || 4.5;
  const minOrder = Number(product.minOrder) || 1;
  const shippingTime = String(product.shippingTime || '3-5天');
  const description = String(product.description || '');
  const collectionTitle = product.supplier?.name || '默认供应商';
  const productTitle = String(product.name || '');

  // 如果没有 prices 数组，从传统价格创建一个默认价格对象
  const prices = product.prices || [
    {
      amount: Math.round(product.price * 100),
      currency_code: 'CNY',
    },
  ];

  return (
    <>
      <Card
        className={cn(
          'group overflow-hidden transition-colors duration-300 hover:border-primary/50',
          viewMode === 'list' && 'flex flex-col sm:flex-row'
        )}
      >
        <div
          className={cn(
            'relative',
            viewMode === 'grid' && 'aspect-square',
            viewMode === 'list' && 'aspect-video w-full sm:aspect-auto sm:w-48'
          )}
        >
          <Image
            src={thumbnail}
            alt={productTitle}
            layout="fill"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="bg-white/80 shadow-sm">
              利润率 {profitMargin}%
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link href={`/products/${String(product.id)}`}>
              <Button
                size="sm"
                className="w-full bg-white/90 text-primary shadow-sm hover:bg-white"
              >
                查看详情
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 space-y-3 p-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 overflow-hidden rounded-full bg-muted">
              <Image
                src={supplierLogo}
                alt={collectionTitle}
                width={20}
                height={20}
                layout="fixed"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">{collectionTitle}</span>
            <div className="ml-auto flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-muted-foreground">{supplierRating}</span>
            </div>
          </div>
          <h3 className="line-clamp-2 font-medium transition-colors group-hover:text-primary">
            {productTitle}
          </h3>
          {viewMode === 'list' && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          )}
          <div className="flex flex-row items-center justify-between gap-2">
            <PriceDisplay prices={prices} showSuggestedPrice profitMargin={profitMargin} />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSyncModal(true)}
              disabled={isSyncing}
            >
              {isSyncing ? '同步中...' : '同步商品'}
            </Button>
          </div>
          <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
            <span>≥{minOrder}件起订</span>
            <span>{shippingTime}发货</span>
          </div>
        </div>
      </Card>

      <SyncProductSheet
        open={showSyncModal}
        onOpenChange={setShowSyncModal}
        onConfirm={handleSync}
      />
    </>
  );
}
