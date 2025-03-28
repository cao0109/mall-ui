"use client";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import { Flame, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const tabs = ["全部", "3C数码", "智能家居", "户外运动", "美妆个护"] as const;

export default function Trending() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("全部");

  return (
    <section className="space-y-6">
      <SectionHeader
        title="跨境爆款"
        subtitle="多平台数据验证，爆款精选"
        icon={<Flame className="h-6 w-6 text-red-500" />}
        badge={{ text: "Trending" }}
        action={{
          label: "发现更多",
          onClick: () => {},
        }}
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTab(tab)}
            className="shrink-0"
          >
            {tab}
          </Button>
        ))}
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
  );
}
