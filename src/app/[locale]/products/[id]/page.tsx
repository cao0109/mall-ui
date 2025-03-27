"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSelectionStore } from "@/store/selection";
import { Product } from "@/types/product"; // 假设有一个Product类型定义
import {
  Building2,
  Calendar,
  ChevronRight,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";

// 模拟商品数据
const product = {
  id: 1,
  name: "无线蓝牙耳机",
  price: 15.99,
  image:
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  description: "高品质无线蓝牙耳机，支持主动降噪，续航时间长达24小时。",
  supplier: "Shenzhen Electronics Co.",
  origin: "中国",
  minOrder: 100,
  shippingTime: "3-5天",
  profitMargin: 35,
  specifications: {
    brand: "SoundPro",
    model: "SP-100",
    color: "黑色/白色",
    battery: "24小时续航",
    features: ["主动降噪", "蓝牙5.0", "触控操作", "语音助手"],
    weight: "250g",
    dimensions: "180 x 60 x 30mm",
  },
  images: [
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  ],
  marketAnalysis: {
    averagePrice: 29.99,
    competitorCount: 12,
    marketTrend: "上升",
    salesVolume: "月销5000+",
    profitSpace: "40-60%",
  },
  shipping: [
    { method: "普通", price: 2.5, time: "15-25天" },
    { method: "快速", price: 5.99, time: "7-12天" },
    { method: "特快", price: 12.99, time: "3-5天" },
  ],
  supplierInfo: {
    name: "Shenzhen Electronics Co.",
    logo: "https://images.unsplash.com/photo-1706722118380-c38a1b37c079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    responseTime: "≤5小时",
    verified: true,
    established: "2005年",
    products: 320,
  },
};

// 模拟推荐产品数据
const recommendedProducts: Product[] = [
  {
    id: 2,
    name: "有线耳机",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    profitMargin: 20,
    minOrder: 50,
    shippingTime: "3-5天",
    supplier: {
      name: "Supplier A",
      rating: 4.5,
      logo: "https://example.com/logo-a.png",
    },
  },
  {
    id: 3,
    name: "蓝牙音响",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    profitMargin: 25,
    minOrder: 30,
    shippingTime: "2-4天",
    supplier: {
      name: "Supplier B",
      rating: 4.0,
      logo: "https://example.com/logo-b.png",
    },
  },
  {
    id: 4,
    name: "运动耳机",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    profitMargin: 15,
    minOrder: 20,
    shippingTime: "5-7天",
    supplier: {
      name: "Supplier C",
      rating: 4.2,
      logo: "https://example.com/logo-c.png",
    },
  },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { addProduct } = useSelectionStore();
  const [quantity, setQuantity] = useState(product.minOrder);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const handleAddToSelection = () => {
    addProduct({
      ...product,
      supplier: {
        name: product.supplierInfo.name,
        logo: product.supplierInfo.logo,
        rating: product.supplierInfo.rating,
      },
      suggestedPrice: product.price * (1 + product.profitMargin / 100),
      shopUrl: `/products/${product.id}`,
    });
    toast({
      title: "已加入选品",
      description: "商品已成功添加到选品列表",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto py-8">
      {/* 面包屑导航 */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              首页
            </a>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </li>
          <li>
            <a
              href="/products"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              商品库
            </a>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </li>
          <li>
            <span className="text-foreground font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* 商品图片区 */}
        <div className="space-y-6">
          <div className="aspect-square relative rounded-xl overflow-hidden border bg-muted/10">
            <img
              src={selectedImage}
              alt={product.name}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "aspect-square relative rounded-lg overflow-hidden border bg-muted/10",
                  "hover:border-primary/50 transition-colors duration-200",
                  selectedImage === image && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 商品信息区 */}
        <div className="space-y-8">
          <div className="space-y-4 pb-6 border-b">
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <div className="text-4xl font-bold text-primary">
                ¥{product.price.toFixed(2)}
              </div>
              <div className="text-lg text-muted-foreground line-through">
                ¥{product.marketAnalysis.averagePrice}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                SKU: SP12345
              </Badge>
              <Badge variant="secondary" className="text-sm">
                库存充足
              </Badge>
            </div>
          </div>

          <Card className="bg-muted/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                供应商信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border bg-muted/10">
                  <img
                    src={product.supplierInfo.logo}
                    alt={product.supplierInfo.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{product.supplierInfo.name}</h3>
                    {product.supplierInfo.verified && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
                      >
                        已认证
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>成立{product.supplierInfo.established}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>{product.supplierInfo.products}+ 商品</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{product.supplierInfo.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-muted/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    月销量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {product.marketAnalysis.salesVolume}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    利润空间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {product.marketAnalysis.profitSpace}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">选择数量</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-md rounded-r-none"
                    onClick={() =>
                      setQuantity(Math.max(product.minOrder, quantity - 10))
                    }
                    disabled={quantity <= product.minOrder}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input
                    type="number"
                    min={product.minOrder}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          product.minOrder,
                          parseInt(e.target.value) || product.minOrder
                        )
                      )
                    }
                    className="h-10 w-20 border-y text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-md rounded-l-none"
                    onClick={() => setQuantity(quantity + 10)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  最小起订量：{product.minOrder}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button
                size="lg"
                className="w-full h-12"
                onClick={handleAddToSelection}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                加入选品
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 商品详细信息标签页 */}
      <Tabs defaultValue="details" className="mt-8">
        <TabsList>
          <TabsTrigger value="details">商品详情</TabsTrigger>
          <TabsTrigger value="specs">规格参数</TabsTrigger>
          <TabsTrigger value="shipping">物流信息</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <Card className="p-6">
            <div className="prose max-w-none">
              <h2>商品描述</h2>
              <p>{product.description}</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="mt-4">
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-500">品牌</p>
                <p>{product.specifications.brand}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">型号</p>
                <p>{product.specifications.model}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">颜色</p>
                <p>{product.specifications.color}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">电池续航</p>
                <p>{product.specifications.battery}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">重量</p>
                <p>{product.specifications.weight}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500">尺寸</p>
                <p>{product.specifications.dimensions}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">发货地</h3>
                <p>{product.origin}</p>
              </div>
              <div>
                <h3 className="font-semibold">物流方式</h3>
                <p>{product.shipping.map((s) => s.method).join(", ")}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 相关推荐产品模块 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">相关推荐产品</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xl text-primary">
                  ¥{product.price.toFixed(2)}
                </p>
                <a
                  href={`/products/${product.id}`}
                  className="text-blue-500 hover:underline"
                >
                  查看详情
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
