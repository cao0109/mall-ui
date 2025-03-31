'use client';

import { MedusaCategories } from '@/components/products/filters';
import { ProductSkeleton } from '@/components/products/product-skeleton';
import { MedusaProducts } from '@/components/products/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { products } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Filter,
  LayoutGrid,
  LayoutList,
  Package,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import { useProducts } from 'medusa-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

// 模拟供应商数据
const suppliers = [
  { id: 1, name: '优品服饰', logo: '/suppliers/yupin.png', rating: 4.5 },
  { id: 2, name: '科技先锋', logo: '/suppliers/kejixian.png', rating: 4.2 },
  { id: 3, name: '音频专家', logo: '/suppliers/yinpin.png', rating: 4.8 },
  { id: 4, name: '电子科技', logo: '/suppliers/dianzi.png', rating: 4.3 },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [profitRange, setProfitRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(true);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [supplierSearchQuery, setSupplierSearchQuery] = useState('');
  const [filteredProductsCount, setFilteredProductsCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // 检查数据加载状态
  const { isLoading } = useProducts();

  // 初始加载
  useEffect(() => {
    // 页面首次加载时显示加载状态
    if (!isLoading && isInitialLoading) {
      // 延迟一点时间再隐藏加载状态，以确保所有组件都加载完成
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 500);
    }
  }, [isLoading, isInitialLoading]);

  // 检查屏幕宽度，在小屏幕上默认隐藏筛选器
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
    };

    // 初始检查
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 每页显示的商品数量 (移动设备显示更少)
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;

  // 过滤供应商
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(supplierSearchQuery.toLowerCase())
  );

  // 处理分类选择
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // 重置到第一页
    if (window.innerWidth < 768) {
      setIsFilterSheetOpen(false); // 在移动端选择后关闭筛选器面板
    }
  }, []);

  // 处理产品数量更新
  const handleProductsCount = useCallback((count: number) => {
    setFilteredProductsCount(count);
  }, []);

  // 计算总页数 (基于实际筛选后的产品数量)
  const totalPages = Math.ceil(filteredProductsCount / itemsPerPage);

  // 移动端筛选器内容
  const FiltersContent = () => (
    <div className="space-y-6 overflow-y-auto p-4">
      {/* 分类筛选 - 使用Medusa API获取 */}
      <MedusaCategories
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={categorySearchQuery}
        onSearchQueryChange={setCategorySearchQuery}
      />

      {/* 供应商筛选 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm font-semibold">供应商</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="搜索供应商..."
              value={supplierSearchQuery}
              onChange={e => setSupplierSearchQuery(e.target.value)}
              className="h-7 w-32 text-xs"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSupplier('all');
                setSupplierSearchQuery('');
              }}
              className="h-6 text-xs text-muted-foreground hover:text-primary"
            >
              重置
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent max-h-[300px] space-y-0.5 overflow-y-auto pr-2">
            <label className="sticky top-0 z-10 flex h-8 cursor-pointer items-center gap-2 rounded-md border-b bg-card px-2 transition-colors hover:bg-muted/50">
              <Checkbox
                checked={selectedSupplier === 'all'}
                onCheckedChange={() => {
                  setSelectedSupplier('all');
                  if (window.innerWidth < 768) {
                    setIsFilterSheetOpen(false);
                  }
                }}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span className="flex-1 text-sm font-medium">全部供应商</span>
              <Badge variant="secondary" className="font-normal">
                {suppliers.length}
              </Badge>
            </label>

            {filteredSuppliers.map(supplier => (
              <label
                key={supplier.id}
                className="group flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={selectedSupplier === supplier.name}
                  onCheckedChange={() => {
                    setSelectedSupplier(supplier.name);
                    if (window.innerWidth < 768) {
                      setIsFilterSheetOpen(false);
                    }
                  }}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-5 w-5 overflow-hidden rounded-full bg-muted">
                    {supplier.logo && (
                      <Image
                        src={supplier.logo}
                        alt={supplier.name}
                        width={20}
                        height={20}
                        layout="fixed"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <span className="flex-1 text-sm">{supplier.name}</span>
                </div>
                {supplier.rating && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs">{supplier.rating}</span>
                  </div>
                )}
                <Badge variant="secondary" className="ml-2 font-normal">
                  {products.filter(p => p.supplier.name === supplier.name).length}
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
          <h3 className="text-sm font-semibold">价格范围</h3>
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
          <div className="mt-2 flex items-center justify-between">
            <div className="flex h-7 items-center rounded-md border bg-muted/30 px-3">
              <span className="mr-1 text-xs text-muted-foreground">¥</span>
              <span className="text-sm">{priceRange[0]}</span>
            </div>
            <div className="text-muted-foreground">-</div>
            <div className="flex h-7 items-center rounded-md border bg-muted/30 px-3">
              <span className="mr-1 text-xs text-muted-foreground">¥</span>
              <span className="text-sm">{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 利润率范围 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm font-semibold">利润率范围</h3>
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
          <div className="mt-2 flex items-center justify-between">
            <div className="flex h-7 items-center rounded-md border bg-muted/30 px-3">
              <span className="text-sm">{profitRange[0]}</span>
              <span className="ml-1 text-xs text-muted-foreground">%</span>
            </div>
            <div className="text-muted-foreground">-</div>
            <div className="flex h-7 items-center rounded-md border bg-muted/30 px-3">
              <span className="text-sm">{profitRange[1]}</span>
              <span className="ml-1 text-xs text-muted-foreground">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 应用筛选按钮 - 仅在移动视图中显示 */}
      <div className="mt-6 md:hidden">
        <Button className="w-full" onClick={() => setIsFilterSheetOpen(false)}>
          应用筛选
        </Button>
      </div>
    </div>
  );

  // 如果初始加载中，显示骨架屏
  if (isInitialLoading) {
    return (
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="h-7 w-36 animate-pulse rounded-md bg-muted md:h-8" />
            <div className="mt-2 h-4 w-36 animate-pulse rounded bg-muted md:w-48" />
          </div>
          <div className="mt-4 flex items-center gap-2 md:mt-0 md:gap-4">
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted md:h-9" />
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted md:h-9" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* 桌面版筛选侧栏占位符 - 仅在md及以上显示 */}
          <div className="hidden w-72 flex-shrink-0 md:block">
            <div className="sticky top-4 rounded-lg border bg-card p-4 shadow-sm">
              <div className="space-y-6">
                {/* 分类骨架屏 */}
                <div className="animate-pulse">
                  <div className="h-5 w-24 rounded bg-muted" />
                  <div className="mt-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-6 w-full rounded bg-muted" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 md:space-y-6">
            {/* 搜索栏占位符 */}
            <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>
              <div className="flex items-center justify-between gap-2 md:justify-start">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted md:h-10 md:w-32" />
                <div className="h-10 w-24 animate-pulse rounded-md bg-muted md:h-10 md:w-20" />
              </div>
            </div>

            {/* 商品骨架屏 */}
            <ProductSkeleton
              viewMode={viewMode}
              count={typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
      {/* 页面标题和工具栏 */}
      <div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">商品库</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            共找到 {filteredProductsCount} 个商品
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-0 md:gap-4">
          {/* 桌面端筛选器切换按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:flex"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? '隐藏筛选' : '显示筛选'}
          </Button>

          {/* 移动端筛选器 Sheet */}
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="mr-auto flex md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] p-0 pt-8 sm:max-w-md">
              <div className="flex items-center justify-between border-b px-4 pb-2">
                <SheetTitle className="text-lg font-semibold">筛选选项</SheetTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterSheetOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FiltersContent />
            </SheetContent>
          </Sheet>

          <Button size="sm" className="ml-auto md:ml-0">
            <Package className="mr-2 h-4 w-4" />
            导入商品
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* 桌面端侧边栏筛选器 */}
        <div
          className={cn(
            'hidden w-72 flex-shrink-0 transition-all duration-300 ease-in-out md:block',
            showFilters ? 'translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0'
          )}
        >
          <div className="sticky top-4 rounded-lg border bg-card p-4 shadow-sm">
            <FiltersContent />
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 space-y-4 md:space-y-6">
          {/* 搜索和排序工具栏 */}
          <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索商品名称..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // 重置到第一页
                }}
                className="pl-9"
              />
            </div>
            <div className="flex items-center justify-between gap-2 md:justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 md:flex-none">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="md:hidden">排序</span>
                    <span className="hidden md:inline">
                      {sortBy === 'default' && '默认排序'}
                      {sortBy === 'price-asc' && '价格从低到高'}
                      {sortBy === 'price-desc' && '价格从高到低'}
                      {sortBy === 'profit-desc' && '利润率从高到低'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSortBy('default')}>默认排序</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-asc')}>
                    <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
                    价格从低到高
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-desc')}>
                    <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
                    价格从高到低
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('profit-desc')}>
                    <Star className="mr-2 h-4 w-4" />
                    利润率从高到低
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-1 rounded-lg border p-1">
                <Button
                  size="icon"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* 商品列表 - 使用Medusa商品数据 */}
          <MedusaProducts
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedSupplier={selectedSupplier}
            priceRange={priceRange}
            profitRange={profitRange}
            viewMode={viewMode}
            sortBy={sortBy}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onProductsCount={handleProductsCount}
          />

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center md:mt-8">
              <Pagination>
                <PaginationContent className="flex-wrap">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={cn(currentPage === 1 && 'pointer-events-none opacity-50')}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // 在移动端只显示当前页码和前后一页
                      if (window.innerWidth < 768) {
                        return (
                          page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
                        );
                      }
                      return true;
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {/* 显示省略号 */}
                        {index > 0 && page - array[index - 1] > 1 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={cn(currentPage === totalPages && 'pointer-events-none opacity-50')}
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
