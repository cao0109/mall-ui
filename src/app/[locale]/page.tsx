"use client";

import { useTranslations } from "next-intl";
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
import { products } from "@/lib/data";
import { ArrowRight, Truck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState("hot");

  return (
    <div className="container mx-auto py-6 space-y-10">
      {/* 轮播图区域 */}
      <HomeBanner
        title={t("home.banner.title")}
        subtitle={t("home.banner.subtitle")}
        cta={t("home.banner.cta")}
      />

      {/* 欢迎区域 */}
      <WelcomeSection
        title={t("home.welcome.title")}
        subtitle={t("home.welcome.subtitle")}
        description={t("home.welcome.description")}
      />

      {/* 数据概览 */}
      <DataOverview
        title={t("home.dataOverview.title")}
        items={[
          {
            label: t("home.dataOverview.items.suppliers.label"),
            value: t("home.dataOverview.items.suppliers.value"),
          },
          {
            label: t("home.dataOverview.items.products.label"),
            value: t("home.dataOverview.items.products.value"),
          },
          {
            label: t("home.dataOverview.items.buyers.label"),
            value: t("home.dataOverview.items.buyers.value"),
          },
          {
            label: t("home.dataOverview.items.countries.label"),
            value: t("home.dataOverview.items.countries.value"),
          },
        ]}
      />

      {/* 商城优势 */}
      <Advantages
        title={t("home.advantages.title")}
        items={[
          {
            title: t("home.advantages.items.quality.title"),
            description: t("home.advantages.items.quality.description"),
          },
          {
            title: t("home.advantages.items.price.title"),
            description: t("home.advantages.items.price.description"),
          },
          {
            title: t("home.advantages.items.shipping.title"),
            description: t("home.advantages.items.shipping.description"),
          },
          {
            title: t("home.advantages.items.service.title"),
            description: t("home.advantages.items.service.description"),
          },
        ]}
      />

      {/* 商品分类 */}
      <Categories />

      {/* 商品展示 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {selectedTab === "hot"
                ? t("home.products.hot.title")
                : t("home.products.new.title")}
            </h2>
            <p className="text-muted-foreground">
              {selectedTab === "hot"
                ? t("home.products.hot.subtitle")
                : t("home.products.new.subtitle")}
            </p>
          </div>
          <Button variant="ghost" className="group">
            {t("home.products.viewMore")}
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="hot">
              {t("home.products.hot.title")}
            </TabsTrigger>
            <TabsTrigger value="new">
              {t("home.products.new.title")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hot" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    name: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.name`
                    ),
                    description: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.description`
                    ),
                    price: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.price`
                      )
                    ),
                    profitMargin: parseInt(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.profitMargin`
                      )
                    ),
                    minOrder: parseInt(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.minOrder`
                      )
                    ),
                    shippingTime: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.shippingTime`
                    ),
                    supplier: {
                      ...product.supplier,
                      name: t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.supplier`
                      ),
                      rating: parseFloat(
                        t(
                          `home.products.items.${product.shopUrl
                            .split("/")
                            .pop()}.rating`
                        )
                      ),
                    },
                    suggestedPrice: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.suggestedPrice`
                      )
                    ),
                  }}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(4, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    name: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.name`
                    ),
                    description: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.description`
                    ),
                    price: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.price`
                      )
                    ),
                    profitMargin: parseInt(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.profitMargin`
                      )
                    ),
                    minOrder: parseInt(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.minOrder`
                      )
                    ),
                    shippingTime: t(
                      `home.products.items.${product.shopUrl
                        .split("/")
                        .pop()}.shippingTime`
                    ),
                    supplier: {
                      ...product.supplier,
                      name: t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.supplier`
                      ),
                      rating: parseFloat(
                        t(
                          `home.products.items.${product.shopUrl
                            .split("/")
                            .pop()}.rating`
                        )
                      ),
                    },
                    suggestedPrice: parseFloat(
                      t(
                        `home.products.items.${product.shopUrl
                          .split("/")
                          .pop()}.suggestedPrice`
                      )
                    ),
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="responsive"
                  width={400}
                  height={400}
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
                      <Image
                        src={product.supplier.logo}
                        alt={product.supplier.name}
                        width={24}
                        height={24}
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
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={72}
                            height={72}
                            layout="fixed"
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
    </div>
  );
}
