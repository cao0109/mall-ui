"use client";

import { useState } from "react";

import Advantages from "@/components/home/advantages";
import HomeBanner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import DataOverview from "@/components/home/data-overview";
import MustHaveSection from "@/components/home/must-have";
import WelcomeSection from "@/components/home/welcome";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Truck } from "lucide-react";

// 添加示例图片数据
export const demoImages = {
  banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
  products: [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  ],
  categories: [
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  ],
};

// 模拟商品数据
export const products = [
  {
    id: 1,
    name: "时尚休闲连帽卫衣",
    image: demoImages.products[0],
    price: 89.99,
    profitMargin: 45,
    minOrder: 50,
    shippingTime: "3-5天",
    supplier: {
      name: "优品服饰",
      rating: 4.8,
      logo: "/images/suppliers/fashion.jpg",
    },
    description: "采用优质面料，舒适保暖，时尚百搭",
    origin: "中国",
    suggestedPrice: 129.99,
    shopUrl: "/products/hoodie",
    categoryId: "3-301", // 服装鞋帽-男装
  },
  {
    id: 2,
    name: "智能手表健康监测",
    image: demoImages.products[1],
    price: 299.99,
    profitMargin: 35,
    minOrder: 20,
    shippingTime: "2-4天",
    supplier: {
      name: "科技先锋",
      rating: 4.9,
      logo: "/images/suppliers/tech.jpg",
    },
    description: "多功能健康监测，高清显示屏，续航持久",
    origin: "中国",
    suggestedPrice: 399.99,
    shopUrl: "/products/smartwatch",
    categoryId: "1-103", // 电子产品-智能设备
  },
  {
    id: 3,
    name: "高端蓝牙耳机",
    image: demoImages.products[2],
    price: 159.99,
    profitMargin: 40,
    minOrder: 30,
    shippingTime: "3-5天",
    supplier: {
      name: "音频专家",
      rating: 4.7,
      logo: "/images/suppliers/audio.jpg",
    },
    description: "主动降噪，高品质音质，舒适佩戴",
    origin: "中国",
    suggestedPrice: 199.99,
    shopUrl: "/products/headphones",
  },
  {
    id: 4,
    name: "便携式移动电源",
    image: demoImages.products[3],
    price: 79.99,
    profitMargin: 50,
    minOrder: 100,
    shippingTime: "2-3天",
    supplier: {
      name: "电子科技",
      rating: 4.6,
      logo: "/images/suppliers/electronics.jpg",
    },
    description: "大容量快充，多口输出，轻薄便携",
    origin: "中国",
    suggestedPrice: 99.99,
    shopUrl: "/products/powerbank",
  },
  {
    id: 5,
    name: "时尚休闲连帽卫衣",
    image: demoImages.products[0],
    price: 89.99,
    profitMargin: 45,
    minOrder: 50,
    shippingTime: "3-5天",
    supplier: {
      name: "优品服饰",
      rating: 4.8,
      logo: "/images/suppliers/fashion.jpg",
    },
    description: "采用优质面料，舒适保暖，时尚百搭",
    origin: "中国",
    suggestedPrice: 129.99,
    shopUrl: "/products/hoodie",
  },
  {
    id: 6,
    name: "智能手表健康监测",
    image: demoImages.products[1],
    price: 299.99,
    profitMargin: 35,
    minOrder: 20,
    shippingTime: "2-4天",
    supplier: {
      name: "科技先锋",
      rating: 4.9,
      logo: "/images/suppliers/tech.jpg",
    },
    description: "多功能健康监测，高清显示屏，续航持久",
    origin: "中国",
    suggestedPrice: 399.99,
    shopUrl: "/products/smartwatch",
  },
  {
    id: 7,
    name: "高端蓝牙耳机",
    image: demoImages.products[2],
    price: 159.99,
    profitMargin: 40,
    minOrder: 30,
    shippingTime: "3-5天",
    supplier: {
      name: "音频专家",
      rating: 4.7,
      logo: "/images/suppliers/audio.jpg",
    },
    description: "主动降噪，高品质音质，舒适佩戴",
    origin: "中国",
    suggestedPrice: 199.99,
    shopUrl: "/products/headphones",
  },
  {
    id: 8,
    name: "便携式移动电源",
    image: demoImages.products[3],
    price: 79.99,
    profitMargin: 50,
    minOrder: 100,
    shippingTime: "2-3天",
    supplier: {
      name: "电子科技",
      rating: 4.6,
      logo: "/images/suppliers/electronics.jpg",
    },
    description: "大容量快充，多口输出，轻薄便携",
    origin: "中国",
    suggestedPrice: 99.99,
    shopUrl: "/products/powerbank",
  },
];

// 模拟分类数据
export const categories = [
  {
    id: 1,
    name: "电子产品",
    image: demoImages.categories[0],
    count: 1280,
    children: [
      { id: 101, name: "手机数码", count: 450 },
      { id: 102, name: "电脑配件", count: 380 },
      { id: 103, name: "智能设备", count: 450 },
    ],
  },
  {
    id: 2,
    name: "家居用品",
    image: demoImages.categories[1],
    count: 856,
    children: [
      { id: 201, name: "家具装饰", count: 320 },
      { id: 202, name: "厨房用品", count: 286 },
      { id: 203, name: "生活日用", count: 250 },
    ],
  },
  {
    id: 3,
    name: "服装鞋帽",
    image: demoImages.categories[2],
    count: 2150,
    children: [
      { id: 301, name: "男装", count: 860 },
      { id: 302, name: "女装", count: 950 },
      { id: 303, name: "童装", count: 340 },
    ],
  },
  {
    id: 4,
    name: "美妆护肤",
    image: demoImages.categories[3],
    count: 960,
    children: [
      { id: 401, name: "护肤品", count: 420 },
      { id: 402, name: "彩妆", count: 380 },
      { id: 403, name: "香水", count: 160 },
    ],
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("hot");

  return (
    <div className="container mx-auto py-6 space-y-10">
      {/* 轮播图区域 */}
      <HomeBanner />

      {/* 欢迎区域 */}
      <WelcomeSection />

      {/* 数据概览 */}
      <DataOverview />

      {/* 商城优势 */}
      <Advantages />

      {/* 商品分类 */}
      <Categories />

      {/* 产品展示区域 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">爆款优选</h2>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex items-center justify-end mb-6">
            <TabsList>
              <TabsTrigger value="hot">跨境热销</TabsTrigger>
              <TabsTrigger value="new">新品首发</TabsTrigger>
              <TabsTrigger value="recommend">智能推荐</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hot">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommend">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* 限时特惠 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">限时特惠</h2>
            <p className="text-sm text-muted-foreground">每日精选，限时抢购</p>
          </div>
          <Button variant="ghost" className="gap-2">
            更多特惠 <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <Card key={product.id} className="group overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    限时特惠
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-end justify-between text-white">
                    <div>
                      <div className="text-lg font-bold">${product.price}</div>
                      <div className="text-sm line-through opacity-75">
                        ${product.suggestedPrice}
                      </div>
                    </div>
                    <div className="text-sm bg-red-500/80 px-2 py-1 rounded">
                      省${(product.suggestedPrice - product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-base line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-red-500">
                    <span className="font-bold">{12 - index}</span>
                    <span>小时后结束</span>
                  </div>
                  <div className="text-muted-foreground">
                    已售{1000 - index * 50}+
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 新店必备 */}
      <MustHaveSection />

      {/* 跨境爆款 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold">跨境爆款</h2>
            <p className="text-xs text-muted-foreground">多平台数据验证</p>
          </div>
          <Button variant="ghost" className="gap-1 text-sm h-8">
            发现更多 <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.slice(0, 4).map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-none bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3">
                  {/* 供应商信息 */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.supplier.logo}
                        alt={product.supplier.name}
                        className="w-5 h-5 rounded-full ring-1 ring-slate-200"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {product.supplier.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                      <span>★</span>
                      <span className="text-xs">{product.supplier.rating}</span>
                    </div>
                  </div>

                  {/* 产品列表 */}
                  <div className="space-y-3">
                    {[0, 1, 2].map((_, index) => (
                      <div
                        key={index}
                        className="flex gap-3 first:pt-0 pt-3 first:border-t-0 border-t border-slate-100"
                      >
                        <div className="relative w-[72px] h-[72px] flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-1 -right-1">
                            <div className="bg-gradient-to-r from-primary/90 to-primary text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                              爆款
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-primary font-semibold text-sm">
                              ${product.price}
                            </span>
                            <div className="flex items-center text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                              利润率 {product.profitMargin}%↑
                            </div>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-500">
                            <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-full">
                              <Truck className="h-3 w-3" />
                              <span>{product.shippingTime}</span>
                            </div>
                            <div className="bg-slate-50 px-1.5 py-0.5 rounded-full">
                              ≥{product.minOrder}件起订
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="bg-gradient-to-br from-slate-50 to-white border-none shadow-sm">
            <div className="p-4 space-y-6">
              {/* 热销榜单 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    热销榜单 Top 5
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary hover:bg-primary/5"
                  >
                    查看更多
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {products.slice(0, 5).map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-xs">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          月销 {(10000 - index * 1000).toLocaleString()}+
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-primary">
                        ${product.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 利润榜单 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    利润榜单 Top 5
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary hover:bg-primary/5"
                  >
                    查看更多
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {products.slice(0, 5).map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-500 font-medium text-xs">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-red-500">
                          利润率 {product.profitMargin}%
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-red-500">
                        +$
                        {(product.suggestedPrice - product.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 平台优势 */}
      <Advantages />
    </div>
  );
}
