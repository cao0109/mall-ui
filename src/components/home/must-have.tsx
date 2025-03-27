// must-have

import { demoImages, products } from "@/app/[locale]/page";
import { ArrowRight, BadgePercent, Gift, Package, Truck } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function MustHaveSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">新店必备</h2>
          <p className="text-sm text-muted-foreground">精选高转化率商品</p>
        </div>
        <Button variant="ghost" className="gap-2">
          查看更多 <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 主推商品 */}
        <Card className="lg:col-span-4 overflow-hidden">
          <div className="relative aspect-[3/4]">
            <Image
              src={demoImages.products[0]}
              alt="Featured Product"
              className="w-full h-full object-cover"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      店铺爆款
                    </div>
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      利润率 45%
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">新店首选爆款</h3>
                  <p className="text-white/90 text-xs">
                    精选爆款商品，助您快速打造爆款店铺
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>月销 10000+</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      <span>48H发货</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">立即查看</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-white hover:bg-white/20"
                    >
                      收藏
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 推荐商品网格 */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product, index) => (
            <Card key={product.id} className="group">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="responsive"
                  width={1}
                  height={1}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute top-2 left-2">
                  <div className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    新店优选
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Button size="sm" variant="secondary" className="text-xs">
                    查看详情
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <h3 className="text-xs font-medium line-clamp-2 mb-1.5 leading-normal">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-primary">
                    ${product.price}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    月销{1000 - index * 100}+
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <div className="text-muted-foreground">
                    利润率 {product.profitMargin}%
                  </div>
                  <div className="text-muted-foreground">
                    ≥{product.minOrder}件
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 数据统计卡片 */}
        <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-primary">10000+</div>
                <div className="text-xs text-muted-foreground">月销量</div>
              </div>
            </div>
          </Card>
          <Card className="bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <BadgePercent className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-primary">45%</div>
                <div className="text-xs text-muted-foreground">平均利润</div>
              </div>
            </div>
          </Card>
          <Card className="bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-primary">48H</div>
                <div className="text-xs text-muted-foreground">极速发货</div>
              </div>
            </div>
          </Card>
          <Card className="bg-primary/5 p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">正品保障</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
