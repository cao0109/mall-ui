"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Supplier, SupplierProduct } from "@/types/supplier";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  Edit,
  Globe2,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { columns } from "./columns";

async function getSupplierData(id: string): Promise<Supplier> {
  // TODO: Replace with actual API call
  return {
    id,
    name: "测试供应商",
    code: "SUP001",
    contact: "张三",
    phone: "13800138000",
    email: "zhangsan@example.com",
    address: "北京市朝阳区xxx街道",
    description:
      "这是一个专业的跨境电商供应商，主要经营3C数码配件、智能家居等产品。我们拥有完整的供应链体系和质量控制体系，可以为客户提供优质的产品和服务。",
    status: "active",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=supplier1",
    rating: 4.8,
    totalOrders: 1280,
    totalProducts: 156,
    responseRate: 98,
    deliveryRate: 96,
    qualityScore: 95,
    mainCategories: ["3C数码", "智能家居", "户外运动"],
    certifications: ["ISO9001", "CE", "RoHS"],
    establishedYear: "2015",
    website: "https://example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function getSupplierProducts(
  supplierId: string
): Promise<SupplierProduct[]> {
  // TODO: Replace with actual API call
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    supplierId,
    productId: `P00${i + 1}`,
    productName: `测试产品${i + 1}`,
    productCode: `PRD00${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    currency: "CNY",
    status: Math.random() > 0.2 ? "active" : "inactive",
    image: `https://picsum.photos/seed/${i + 1}/200/200`,
    category: ["3C数码", "智能家居", "户外运动"][Math.floor(Math.random() * 3)],
    stock: Math.floor(Math.random() * 1000),
    sales: Math.floor(Math.random() * 500),
    rating: (Math.random() * 2 + 3).toFixed(1),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export default function SupplierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [supplierData, productsData] = await Promise.all([
          getSupplierData(id),
          getSupplierProducts(id),
        ]);
        setSupplier(supplierData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading supplier data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!supplier) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/suppliers")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={supplier.logo} alt={supplier.name} />
                  <AvatarFallback>
                    {supplier.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-3">
                    {supplier.name}
                    <Badge
                      variant={
                        supplier.status === "active" ? "default" : "secondary"
                      }
                      className="h-6"
                    >
                      {supplier.status === "active" ? "已认证" : "未认证"}
                    </Badge>
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-muted-foreground">
                      供应商代码：{supplier.code}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑资料
                </Button>
                <Button size="sm">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  浏览商品
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    质量评分
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">
                      {supplier.qualityScore}
                    </p>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>
              <Progress value={supplier.qualityScore} className="mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    总订单数
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {supplier.totalOrders.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    准时交付率
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">
                      {supplier.deliveryRate}%
                    </p>
                  </div>
                </div>
              </div>
              <Progress value={supplier.deliveryRate} className="mt-4" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    响应速度
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold">
                      {supplier.responseRate}%
                    </p>
                  </div>
                </div>
              </div>
              <Progress value={supplier.responseRate} className="mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>供应商简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {supplier.description}
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    主营类目
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.mainCategories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    认证资质
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map((cert) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">供应商产品</TabsTrigger>
              <TabsTrigger value="orders">采购订单</TabsTrigger>
              <TabsTrigger value="analytics">数据分析</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>产品列表</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      共 {supplier.totalProducts} 个产品
                    </p>
                  </div>
                  <Button>
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    添加产品
                  </Button>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={products} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>采购订单</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      近30天订单数：{Math.floor(supplier.totalOrders * 0.1)}
                    </p>
                  </div>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    新建订单
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-muted-foreground">
                      采购订单功能开发中...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>数据分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-muted-foreground">
                      数据分析功能开发中...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{supplier.contact}</p>
                    <p className="text-xs text-muted-foreground">联系人</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{supplier.phone}</p>
                    <p className="text-xs text-muted-foreground">联系电话</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{supplier.email}</p>
                    <p className="text-xs text-muted-foreground">电子邮箱</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{supplier.address}</p>
                    <p className="text-xs text-muted-foreground">地址</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>企业信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {supplier.establishedYear}年
                    </p>
                    <p className="text-xs text-muted-foreground">成立时间</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{supplier.website}</p>
                    <p className="text-xs text-muted-foreground">企业网站</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>热销产品</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[400px]">
              <CardContent>
                <div className="space-y-4">
                  {products
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start gap-3 group"
                      >
                        <Image
                          src={product.image}
                          alt={product.productName}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {product.productName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm font-semibold text-primary">
                              ¥{product.price}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              月销 {product.sales}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
