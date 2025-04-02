'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// 模拟店铺数据
const stores = [
  {
    id: 1,
    name: 'TechGadgets',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    platform: 'Shopify',
    url: 'https://techgadgets.com',
    status: '已连接',
    products: 152,
    orders: 487,
    monthlyVisits: '15K+',
    currency: 'USD',
    syncStatus: '2023-10-15同步',
    storeLocation: '美国',
    lastUpdated: '2023-10-15',
  },
  {
    id: 2,
    name: 'HomeDecorPlus',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    platform: 'WooCommerce',
    url: 'https://homedecorplus.com',
    status: '已连接',
    products: 78,
    orders: 124,
    monthlyVisits: '8K+',
    currency: 'EUR',
    syncStatus: '2023-10-10同步',
    storeLocation: '德国',
    lastUpdated: '2023-10-10',
  },
  {
    id: 3,
    name: 'FashionTrend',
    logo: 'https://images.unsplash.com/photo-1576072125349-e4e11a594238?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    platform: 'Shopify',
    url: 'https://fashiontrend.com',
    status: '未连接',
    products: 0,
    orders: 0,
    monthlyVisits: 'N/A',
    currency: 'GBP',
    syncStatus: '未同步',
    storeLocation: '英国',
    lastUpdated: 'N/A',
  },
];

export default function MyStoresPage() {
  const { toast } = useToast();

  const handleConnect = (storeId: number) => {
    toast({
      title: '连接成功',
      description: `您已成功连接到店铺 #${storeId}`,
    });
  };

  const handleSync = (storeId: number) => {
    toast({
      title: '同步成功',
      description: `您已成功同步店铺 #${storeId} 的商品`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">我的店铺</h1>
          <p className="text-muted-foreground">管理您的电商店铺</p>
        </div>
        <Button>添加店铺</Button>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={store.logo}
                      alt={store.name}
                      layout="responsive"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{store.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={store.status === '已连接' ? 'default' : 'outline'}>
                        {store.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{store.platform}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">网址</span>
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {store.url}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">地区</span>
                    <span>{store.storeLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">商品数量</span>
                    <span>{store.products}个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">订单数</span>
                    <span>{store.orders}个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">月访问量</span>
                    <span>{store.monthlyVisits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">同步状态</span>
                    <span>{store.syncStatus}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {store.status === '已连接' ? (
                  <Button variant="outline" size="sm" onClick={() => handleSync(store.id)}>
                    同步商品
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleConnect(store.id)}>
                    连接店铺
                  </Button>
                )}
                <Button size="sm">查看详情</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
