"use client";

import { categories, products } from "@/app/[locale]/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronRight,
  Filter,
  LayoutGrid,
  LayoutList,
  Package,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// 模拟供应商数据
const suppliers = [
  { id: 1, name: "优品服饰", logo: "/suppliers/yupin.png", rating: 4.5 },
  { id: 2, name: "科技先锋", logo: "/suppliers/kejixian.png", rating: 4.2 },
  { id: 3, name: "音频专家", logo: "/suppliers/yinpin.png", rating: 4.8 },
  { id: 4, name: "电子科技", logo: "/suppliers/dianzi.png", rating: 4.3 },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [profitRange, setProfitRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(true);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [supplierSearchQuery, setSupplierSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // 每页显示的商品数量
  const itemsPerPage = 12;

  // 过滤供应商
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase())
  );

  // 根据筛选条件过滤商品
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSupplier =
      selectedSupplier === "all" || product.supplier.name === selectedSupplier;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesProfit =
      product.profitMargin >= profitRange[0] &&
      product.profitMargin <= profitRange[1];

    // 分类匹配逻辑
    let matchesCategory = selectedCategory === "all";
    if (!matchesCategory && product.categoryId) {
      if (selectedCategory.includes("-")) {
        // 子分类匹配
        matchesCategory = product.categoryId === selectedCategory;
      } else {
        // 主分类匹配
        matchesCategory = product.categoryId.startsWith(selectedCategory);
      }
    }

    return (
      matchesSearch &&
      matchesSupplier &&
      matchesCategory &&
      matchesPrice &&
      matchesProfit
    );
  });

  // 排序商品
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "profit-desc":
        return b.profitMargin - a.profitMargin;
      default:
        return 0;
    }
  });

  // 分页
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 过滤分类
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  const toggleCategory = (id: string) => {
    if (expandedCategories.includes(id)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== id));
    } else {
      setExpandedCategories([...expandedCategories, id]);
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* 页面标题和工具栏 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">商品库</h1>
          <p className="text-sm text-muted-foreground mt-1">
            共找到 {filteredProducts.length} 个商品
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "隐藏筛选" : "显示筛选"}
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            导入商品
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 侧边栏筛选器 */}
        <div
          className={cn(
            "w-72 flex-shrink-0 transition-all duration-300 ease-in-out",
            showFilters
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full w-0"
          )}
        >
          <div className="sticky top-4 border rounded-lg bg-card p-4 shadow-sm">
            <div className="space-y-6">
              {/* 分类筛选 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-sm">商品分类</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="搜索分类..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className="h-7 text-xs w-32"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all");
                        setCategorySearchQuery("");
                      }}
                      className="h-6 text-xs text-muted-foreground hover:text-primary"
                    >
                      重置
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="space-y-0.5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
                    <label className="flex items-center h-8 gap-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors sticky top-0 bg-card z-10 border-b">
                      <Checkbox
                        checked={selectedCategory === "all"}
                        onCheckedChange={() => setSelectedCategory("all")}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <span className="text-sm flex-1 font-medium">
                        全部分类
                      </span>
                      <Badge variant="secondary" className="font-normal">
                        {products.length}
                      </Badge>
                    </label>

                    {filteredCategories.map((category) => (
                      <div key={category.id} className="space-y-0.5">
                        <label
                          className={cn(
                            "flex items-center h-8 gap-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors",
                            category.children?.length && "mb-1"
                          )}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {category.children?.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleCategory(String(category.id));
                                }}
                              >
                                <ChevronRight
                                  className={cn(
                                    "h-3 w-3 text-muted-foreground transition-transform",
                                    expandedCategories.includes(
                                      String(category.id)
                                    ) && "rotate-90"
                                  )}
                                />
                              </Button>
                            )}
                            <Checkbox
                              checked={selectedCategory === String(category.id)}
                              onCheckedChange={() =>
                                setSelectedCategory(String(category.id))
                              }
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <span className="text-sm flex-1 font-medium">
                              {category.name}
                            </span>
                          </div>
                          <Badge variant="secondary" className="font-normal">
                            {category.count}
                          </Badge>
                        </label>

                        {category.children &&
                          expandedCategories.includes(String(category.id)) && (
                            <div className="ml-6 pl-4 border-l border-dashed space-y-0.5">
                              {category.children.map((subCategory) => (
                                <label
                                  key={subCategory.id}
                                  className="flex items-center h-8 gap-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors group"
                                >
                                  <Checkbox
                                    checked={
                                      selectedCategory ===
                                      `${category.id}-${subCategory.id}`
                                    }
                                    onCheckedChange={() =>
                                      setSelectedCategory(
                                        `${category.id}-${subCategory.id}`
                                      )
                                    }
                                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                  />
                                  <span className="text-sm flex-1 text-muted-foreground group-hover:text-foreground transition-colors">
                                    {subCategory.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="font-normal"
                                  >
                                    {subCategory.count}
                                  </Badge>
                                </label>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}

                    {filteredCategories.length === 0 && (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        未找到匹配的分类
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 供应商筛选 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-sm">供应商</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="搜索供应商..."
                      value={supplierSearchQuery}
                      onChange={(e) => setSupplierSearchQuery(e.target.value)}
                      className="h-7 text-xs w-32"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedSupplier("all");
                        setSupplierSearchQuery("");
                      }}
                      className="h-6 text-xs text-muted-foreground hover:text-primary"
                    >
                      重置
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="space-y-0.5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
                    <label className="flex items-center h-8 gap-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors sticky top-0 bg-card z-10 border-b">
                      <Checkbox
                        checked={selectedSupplier === "all"}
                        onCheckedChange={() => setSelectedSupplier("all")}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <span className="text-sm flex-1 font-medium">
                        全部供应商
                      </span>
                      <Badge variant="secondary" className="font-normal">
                        {suppliers.length}
                      </Badge>
                    </label>

                    {filteredSuppliers.map((supplier) => (
                      <label
                        key={supplier.id}
                        className="flex items-center h-8 gap-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors group"
                      >
                        <Checkbox
                          checked={selectedSupplier === supplier.name}
                          onCheckedChange={() =>
                            setSelectedSupplier(supplier.name)
                          }
                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <div className="h-5 w-5 rounded-full overflow-hidden bg-muted">
                            {supplier.logo && (
                              <img
                                src={supplier.logo}
                                alt={supplier.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <span className="text-sm flex-1">
                            {supplier.name}
                          </span>
                        </div>
                        {supplier.rating && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs">{supplier.rating}</span>
                          </div>
                        )}
                        <Badge variant="secondary" className="font-normal ml-2">
                          {
                            products.filter(
                              (p) => p.supplier.name === supplier.name
                            ).length
                          }
                        </Badge>
                      </label>
                    ))}

                    {filteredSuppliers.length === 0 && (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        未找到匹配的供应商
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 价格范围 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-sm">价格范围</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPriceRange([0, 1000])}
                    className="h-6 text-xs text-muted-foreground hover:text-primary"
                  >
                    重置
                  </Button>
                </div>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={10}
                    className="mt-6"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center h-7 px-3 border rounded-md bg-muted/30">
                      <span className="text-xs text-muted-foreground mr-1">
                        ¥
                      </span>
                      <span className="text-sm">{priceRange[0]}</span>
                    </div>
                    <div className="text-muted-foreground">-</div>
                    <div className="flex items-center h-7 px-3 border rounded-md bg-muted/30">
                      <span className="text-xs text-muted-foreground mr-1">
                        ¥
                      </span>
                      <span className="text-sm">{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 利润率范围 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-semibold text-sm">利润率范围</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setProfitRange([0, 100])}
                    className="h-6 text-xs text-muted-foreground hover:text-primary"
                  >
                    重置
                  </Button>
                </div>
                <div className="px-2">
                  <Slider
                    value={profitRange}
                    onValueChange={setProfitRange}
                    min={0}
                    max={100}
                    step={5}
                    className="mt-6"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center h-7 px-3 border rounded-md bg-muted/30">
                      <span className="text-sm">{profitRange[0]}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        %
                      </span>
                    </div>
                    <div className="text-muted-foreground">-</div>
                    <div className="flex items-center h-7 px-3 border rounded-md bg-muted/30">
                      <span className="text-sm">{profitRange[1]}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 space-y-6">
          {/* 搜索和排序工具栏 */}
          <div className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索商品名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  {sortBy === "default" && "默认排序"}
                  {sortBy === "price-asc" && "价格从低到高"}
                  {sortBy === "price-desc" && "价格从高到低"}
                  {sortBy === "profit-desc" && "利润率从高到低"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("default")}>
                  默认排序
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-asc")}>
                  <ArrowUpNarrowWide className="h-4 w-4 mr-2" />
                  价格从低到高
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-desc")}>
                  <ArrowDownNarrowWide className="h-4 w-4 mr-2" />
                  价格从高到低
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("profit-desc")}>
                  <Star className="h-4 w-4 mr-2" />
                  利润率从高到低
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                size="icon"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 商品列表 */}
          {currentProducts.length > 0 ? (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              )}
            >
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  className={cn(
                    "group overflow-hidden hover:border-primary/50 transition-colors duration-300",
                    viewMode === "list" && "flex"
                  )}
                >
                  <div
                    className={cn(
                      "relative",
                      viewMode === "grid" && "aspect-square",
                      viewMode === "list" && "w-48"
                    )}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/80 shadow-sm"
                      >
                        利润率 {product.profitMargin}%
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="w-full bg-white/90 hover:bg-white text-primary shadow-sm"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full overflow-hidden bg-muted">
                        {product.supplier.logo && (
                          <img
                            src={product.supplier.logo}
                            alt={product.supplier.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.supplier.name}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">
                          {product.supplier.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {viewMode === "list" && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          ¥{product.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          建议售价 ¥{product.suggestedPrice}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        同步商品
                      </Button>
                    </div>
                    <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                      <span>≥{product.minOrder}件起订</span>
                      <span>{product.shippingTime}发货</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">暂无符合条件的商品</p>
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={cn(
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={cn(
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
