'use client';

import { Filter, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

// 模拟分类商品数据
const products = [
  {
    id: 1,
    name: '无线蓝牙耳机',
    price: 15.99,
    image:
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: '高品质无线蓝牙耳机，支持主动降噪，续航时间长达24小时。',
    supplier: 'Shenzhen Electronics Co.',
    origin: '中国',
    minOrder: 100,
    shippingTime: '3-5天',
    profitMargin: 35,
  },
  // ... 更多商品数据
];

// 模拟分类数据
const categoryData = {
  electronics: {
    name: '电子产品',
    description: '包含各类电子产品，如手机配件、智能设备等',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subCategories: ['手机配件', '智能设备', '电脑周边', '音频设备'],
  },
  // ... 其他分类数据
};

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          首页
        </Link>{' '}
        /{' '}
        <Link href="/categories" className="hover:text-primary">
          全部分类
        </Link>{' '}
        / <span className="text-foreground">电子产品</span>
      </div>

      {/* 分类头部 */}
      <div className="relative h-[200px] overflow-hidden rounded-xl">
        <Image
          src={categoryData.electronics.image}
          alt={categoryData.electronics.name}
          layout="fill"
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-black/40">
          <div className="container">
            <div className="max-w-2xl text-white">
              <h1 className="mb-2 text-3xl font-bold">{categoryData.electronics.name}</h1>
              <p className="text-lg opacity-90">{categoryData.electronics.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 筛选侧边栏 */}
        <div className="w-64 shrink-0 space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 flex items-center font-semibold">
              <Filter className="mr-2 h-4 w-4" />
              子分类
            </h3>
            <div className="space-y-2">
              {categoryData.electronics.subCategories.map(subCategory => (
                <Button key={subCategory} variant="ghost" className="w-full justify-start text-sm">
                  {subCategory}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">价格区间</h3>
            <div className="space-y-4">
              <Slider defaultValue={[0, 100]} max={100} step={1} />
              <div className="flex items-center justify-between text-sm">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">最小订量</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                50件以下
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                50-100件
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                100-500件
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                500件以上
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">发货地</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                广东省
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                浙江省
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                江苏省
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                福建省
              </Button>
            </div>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上架</SelectItem>
                  <SelectItem value="profit">利润最高</SelectItem>
                  <SelectItem value="price-low">价格从低到高</SelectItem>
                  <SelectItem value="price-high">价格从高到低</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              共 <span className="font-medium text-foreground">128</span> 个商品
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array(9)
              .fill(products[0])
              .map((product, index) => (
                <ProductCard key={index} product={{ ...product, id: index + 1 }} />
              ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">加载更多</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
