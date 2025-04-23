'use client';

import { ProductCategory } from '@medusajs/medusa';
import { motion } from 'framer-motion';
import {
  BadgePercent,
  Flame,
  Package,
  Search,
  ShoppingBag,
  Tag,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface ProductMenuContentProps {
  product_categories?: ProductCategory[];
}

// 定义动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function ProductMenuContent({ product_categories }: ProductMenuContentProps) {
  const t = useTranslations();

  // 将产品分类分组
  const categoryGroups = product_categories
    ? [...Array(Math.ceil(product_categories.length / 8))].map((_, i) =>
        product_categories.slice(i * 8, i * 8 + 8)
      )
    : [];

  // 热门搜索关键词
  const hotSearchTerms = [
    { term: t('products.searchTerms.electronics'), badge: true },
    { term: t('products.searchTerms.clothing') },
    { term: t('products.searchTerms.homeDecor') },
    { term: t('products.searchTerms.beauty') },
  ];

  return (
    <motion.nav
      className="grid gap-6 p-6 md:w-[600px] md:grid-cols-[2fr_1fr] lg:w-[800px]"
      aria-label={t('products.categories')}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 左侧：分类和特色 */}
      <div className="space-y-6">
        {/* 产品分类标题 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {t('products.browseCategories')}
          </h2>
          <Link href="/products" className="text-xs text-primary hover:underline">
            {t('common.viewAll')}
          </Link>
        </div>

        {/* 分类网格 */}
        <div className="grid grid-cols-2 gap-4">
          {categoryGroups.length > 0 ? (
            categoryGroups[0].map((category, index) => (
              <motion.div key={category.id} variants={itemVariants} custom={index}>
                <Link
                  href={`/products?category_id=${category.id}`}
                  className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 transition-transform group-hover:scale-110">
                    {category.image ? (
                      <div className="relative h-7 w-7 overflow-hidden rounded-sm">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Package className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="line-clamp-1 text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('products.itemCount', { count: category.products?.length || 0 })}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
              {t('products.noCategories')}
            </div>
          )}
        </div>

        {/* 特色商品 */}
        <div className="space-y-3 border-t pt-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            {t('products.featuredCollections')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <motion.div variants={itemVariants}>
              <Link
                href="/products/featured/new"
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 transition-transform group-hover:scale-110">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1 text-sm font-medium">
                    {t('products.newArrivals')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t('products.justLaunched')}
                  </span>
                </div>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/products/featured/hot"
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100 transition-transform group-hover:scale-110 dark:bg-red-900/20">
                  <Flame className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1 text-sm font-medium">
                    {t('products.hotSelling')}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('products.trending')}</span>
                </div>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/products/featured/limited"
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-purple-100 transition-transform group-hover:scale-110 dark:bg-purple-900/20">
                  <Timer className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1 text-sm font-medium">
                    {t('products.limitedEdition')}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('products.exclusives')}</span>
                </div>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/products/featured/trending"
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 transition-transform group-hover:scale-110 dark:bg-blue-900/20">
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1 text-sm font-medium">{t('products.trending')}</span>
                  <span className="text-xs text-muted-foreground">{t('products.popularNow')}</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 右侧：促销和搜索 */}
      <div className="space-y-6">
        {/* 促销区域 */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">{t('products.promotions')}</h2>
          <motion.div
            className="rounded-lg border bg-gradient-to-br from-primary/5 to-background p-4"
            variants={itemVariants}
          >
            <Link href="/products/featured/sale" className="group flex flex-col">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 transition-transform group-hover:scale-110 dark:bg-green-900/20">
                <Tag className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-md font-semibold transition-colors group-hover:text-primary">
                {t('products.specialOffers')}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('products.discountDescription')}
              </p>
              <Badge className="mt-2 bg-primary px-2 py-0.5 text-xs">
                {t('products.limitedTime')}
              </Badge>
            </Link>
          </motion.div>
          <motion.div
            className="rounded-lg border bg-gradient-to-br from-amber-50 to-background p-4 dark:from-amber-900/10"
            variants={itemVariants}
          >
            <Link href="/products/featured/clearance" className="group flex flex-col">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-amber-100 transition-transform group-hover:scale-110 dark:bg-amber-900/20">
                <BadgePercent className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-md font-semibold transition-colors group-hover:text-primary">
                {t('products.clearanceSale')}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('products.clearanceDescription')}
              </p>
              <Badge className="mt-2 bg-amber-500 px-2 py-0.5 text-xs">
                {t('products.upTo')} 70% {t('products.off')}
              </Badge>
            </Link>
          </motion.div>
        </div>

        {/* 搜索热门推荐 */}
        <div className="space-y-3 border-t pt-3">
          <h2 className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            {t('products.popularSearches')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {hotSearchTerms.map((term, i) => (
              <motion.div key={i} variants={itemVariants} className="flex-none">
                <Link
                  href={`/products?search=${encodeURIComponent(term.term)}`}
                  className={cn(
                    'inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors hover:bg-accent',
                    term.badge && 'border-primary/30 bg-primary/5'
                  )}
                >
                  {term.badge && <Zap className="mr-1 h-3 w-3 text-primary" />}
                  {term.term}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 品牌商店按钮 */}
        <motion.div
          className="relative overflow-hidden rounded-lg border p-4"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-indigo-50 opacity-30 dark:bg-indigo-950 dark:opacity-20"></div>
          <Link href="/products/brands" className="group relative z-10 flex flex-col">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 transition-transform group-hover:scale-110 dark:bg-indigo-900/20">
              <ShoppingBag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-md font-semibold transition-colors group-hover:text-primary">
              {t('products.brandStores')}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t('products.brandStoreDescription')}
            </p>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
