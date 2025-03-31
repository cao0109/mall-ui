'use client';

import { ProductGallery } from '@/components/product/product-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useSelectionStore } from '@/store/selection';
import { Building2, ChevronRight, Minus, Package, Plus, ShoppingCart, Star } from 'lucide-react';
import { useProduct } from 'medusa-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductDetail() {
  const { toast } = useToast();
  const { addProduct } = useSelectionStore();
  const params = useParams();
  const productId = params.id as string;

  // 使用 Medusa API 获取商品数据
  const { product, isLoading, error } = useProduct(productId);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
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
            <div className="space-y-6">
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
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto max-w-7xl py-8">
        <div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">加载商品失败: {error?.message || '商品不存在'}</p>
        </div>
      </div>
    );
  }

  const handleAddToSelection = () => {
    if (!product) return;

    const price = product.variants?.[0]?.prices?.[0]?.amount || 0;
    const profitMargin = Number(product.metadata?.profit_margin || 30);
    const suggestedPrice = Math.round(price * (1 + profitMargin / 100));

    addProduct({
      id: Number(product.id),
      name: product.title || '未命名商品',
      price: price / 100,
      image: product.thumbnail || '/placeholder-product.png',
      description: product.description || '',
      profitMargin: profitMargin,
      minOrder: Number(product.metadata?.min_order || 1),
      shippingTime: String(product.metadata?.shipping_time || '3-5天'),
      supplier: {
        name: product.collection?.title || '默认供应商',
        logo: '/suppliers/default.png',
        rating: 4.5,
      },
      suggestedPrice: suggestedPrice / 100,
      shopUrl: `/products/${product.id}`,
      origin: String(product.metadata?.origin || '中国'),
    });

    toast({
      title: '已加入选品',
      description: '商品已成功添加到选品列表',
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-8">
      {/* 面包屑导航 */}
      <nav className="mb-4 overflow-x-auto whitespace-nowrap sm:mb-8">
        <ol className="flex items-center space-x-1 text-xs sm:space-x-2 sm:text-sm">
          <li>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
              首页
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
          </li>
          <li>
            <Link
              href="/products"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              商品库
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
          </li>
          <li>
            <span className="font-medium text-foreground">
              {product.title!.slice(0, 30)}
              {product.title!.length > 30 ? '...' : ''}
            </span>
          </li>
        </ol>
      </nav>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 md:grid-cols-2 md:gap-12">
        {/* 商品图片区 */}
        <ProductGallery images={product.images || []} title={product.title} />

        {/* 商品信息区 */}
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
                SKU: {product.variants?.[0]?.sku || 'N/A'}
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">
                库存充足
              </Badge>
            </div>
          </div>

          <Card className="bg-card">
            <CardHeader className="px-4 pb-2 sm:px-6 sm:pb-3">
              <CardTitle className="flex items-center gap-1 text-base font-medium sm:gap-2 sm:text-lg">
                <Building2 className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                供应商信息
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full border bg-muted/10 sm:h-12 sm:w-12">
                  <Image
                    src="/suppliers/default.png"
                    alt={product.collection?.title || '默认供应商'}
                    width={24}
                    height={24}
                    layout="fixed"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <h3 className="text-sm font-medium sm:text-base">
                      {product.collection?.title || '默认供应商'}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-xs text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-950 sm:text-sm"
                    >
                      已认证
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>商品数量: {product.collection?.products?.length || 0}</span>
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
                    利润率
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
                    发货时间
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
              <h3 className="text-sm font-medium sm:text-base">选择数量</h3>
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
                <div className="text-xs text-muted-foreground sm:text-sm">最小起订量：1</div>
              </div>
            </div>

            <div className="border-t pt-4 sm:pt-6">
              <Button size="lg" className="h-10 w-full sm:h-12" onClick={handleAddToSelection}>
                <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                加入选品
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 商品详细信息标签页 */}
      <Tabs defaultValue="details" className="mt-6 sm:mt-8">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="details" className="flex-1 text-xs sm:flex-initial sm:text-sm">
            商品详情
          </TabsTrigger>
          <TabsTrigger value="specs" className="flex-1 text-xs sm:flex-initial sm:text-sm">
            规格参数
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex-1 text-xs sm:flex-initial sm:text-sm">
            物流信息
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-3 sm:mt-4">
          <Card className="p-4 sm:p-6">
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
              <h2 className="text-lg sm:text-xl">商品描述</h2>
              <p>{product.description}</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="mt-3 sm:mt-4">
          <Card className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:text-base">
              {product.metadata &&
                Object.entries(product.metadata).map(([key, value]) => (
                  <div key={key} className="space-y-1 sm:space-y-2">
                    <p className="text-muted-foreground">{key}</p>
                    <p>{String(value || '')}</p>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="shipping" className="mt-3 sm:mt-4">
          <Card className="p-4 sm:p-6">
            <div className="space-y-3 text-sm sm:space-y-4 sm:text-base">
              <div>
                <h3 className="font-semibold">发货地</h3>
                <p className="text-muted-foreground">
                  {String(product.metadata?.origin || '中国')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">物流方式</h3>
                <p className="text-muted-foreground">
                  {String(product.metadata?.shipping_methods || '标准物流')}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
