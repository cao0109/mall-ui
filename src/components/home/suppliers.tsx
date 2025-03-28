"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, LayoutGrid, Mail, Star } from "lucide-react";
import Image from "next/image";

export default function Suppliers() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">优质供应商</h2>
          <p className="text-muted-foreground">
            精选优质供应商，一站式采购更便捷
          </p>
        </div>
        <Button variant="ghost" className="group">
          查看更多
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="group overflow-hidden border-none bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                  <Image
                    src={`https://picsum.photos/seed/supplier${
                      index + 1
                    }/200/200`}
                    alt={`供应商${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                    优质供应商 {index + 1}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {(4 + Math.random()).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {1000 + index * 100}+ 订单
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  已认证
                </Badge>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">主营类目</span>
                  <div className="flex gap-2">
                    {["3C数码", "智能家居", "户外运动"]
                      .slice(0, 2)
                      .map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="font-normal"
                        >
                          {category}
                        </Badge>
                      ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-semibold text-primary">
                      {95 + index}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      准时交付
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-primary">
                      {98 - index}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      响应速度
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-primary">
                      {96 + index}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      好评率
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    联系供应商
                  </Button>
                  <Button className="w-full" size="sm">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    查看商品
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
