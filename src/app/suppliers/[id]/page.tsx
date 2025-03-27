"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Supplier, SupplierProduct } from "@/types/supplier";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
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
    description: "这是一个测试供应商",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function getSupplierProducts(
  supplierId: string
): Promise<SupplierProduct[]> {
  // TODO: Replace with actual API call
  return [
    {
      id: "1",
      supplierId,
      productId: "P001",
      productName: "测试产品1",
      productCode: "PRD001",
      price: 100,
      currency: "CNY",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
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
        <p className="text-lg">加载中...</p>
      </div>
    );
  }

  if (!supplier) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/suppliers")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {supplier.name}
              <Badge
                variant={supplier.status === "active" ? "default" : "secondary"}
              >
                {supplier.status === "active" ? "启用" : "禁用"}
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              供应商代码：{supplier.code}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              删除
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  联系人
                </p>
                <p className="text-lg mt-1">{supplier.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  联系电话
                </p>
                <p className="text-lg mt-1">{supplier.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  电子邮箱
                </p>
                <p className="text-lg mt-1">{supplier.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  创建时间
                </p>
                <p className="text-lg mt-1">
                  {new Date(supplier.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">
                  地址
                </p>
                <p className="text-lg mt-1">{supplier.address}</p>
              </div>
              {supplier.description && (
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    描述
                  </p>
                  <p className="text-lg mt-1">{supplier.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">供应商产品</TabsTrigger>
            <TabsTrigger value="orders">采购订单</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>产品列表</CardTitle>
                <Button size="sm">添加产品</Button>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={products} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>采购订单</CardTitle>
                <Button size="sm">新建订单</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">采购订单功能开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
