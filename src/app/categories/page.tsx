"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, TrendingUp } from "lucide-react";

// 模拟分类数据
const categories = [
  {
    id: "electronics",
    name: "电子产品",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "包含各类电子产品，如手机配件、智能设备等",
    subCategories: ["手机配件", "智能设备", "电脑周边", "音频设备"],
    productCount: 1280,
  },
  {
    id: "clothing",
    name: "服装服饰",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "时尚服装、鞋帽、箱包等",
    subCategories: ["男装", "女装", "童装", "运动服饰"],
    productCount: 2150,
  },
  {
    id: "home",
    name: "家居用品",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "家具、家纺、厨具等居家用品",
    subCategories: ["家具", "家纺", "厨具", "收纳"],
    productCount: 1560,
  },
  {
    id: "beauty",
    name: "美妆个护",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "化妆品、护肤品、个人护理用品",
    subCategories: ["护肤", "彩妆", "香水", "美容仪器"],
    productCount: 980,
  },
  {
    id: "sports",
    name: "运动户外",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "运动器材、户外装备、健身用品",
    subCategories: ["健身器材", "户外装备", "运动配件", "瑜伽用品"],
    productCount: 760,
  },
  {
    id: "toys",
    name: "玩具乐器",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "玩具、乐器、儿童用品",
    subCategories: ["益智玩具", "音乐器材", "儿童玩具", "创意玩具"],
    productCount: 650,
  },
  {
    id: "digital",
    name: "数码产品",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "手机、电脑、智能设备",
    subCategories: ["手机", "电脑", "平板", "智能设备"],
    productCount: 890,
  },
  {
    id: "food",
    name: "食品生鲜",
    image:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "零食、饮料、生鲜食品",
    subCategories: ["零食", "饮料", "生鲜", "保健品"],
    productCount: 1120,
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 分类树 */}
        <Card className="md:col-span-1 p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索分类..." className="w-full pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
              <span className="font-medium">电子产品</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pl-4 space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
                <span>智能手机</span>
                <Badge variant="outline">2,345</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
                <span>平板电脑</span>
                <Badge variant="outline">1,234</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
                <span>笔记本电脑</span>
                <Badge variant="outline">3,456</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
              <span className="font-medium">智能家居</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
              <span className="font-medium">穿戴设备</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer">
              <span className="font-medium">音频设备</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* 热门分类和趋势 */}
        <div className="md:col-span-2 space-y-6">
          {/* 热门分类 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">热门分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.png"
                      alt="分类图片"
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
                  <div className="h-12 w-12 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.png"
                      alt="分类图片"
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
                  <div className="h-12 w-12 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.png"
                      alt="分类图片"
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
            <h2 className="text-xl font-semibold mb-4">趋势分类</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">智能家居设备</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">月增长率</span>
                    <span className="text-green-500">+25%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">平均利润率</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">商品数量</span>
                    <span>1,234</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  查看详情
                </Button>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">可穿戴设备</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">月增长率</span>
                    <span className="text-green-500">+18%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">平均利润率</span>
                    <span>38%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">商品数量</span>
                    <span>2,345</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
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
