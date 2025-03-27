"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Search, SlidersHorizontal, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

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
    categories: ["电子产品", "智能设备", "消费电子"],
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
    categories: ["智能穿戴", "运动设备", "消费电子"],
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
    categories: ["电源设备", "充电设备", "电子配件"],
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
    categories: ["无线充电", "电源设备", "智能设备"],
    founded: "2015年",
    shippingInfo: "全球发货，4-8天送达",
    contactPerson: "赵静",
    email: "contact@szwireless.com",
    phone: "+86 755-5432-1098",
  },
];

// 所有可用的类目
const allCategories = Array.from(
  new Set(suppliers.flatMap((s) => s.categories))
).sort();

// 排序选项
const sortOptions = [
  { value: "rating", label: "评分最高" },
  { value: "products", label: "产品数量最多" },
  { value: "founded", label: "成立时间最早" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

// 地区选项
const regionOptions = [
  { value: "all", label: "全部地区" },
  { value: "china", label: "中国" },
  { value: "usa", label: "美国" },
  { value: "europe", label: "欧洲" },
] as const;

type RegionOption = (typeof regionOptions)[number]["value"];

export default function SuppliersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter((supplier) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          supplier.name.toLowerCase().includes(searchLower) ||
          supplier.description.toLowerCase().includes(searchLower);

        const matchesCategories =
          selectedCategories.length === 0 ||
          selectedCategories.some((cat) => supplier.categories.includes(cat));

        const matchesRegion =
          selectedRegion === "all" ||
          (selectedRegion === "china" && supplier.country === "中国") ||
          (selectedRegion === "usa" && supplier.country === "美国") ||
          (selectedRegion === "europe" && supplier.country === "欧洲");

        const matchesVerification =
          !showVerifiedOnly || supplier.verificationStatus === "已认证";

        return (
          matchesSearch &&
          matchesCategories &&
          matchesRegion &&
          matchesVerification
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "products":
            return b.products - a.products;
          case "founded":
            return parseInt(a.founded) - parseInt(b.founded);
          default:
            return 0;
        }
      });
  }, [
    searchQuery,
    selectedCategories,
    selectedRegion,
    sortBy,
    showVerifiedOnly,
  ]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">供应商目录</h1>
          <p className="text-muted-foreground">浏览和查找优质供应商</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[160px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 左侧筛选面板 - 添加 sticky 定位 */}
        <div className="w-64 space-y-6 sticky top-6 self-start">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">供应商类型</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={showVerifiedOnly}
                    onCheckedChange={(checked) =>
                      setShowVerifiedOnly(!!checked)
                    }
                  />
                  <Label htmlFor="verified">仅显示认证供应商</Label>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">主营类目</h3>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">所在地区</h3>
                <Select
                  value={selectedRegion}
                  onValueChange={(value) =>
                    setSelectedRegion(value as RegionOption)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择地区" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧内容区 - 保持不变 */}
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索供应商名称或描述..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
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

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {supplier.description}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">产品数量</span>
                    <span>{supplier.products}个</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">发货范围</span>
                    <span className="text-right max-w-[60%] line-clamp-1">
                      {supplier.shippingInfo}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        主营类目
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => router.push(`/suppliers/${supplier.id}`)}
                    >
                      查看详情
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

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
    </div>
  );
}
