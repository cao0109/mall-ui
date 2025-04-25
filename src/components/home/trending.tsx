'use client';

import { Flame, Truck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { SectionHeader } from '@/components/home/section-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { products } from '@/lib/data';

const tabs = ['全部', '3C数码', '智能家居', '户外运动', '美妆个护'] as const;

export default function Trending() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>('全部');

  return (
    <section className="space-y-6">
      <SectionHeader
        title="跨境爆款"
        subtitle="多平台数据验证，爆款精选"
        icon={<Flame className="h-6 w-6 text-red-500" />}
        badge={{ text: 'Trending' }}
        action={{
          label: '发现更多',
          onClick: () => {},
        }}
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <Button
            key={tab}
            variant={selectedTab === tab ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTab(tab)}
            className="shrink-0"
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2">
          {products.slice(0, 4).map(product => (
            <Card
              key={product.id}
              className="group overflow-hidden border-none bg-gradient-to-br from-white to-slate-50 shadow-sm transition-all duration-300 hover:shadow-md dark:from-slate-900 dark:to-slate-800"
            >
              <div className="p-3">
                {/* 供应商信息 */}
                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://img.alicdn.com/imgextra/i4/O1CN01GbZNxl26Vzotrjqli_!!6000000007668-2-tps-160-160.png"
                      alt={product.supplier.name}
                      width={24}
                      height={24}
                      className="h-5 w-5 rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {product.supplier.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-500 dark:bg-amber-900/50 dark:text-amber-400">
                    <span>★</span>
                    <span className="text-xs">{product.supplier.rating}</span>
                  </div>
                </div>

                {/* 产品列表 */}
                <div className="space-y-3">
                  {[0, 1, 2].map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-3 border-t border-slate-100 pt-3 first:border-t-0 first:pt-0 dark:border-slate-700"
                    >
                      <div className="relative h-[72px] w-[72px] flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={72}
                          height={72}
                          layout="fixed"
                          className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute -right-1 -top-1">
                          <div className="rounded-full bg-gradient-to-r from-primary/90 to-primary px-2 py-0.5 text-[10px] text-white shadow-sm">
                            爆款
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-medium text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                          {product.name}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">
                            ${product.price}
                          </span>
                          <div className="flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] text-red-500 dark:bg-red-900/50 dark:text-red-400">
                            利润率 {product.profitMargin}%↑
                          </div>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1 rounded-full bg-slate-50 px-1.5 py-0.5 dark:bg-slate-800">
                            <Truck className="h-3 w-3" />
                            <span>{product.shippingTime}</span>
                          </div>
                          <div className="rounded-full bg-slate-50 px-1.5 py-0.5 dark:bg-slate-800">
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
        <Card className="border-none bg-gradient-to-br from-slate-50 to-white shadow-sm dark:from-slate-900 dark:to-slate-800">
          <div className="space-y-6 p-4">
            {/* 热销榜单 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  热销榜单 Top 5
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                >
                  查看更多
                </Button>
              </div>

              <div className="space-y-2">
                {products.slice(0, 5).map((product, index) => (
                  <div
                    key={product.id}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary dark:bg-primary/20">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-800 transition-colors group-hover:text-primary dark:text-slate-200">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        月销 {(10000 - index * 1000).toLocaleString()}+
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-primary">${product.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 利润榜单 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  利润榜单 Top 5
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary hover:bg-primary/5 dark:hover:bg-primary/10"
                >
                  查看更多
                </Button>
              </div>

              <div className="space-y-2">
                {products.slice(0, 5).map((product, index) => (
                  <div
                    key={product.id}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-medium text-red-500 dark:bg-red-900/50 dark:text-red-400">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-800 transition-colors group-hover:text-primary dark:text-slate-200">
                        {product.name}
                      </p>
                      <p className="text-xs text-red-500 dark:text-red-400">
                        利润率 {product.profitMargin}%
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-red-500 dark:text-red-400">
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
