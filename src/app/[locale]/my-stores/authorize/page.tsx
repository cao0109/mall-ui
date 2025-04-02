'use client';

import { Building2, Check, ExternalLink, Plus } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const platforms = [
  {
    id: 'shopify',
    name: 'Shopify',
    logo: '/platforms/shopify.png',
    description: '全球领先的独立站电商平台',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logo: '/platforms/woocommerce.png',
    description: '基于WordPress的电商解决方案',
  },
  {
    id: 'magento',
    name: 'Magento',
    logo: '/platforms/magento.png',
    description: '企业级电商平台',
  },
];

const authorizedStores = [
  {
    id: 1,
    name: 'My Fashion Store',
    platform: 'Shopify',
    url: 'https://my-fashion-store.myshopify.com',
    status: '已连接',
    authorizedAt: '2024-03-26',
  },
];

export default function StoreAuthorizePage() {
  const { toast } = useToast();

  const handleAuthorize = async (platformId: string) => {
    try {
      // 这里应该跳转到相应平台的OAuth授权页面
      window.location.href = `/api/auth/${platformId}/authorize`;
    } catch (error) {
      toast({
        title: '授权失败',
        description: `请稍后重试: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: 'destructive',
      });
    }
  };

  const handleDisconnect = async (storeId: number) => {
    try {
      const response = await fetch(`/api/stores/${storeId}/disconnect`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: '解除连接成功',
          description: '店铺已成功解除连接',
        });
      } else {
        throw new Error('Failed to disconnect');
      }
    } catch (error) {
      toast({
        title: '解除连接失败',
        description: `请稍后重试: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold">店铺授权</h1>
          <p className="mt-2 text-muted-foreground">连接您的电商平台，开始同步商品</p>
        </div>

        {/* 已授权店铺 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">已连接的店铺</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {authorizedStores.map(store => (
              <Card key={store.id} className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <Building2 className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.platform}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">状态</span>
                    <span className="flex items-center text-green-600">
                      <Check className="mr-1 h-4 w-4" />
                      {store.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">授权时间</span>
                    <span>{store.authorizedAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">店铺地址</span>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      访问
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDisconnect(store.id)}
                  >
                    解除连接
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 可授权平台 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">添加新店铺</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map(platform => (
              <Card key={platform.id} className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={platform.logo}
                      alt={platform.name}
                      width={48}
                      height={48}
                      layout="fixed"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </div>
                </div>
                <Button className="w-full" onClick={() => handleAuthorize(platform.id)}>
                  <Plus className="mr-2 h-4 w-4" />
                  连接店铺
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
