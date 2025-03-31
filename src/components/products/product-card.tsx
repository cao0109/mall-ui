import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SyncProductData, SyncProductSheet } from './sync-product-sheet';

interface ProductCardProps {
  product: Product;
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

  return (
    <>
      <Card
        className={cn(
          'group overflow-hidden transition-colors duration-300 hover:border-primary/50',
          viewMode === 'list' && 'flex'
        )}
      >
        <div
          className={cn(
            'relative',
            viewMode === 'grid' && 'aspect-square',
            viewMode === 'list' && 'w-48'
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="bg-white/80 shadow-sm">
              利润率 {product.profitMargin}%
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link href={`/product/${String(product.id)}`}>
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
              {product.supplier.logo && (
                <Image
                  src={product.supplier.logo}
                  alt={product.supplier.name}
                  width={20}
                  height={20}
                  layout="fixed"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="text-sm text-muted-foreground">{product.supplier.name}</span>
            <div className="ml-auto flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-muted-foreground">{product.supplier.rating}</span>
            </div>
          </div>
          <h3 className="line-clamp-2 font-medium transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          {viewMode === 'list' && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">¥{product.price}</div>
              <div className="text-xs text-muted-foreground">
                建议售价 ¥{product.suggestedPrice}
              </div>
            </div>
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
            <span>≥{product.minOrder}件起订</span>
            <span>{product.shippingTime}发货</span>
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
