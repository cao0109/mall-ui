'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Flame, Star, Timer, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { products } from '@/lib/data';

// 模拟更多产品数据
const extendedProducts = [
  ...products,
  ...products.map(p => ({ ...p, id: p.id + '_2' })),
  ...products.map(p => ({ ...p, id: p.id + '_3' })),
].slice(0, 8);

function FlashSaleProductCard({ product, index }: { product: any; index: number }) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  const discount = Math.floor(Math.random() * 30 + 20);
  const originalPrice = parseFloat(
    t(`home.products.items.${product.shopUrl.split('/').pop()}.price`)
  );
  const discountedPrice = originalPrice * (1 - discount / 100);
  const soldCount = Math.floor(Math.random() * 500 + 100);
  const remainingCount = Math.floor(Math.random() * 50 + 10);
  const progress = (soldCount / (soldCount + remainingCount)) * 100;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <motion.div
          className="absolute -right-2 -top-2 z-10 origin-center"
          animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
        >
          <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs font-bold">
            -{discount}%
          </Badge>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden rounded-xl bg-background shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          {/* 图片区域 */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.thumbnail || '/placeholder-product.png'}
              alt={t(`home.products.items.${product.shopUrl.split('/').pop()}.name`)}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              <span>{t('home.flashSale.endingSoon')}</span>
            </div>
          </div>

          {/* 内容区域 */}
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold">
              {t(`home.products.items.${product.shopUrl.split('/').pop()}.name`)}
            </h3>

            {/* 价格区域 */}
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-500">¥{discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">
                ¥{originalPrice.toFixed(2)}
              </span>
            </div>

            {/* 销售进度 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-red-500" />
                  {t('home.flashSale.sold', { count: soldCount })}
                </span>
                <span>{t('home.flashSale.remaining', { count: remainingCount })}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>

            {/* 底部信息 */}
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{product.supplier.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>{t('home.flashSale.shipping')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime: { hours: number; minutes: number; seconds: number }) => {
        const totalSeconds = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <div className="relative flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-500 to-rose-600 font-mono text-2xl font-bold text-white shadow-lg">
        <motion.span key={time.hours} initial={{ y: -40 }} animate={{ y: 0 }} className="absolute">
          {String(time.hours).padStart(2, '0')}
        </motion.span>
      </div>
      <div className="flex flex-col gap-1">
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-red-500"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className="h-1.5 w-1.5 rounded-full bg-red-500"
        />
      </div>
      <div className="relative flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-500 to-rose-600 font-mono text-2xl font-bold text-white shadow-lg">
        <motion.span
          key={time.minutes}
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          className="absolute"
        >
          {String(time.minutes).padStart(2, '0')}
        </motion.span>
      </div>
      <div className="flex flex-col gap-1">
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-red-500"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className="h-1.5 w-1.5 rounded-full bg-red-500"
        />
      </div>
      <div className="relative flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-500 to-rose-600 font-mono text-2xl font-bold text-white shadow-lg">
        <motion.span
          key={time.seconds}
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          className="absolute"
        >
          {String(time.seconds).padStart(2, '0')}
        </motion.span>
      </div>
    </div>
  );
}

export default function FlashSale() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevNext = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex(prev => {
      if (newDirection === -1) {
        return prev === 0 ? extendedProducts.length - 1 : prev - 1;
      }
      return prev === extendedProducts.length - 1 ? 0 : prev + 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  };

  return (
    <section
      className="relative min-h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-rose-50 p-8 dark:from-red-950/10 dark:to-rose-950/10"
      ref={containerRef}
    >
      {/* 装饰背景 */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-red-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 top-3/4 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Timer className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">{t('home.flashSale.title')}</h2>
            <p className="text-muted-foreground">{t('home.flashSale.subtitle')}</p>
          </div>
        </div>
        <CountdownTimer />
      </div>

      <div className="relative flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 z-10 h-12 w-12 rounded-full bg-background/80 shadow-lg backdrop-blur-sm"
          onClick={() => handlePrevNext(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="relative h-[500px] w-full overflow-hidden">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute grid w-full grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              extendedProducts[
                (activeIndex - 1 + extendedProducts.length) % extendedProducts.length
              ],
              extendedProducts[activeIndex],
              extendedProducts[(activeIndex + 1) % extendedProducts.length],
              extendedProducts[(activeIndex + 2) % extendedProducts.length],
            ].map((product, index) => (
              <FlashSaleProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 z-10 h-12 w-12 rounded-full bg-background/80 shadow-lg backdrop-blur-sm"
          onClick={() => handlePrevNext(1)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {extendedProducts.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === activeIndex ? 'w-6 bg-red-500' : 'bg-red-200'
            }`}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
}
