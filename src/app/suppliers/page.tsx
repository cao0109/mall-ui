"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Star } from "lucide-react";

// 模拟供货商数据
const suppliers = [
  {
    id: 1,
    name: "Shenzhen Electronics Co.",
    logo: "https://images.unsplash.com/photo-1706722118380-c38a1b37c079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "专业电子产品制造商，提供各类消费电子产品，如耳机、充电器等。",
    country: "中国",
    verificationStatus: "已认证",
    rating: 4.8,
    products: 320,
    founded: "2005年",
    shippingInfo: "全球发货，3-7天送达",
    contactPerson: "李明",
    email: "contact@szelectronics.com",
    phone: "+86 755-1234-5678",
  },
  {
    id: 2,
    name: "Guangzhou Tech Ltd.",
    logo: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description:
      "智能穿戴设备专家，提供智能手表、运动手环等产品，拥有多项专利技术。",
    country: "中国",
    verificationStatus: "已认证",
    rating: 4.6,
    products: 128,
    founded: "2010年",
    shippingInfo: "全球发货，5-10天送达",
    contactPerson: "张华",
    email: "info@gztech.com",
    phone: "+86 20-8765-4321",
  },
  {
    id: 3,
    name: "Dongguan Power Co.",
    logo: "https://images.unsplash.com/photo-1603575448878-868a20723f5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description:
      "专业电源设备制造商，提供充电宝、适配器等产品，注重质量与安全。",
    country: "中国",
    verificationStatus: "审核中",
    rating: 4.3,
    products: 76,
    founded: "2012年",
    shippingInfo: "亚洲、欧洲、北美地区发货，7-15天送达",
    contactPerson: "王强",
    email: "sales@dgpower.com",
    phone: "+86 769-9876-5432",
  },
  {
    id: 4,
    name: "Shenzhen Wireless Co.",
    logo: "https://images.unsplash.com/photo-1557999979-5a0f99165662?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "无线充电技术专家，提供各类无线充电设备，技术领先，品质可靠。",
    country: "中国",
    verificationStatus: "已认证",
    rating: 4.7,
    products: 52,
    founded: "2015年",
    shippingInfo: "全球发货，4-8天送达",
    contactPerson: "赵静",
    email: "contact@szwireless.com",
    phone: "+86 755-5432-1098",
  },
];

export default function SuppliersPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">供货商管理</h1>
            <p className="text-muted-foreground">查看和管理您的供货商</p>
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-md">
              <option>全部地区</option>
              <option>中国</option>
              <option>美国</option>
              <option>欧洲</option>
            </select>
            <select className="px-4 py-2 border rounded-md">
              <option>全部</option>
              <option>已认证</option>
              <option>审核中</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {/* 搜索和筛选区 */}
          <div className="flex items-center gap-4">
            <Input placeholder="搜索供应商名称..." className="max-w-sm" />
            <Button>搜索</Button>
          </div>

          {/* 供应商列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden">
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{supplier.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        {supplier.verificationStatus}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {supplier.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">产品数量</span>
                    <span>{supplier.products}个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">成立时间</span>
                    <span>{supplier.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">发货信息</span>
                    <span className="text-right">{supplier.shippingInfo}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        主营类目
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          电子产品
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          智能设备
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm">查看详情</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 分页 */}
          <div className="flex justify-center mt-6">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm">
                &lt;
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
