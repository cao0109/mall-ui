'use client';

import { ProductCard } from '@/components/products/product-card';
import { ProductSkeleton } from '@/components/products/product-skeleton';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useProducts } from 'medusa-react';
import { useEffect } from 'react';

interface MedusaProductsProps {
  searchQuery: string;
  selectedCategory: string;
  selectedSupplier: string;
  priceRange: number[];
  profitRange: number[];
  viewMode: 'grid' | 'list';
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;
  onProductsCount?: (count: number) => void;
}

export function PaginationProducts({
  searchQuery,
  selectedCategory,
  selectedSupplier,
  priceRange,
  profitRange,
  viewMode,
  sortBy,
  currentPage,
  itemsPerPage,
  onProductsCount,
}: MedusaProductsProps) {
  // API调用
  const { products, isLoading, error } = useProducts({
    limit: 100,
    expand: 'categories,variants,variants.prices,collection',
    category_id: selectedCategory !== 'all' ? [selectedCategory] : undefined,
    q: searchQuery || undefined,
  });

  // 过滤产品
  const filteredProducts =
    !isLoading && !error && products
      ? products.filter(product => {
          // 搜索筛选（API已处理部分，这里是额外检查）
          const matchesSearch = searchQuery
            ? product.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false
            : true;

          // 分类筛选（API已处理部分，这里是额外检查）
          let matchesCategory = selectedCategory === 'all';
          if (!matchesCategory && product.categories && product.categories.length > 0) {
            matchesCategory = product.categories.some(
              category =>
                selectedCategory === category.id ||
                (category.parent_category && selectedCategory === category.parent_category.id)
            );
          }

          // 供应商筛选
          const matchesSupplier =
            selectedSupplier === 'all' ||
            (product.collection && product.collection.title === selectedSupplier);

          // 价格筛选
          const productPrice = product.variants?.[0]?.prices?.[0]?.amount || 0;
          const matchesPrice =
            productPrice >= priceRange[0] * 100 && productPrice <= priceRange[1] * 100;

          // 利润率筛选
          let profitMargin = 30; // 默认值
          if (product.metadata && product.metadata.profit_margin) {
            profitMargin = Number(product.metadata.profit_margin);
          }
          const matchesProfit = profitMargin >= profitRange[0] && profitMargin <= profitRange[1];

          return (
            matchesSearch && matchesCategory && matchesSupplier && matchesPrice && matchesProfit
          );
        })
      : [];

  // 通知父组件过滤后的产品数量
  useEffect(() => {
    if (onProductsCount) {
      onProductsCount(filteredProducts.length);
    }
  }, [filteredProducts.length, onProductsCount]);

  // 排序产品
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.variants?.[0]?.prices?.[0]?.amount || 0;
    const priceB = b.variants?.[0]?.prices?.[0]?.amount || 0;

    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'profit-desc':
        const profitA = Number(a.metadata?.profit_margin || 30);
        const profitB = Number(b.metadata?.profit_margin || 30);
        return profitB - profitA;
      default:
        return 0;
    }
  });

  // 分页
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 转换产品格式
  const transformedProducts = paginatedProducts.map(product => {
    const price = product.variants?.[0]?.prices?.[0]?.amount || 0;
    const suggestedPrice = Math.round(price * 1.3); // 增加30%作为建议售价

    let profitMargin = 30;
    if (product.metadata && product.metadata.profit_margin) {
      profitMargin = Number(product.metadata.profit_margin);
    }

    return {
      id: product.id || 'unknown-id',
      name: product.title || 'Unnamed Product',
      description: product.description || '',
      thumbnail: product.thumbnail || '/placeholder-product.png',
      image: product.thumbnail || '/placeholder-product.png',
      price: price / 100,
      suggestedPrice: suggestedPrice / 100,
      profitMargin: profitMargin,
      minOrder: product.metadata?.min_order ? Number(product.metadata.min_order) : 1,
      shippingTime: product.metadata?.shipping_time?.toString() || '3-5天',
      supplier: {
        name: product.collection?.title || '默认供应商',
        logo: '/suppliers/default.png',
        rating: 4.5,
      },
      categoryId: product.categories?.[0]?.id,
    };
  });

  // 加载中状态 - 使用骨架屏
  if (isLoading) {
    return <ProductSkeleton viewMode={viewMode} count={itemsPerPage} />;
  }

  // 错误状态
  if (error) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
        <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">加载商品失败: {error.message}</p>
      </div>
    );
  }

  // 无结果状态
  if (transformedProducts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
        <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">暂无符合条件的商品</p>
      </div>
    );
  }

  // 渲染产品列表
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        )}
      >
        {transformedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            <ProductCard product={product} viewMode={viewMode} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
