import { categories } from "@/app/page";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function Categories() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">热门分类</h2>
          <p className="text-sm text-muted-foreground">精选优质商品分类</p>
        </div>
        <Button variant="ghost" className="gap-1 sm:gap-2 text-sm sm:text-base">
          查看全部 <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group"
          >
            <Card className="overflow-hidden">
              <div className="relative h-32 sm:h-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  layout="fill"
                  priority
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {category.count} 个商品
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
