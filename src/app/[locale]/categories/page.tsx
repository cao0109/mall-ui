'use client';

import { ChevronRight, Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 分类树 */}
        <Card className="p-4 md:col-span-1">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input placeholder="搜索分类..." className="w-full pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
              <span className="font-medium">电子产品</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2 pl-4">
              <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
                <span>智能手机</span>
                <Badge variant="outline">2,345</Badge>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
                <span>平板电脑</span>
                <Badge variant="outline">1,234</Badge>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
                <span>笔记本电脑</span>
                <Badge variant="outline">3,456</Badge>
              </div>
            </div>

            <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
              <span className="font-medium">智能家居</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
              <span className="font-medium">穿戴设备</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-muted">
              <span className="font-medium">音频设备</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* 热门分类和趋势 */}
        <div className="space-y-6 md:col-span-2">
          {/* 热门分类 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">热门分类</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.png"
                      alt="分类图片"
                      width={48}
                      height={48}
                      layout="fixed"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">智能手表</h3>
                    <p className="text-sm text-muted-foreground">1,234个商品</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.png"
                      alt="分类图片"
                      width={48}
                      height={48}
                      layout="fixed"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">无线耳机</h3>
                    <p className="text-sm text-muted-foreground">2,345个商品</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.png"
                      alt="分类图片"
                      width={48}
                      height={48}
                      layout="fixed"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">智能音箱</h3>
                    <p className="text-sm text-muted-foreground">3,456个商品</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 趋势分类 */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">趋势分类</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="p-4">
                <div className="mb-4 flex items-center gap-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">智能家居设备</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">月增长率</span>
                    <span className="text-green-500">+25%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">平均利润率</span>
                    <span>45%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">商品数量</span>
                    <span>1,234</span>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  查看详情
                </Button>
              </Card>
              <Card className="p-4">
                <div className="mb-4 flex items-center gap-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">可穿戴设备</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">月增长率</span>
                    <span className="text-green-500">+18%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">平均利润率</span>
                    <span>38%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">商品数量</span>
                    <span>2,345</span>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  查看详情
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
