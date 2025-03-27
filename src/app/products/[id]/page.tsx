"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSelectionStore } from "@/store/selection";
import {
  BarChart4,
  Clock,
  Globe,
  Package,
  ShoppingCart,
  TruckIcon,
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

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const { addProduct } = useSelectionStore();
  const [quantity, setQuantity] = useState(product.minOrder);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const handleAddToSelection = () => {
    addProduct({
      ...product,
      supplierLogo: product.supplierInfo.logo,
      suggestedPrice: product.price * (1 + product.profitMargin / 100),
      shopUrl: `/products/${product.id}`,
    });
    toast({
      title: "已加入选品",
      description: "商品已成功添加到选品列表",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <a href="/" className="hover:underline">
              首页
            </a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:underline">
              商品库
            </a>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* 商品图片 - 2列 */}
          <div className="space-y-4">
            <div className="aspect-square relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square relative cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 商品信息 - 2列 */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-red-500">
                ¥ {product.price.toFixed(2)}
              </p>
              <p className="text-gray-500">SKU: SP12345</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">供应商信息</h3>
              <Card className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={product.supplierInfo.logo}
                      alt={product.supplierInfo.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{product.supplierInfo.name}</p>
                    <p className="text-sm text-gray-500">
                      已合作{product.supplierInfo.established.split("年")[0]}年
                      | 发货准时率{product.supplierInfo.rating * 100}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">市场分析</h3>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <BarChart4 className="h-5 w-5 text-primary mr-2" />
                  <span>市场趋势: {product.marketAnalysis.marketTrend}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">月销量</h3>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-primary mr-2" />
                  <span>{product.marketAnalysis.salesVolume}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">利润分析</h3>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary text-white hover:bg-primary">
                    {product.profitMargin}% 利润
                  </Badge>
                  <span>利润空间: {product.marketAnalysis.profitSpace}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">数量</h3>
              <div className="flex items-center">
                <button
                  className="border rounded-l-md px-3 py-1 hover:bg-muted"
                  onClick={() =>
                    setQuantity(Math.max(product.minOrder, quantity - 10))
                  }
                  disabled={quantity <= product.minOrder}
                >
                  -
                </button>
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
                  className="border-t border-b w-16 text-center py-1"
                />
                <button
                  className="border rounded-r-md px-3 py-1 hover:bg-muted"
                  onClick={() => setQuantity(quantity + 10)}
                >
                  +
                </button>
                <span className="ml-2 text-sm text-muted-foreground">
                  最小订量: {product.minOrder}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">物流方式</h3>
              <Card className="p-4">
                <div className="space-y-2">
                  {product.shipping.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <TruckIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{option.method}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.time}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium">
                        ${option.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">发货地</h3>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Globe className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{product.origin}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">参考售价</h3>
              <Card className="p-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-2 text-muted-foreground line-through text-sm">
                    ${product.marketAnalysis.averagePrice}
                  </span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">推荐售价</h3>
              <Card className="p-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    $
                    {(product.price * (1 + product.profitMargin / 100)).toFixed(
                      2
                    )}
                  </span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">预计利润</h3>
              <Card className="p-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    ${((product.price * product.profitMargin) / 100).toFixed(2)}
                  </span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">利润分析</h3>
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      供货价
                    </div>
                    <div className="text-3xl font-bold">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="relative pt-4">
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed"></div>
                    <div className="text-sm text-muted-foreground mb-1">
                      推荐售价
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      $
                      {(
                        product.price *
                        (1 + product.profitMargin / 100)
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className="relative pt-4">
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed"></div>
                    <div className="text-sm text-muted-foreground mb-1">
                      预计利润
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      $
                      {((product.price * product.profitMargin) / 100).toFixed(
                        2
                      )}
                    </div>
                  </div>
                  <div className="relative pt-4">
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed"></div>
                    <div className="text-sm text-muted-foreground mb-1">
                      利润空间
                    </div>
                    <div className="text-lg font-bold">
                      {product.marketAnalysis.profitSpace}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">发货时间</h3>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>{product.shippingTime}</span>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">物流信息</h3>
              <Card className="p-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold">发货地</h4>
                    <p>{product.origin}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">物流方式</h4>
                    <p>{product.shipping.map((s) => s.method).join(", ")}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">同步到我的店铺</h3>
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToSelection}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                同步到我的店铺
              </Button>
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
      </div>
    </MainLayout>
  );
}
