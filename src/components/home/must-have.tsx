'use client';

import { ChevronLeft, ChevronRight, InfoIcon, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { SectionHeader } from '@/components/home/section-header';
import { PriceDisplay } from '@/components/products/price-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { PricedProduct } from '@/types/product';

interface MustHaveSectionProps {
  products: PricedProduct[];
}

export default function MustHaveSection({ products }: MustHaveSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      const index = api.selectedScrollSnap();
      setCurrent(index + 1);
      setSelectedThumbnail(index);

      scrollToSelectedThumbnail(index);
    });

    return () => {
      api.off('select', () => {});
    };
  }, [api]);

  // 滚动到选中的缩略图
  const scrollToSelectedThumbnail = (index: number) => {
    if (!thumbnailsContainerRef.current) return;

    const thumbnailElement = thumbnailRefs.current[index];
    if (!thumbnailElement) return;

    const container = thumbnailsContainerRef.current;
    const containerWidth = container.offsetWidth;
    const thumbnailLeft = thumbnailElement.offsetLeft;
    const thumbnailWidth = thumbnailElement.offsetWidth;

    // 计算缩略图中心位置与容器中心的距离
    const containerCenter = container.scrollLeft + containerWidth / 2;
    const thumbnailCenter = thumbnailLeft + thumbnailWidth / 2;

    // 如果缩略图不在可视区域中心附近，滚动到使其居中
    if (Math.abs(containerCenter - thumbnailCenter) > containerWidth / 4) {
      container.scrollTo({
        left: thumbnailCenter - containerWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  // 点击缩略图导航到对应的轮播项
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setSelectedThumbnail(index);
      scrollToSelectedThumbnail(index);
    }
  };

  // 自定义导航按钮
  const customPrevButton = () => (
    <button
      onClick={() => api?.scrollPrev()}
      className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-md transition-all hover:bg-black/30 sm:left-4 md:left-6 md:h-12 md:w-12 lg:h-14 lg:w-14"
      aria-label="上一个产品"
    >
      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
    </button>
  );

  const customNextButton = () => (
    <button
      onClick={() => api?.scrollNext()}
      className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-md transition-all hover:bg-black/30 sm:right-4 md:right-6 md:h-12 md:w-12 lg:h-14 lg:w-14"
      aria-label="下一个产品"
    >
      <ChevronRight className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
    </button>
  );

  return (
    <section className="relative space-y-4 sm:space-y-6 md:space-y-8">
      <SectionHeader
        title="新店必备"
        subtitle="精选爆款，助力开店"
        icon={<ShoppingBag className="h-6 w-6 text-primary" />}
        action={{
          label: '查看更多',
          onClick: () => {},
        }}
      />

      <Card className="overflow-hidden border border-muted bg-gradient-to-b from-background to-muted/30 p-0 shadow-md sm:border-2 sm:shadow-lg">
        <CardContent className="p-0">
          <div className="relative">
            {/* 渐变进度条 */}
            <div className="relative h-1 w-full overflow-hidden bg-muted/30 sm:h-1.5">
              <div
                className="absolute h-full bg-gradient-to-r from-primary/90 to-primary/70 shadow-md"
                style={{
                  width: `${(current / count) * 100}%`,
                  transition: 'width 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
              />
            </div>

            {/* 主轮播 */}
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {products.map((product, index) => (
                  <CarouselItem key={product.id}>
                    <div className="grid grid-cols-1 overflow-hidden rounded-md lg:grid-cols-2 lg:rounded-xl">
                      {/* 商品图片 */}
                      <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                        <Image
                          src={product.thumbnail || ''}
                          alt={product.title || ''}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* 商品标签 */}
                        <div className="absolute left-3 top-3 flex gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
                          <Badge className="bg-primary/90 text-xs hover:bg-primary sm:text-sm">
                            爆款
                          </Badge>
                          {index % 2 === 0 && (
                            <Badge className="bg-amber-500 text-xs hover:bg-amber-600 sm:text-sm">
                              限时折扣
                            </Badge>
                          )}
                        </div>

                        {/* 仅在移动端显示的产品标题和价格 */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 lg:hidden">
                          <h3 className="line-clamp-2 text-lg font-bold text-white sm:text-xl">
                            {product.title}
                          </h3>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-lg font-bold text-white sm:text-xl">
                              <PriceDisplay
                                prices={product.variants[0].prices}
                                size="lg"
                                variant="default"
                                weight="bold"
                                priceClassName="text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 商品信息 - 桌面端 */}
                      <div className="hidden flex-col justify-between bg-muted/20 p-6 backdrop-blur-sm lg:flex">
                        <div className="space-y-4">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              商品编号: {product.handle}
                            </span>
                            <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground">
                              {product.title}
                            </h3>
                          </div>

                          <p className="line-clamp-3 text-sm text-muted-foreground">
                            {product.description ||
                              '这款产品品质卓越，深受买家喜爱。其独特设计和实用功能使其成为您店铺不可或缺的畅销品。适合各类消费者，满足多样化需求。'}
                          </p>

                          <div className="flex items-center gap-2 text-sm">
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              已有超过500家店铺选择该产品
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 space-y-6">
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="block text-xs text-muted-foreground">批发价</span>
                              <div className="text-3xl font-bold text-primary">
                                <PriceDisplay
                                  prices={product.variants[0].prices}
                                  size="2xl"
                                  weight="bold"
                                />
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button variant="outline" size="lg">
                                加入收藏
                              </Button>
                              <Link href={`/products/${product.id}`}>
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                  立即选购
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 商品信息 - 移动端简化版 */}
                      <div className="flex flex-col space-y-4 p-4 lg:hidden">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {product.description ||
                            '这款产品品质卓越，深受买家喜爱。其独特设计和实用功能使其成为您店铺不可或缺的畅销品。'}
                        </p>

                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                            <InfoIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>已有超过500家店铺选择</span>
                          </div>

                          <Link href={`/products/${product.id}`}>
                            <Button
                              size="sm"
                              className="h-8 bg-primary px-3 hover:bg-primary/90 sm:h-9 sm:px-4"
                            >
                              立即选购
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* 自定义导航按钮 */}
              {customPrevButton()}
              {customNextButton()}

              {/* 隐藏原始按钮但保留可访问性 */}
              <div className="sr-only">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          {/* 缩略图导航和商品计数 */}
          <div className="flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-muted/10 to-muted/30 px-3 py-3 sm:px-4 sm:py-4 md:flex-row md:px-6">
            {/* 缩略图导航 */}
            <div
              ref={thumbnailsContainerRef}
              className="scrollbar-hide flex w-full items-center gap-2 overflow-x-auto pb-1 sm:gap-3 md:w-auto md:pb-0"
            >
              <div className="m-4 flex items-center gap-1.5 sm:gap-2 md:gap-3">
                {products.map((product, index) => (
                  <button
                    key={`thumb-${product.id}`}
                    ref={el => {
                      thumbnailRefs.current[index] = el;
                    }}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      'md:h-18 md:w-18 group relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md transition-all sm:h-16 sm:w-16 lg:h-20 lg:w-20',
                      selectedThumbnail === index
                        ? 'ring-2 ring-primary ring-offset-1 sm:ring-offset-2'
                        : 'grayscale-50 opacity-80 hover:opacity-100 hover:grayscale-0'
                    )}
                  >
                    <Image
                      src={product.thumbnail || ''}
                      alt={`缩略图 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={cn(
                        'absolute inset-0 transition-colors',
                        selectedThumbnail !== index && 'group-hover:bg-black/10'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
