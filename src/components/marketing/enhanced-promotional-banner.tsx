'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Gift, ShoppingBag, TimerOff, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface EnhancedPromotionalBannerProps {
  variant?: 'primary' | 'secondary' | 'accent';
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  endDate?: string;
  backgroundImage?: string;
  features?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

export function EnhancedPromotionalBanner({
  variant = 'primary',
  title,
  description,
  buttonText,
  buttonLink,
  endDate,
  backgroundImage,
  features = [
    { icon: <ShoppingBag className="h-3.5 w-3.5" />, text: '爆款低至5折' },
    { icon: <Truck className="h-3.5 w-3.5" />, text: '免费配送' },
    { icon: <Gift className="h-3.5 w-3.5" />, text: '新用户额外优惠' },
  ],
}: EnhancedPromotionalBannerProps) {
  const variants = {
    primary: 'from-primary/80 to-primary text-white',
    secondary: 'from-gray-900 to-gray-800 text-white',
    accent: 'from-orange-500 to-pink-500 text-white',
  };

  // 添加倒计时功能
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!endDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl p-0 shadow-lg`}
    >
      {/* 背景图片或渐变 */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image src={backgroundImage} alt="促销背景" fill className="object-cover" priority />
          <div className={`absolute inset-0 bg-gradient-to-r from-black/70 to-transparent`} />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${variants[variant]}`} />
      )}

      <div className="relative z-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="inline-block rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">限时特惠</span>
          </div>
          <h3 className="text-xl font-bold text-white md:text-2xl">{title}</h3>
          <p className="max-w-md text-sm text-white/90 md:text-base">{description}</p>

          {/* 促销特点 */}
          <div className="mt-4 flex flex-wrap gap-3 md:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
              >
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          {/* 倒计时 */}
          {timeLeft && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <TimerOff className="h-3.5 w-3.5" />
                <span>活动倒计时</span>
              </div>
              <div className="flex gap-2">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">{timeLeft.days}</span>
                  <span className="text-[10px] text-white/70">天</span>
                </div>
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] text-white/70">时</span>
                </div>
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-white/70">分</span>
                </div>
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-white/10 backdrop-blur-sm">
                  <span className="text-sm font-bold text-white">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-white/70">秒</span>
                </div>
              </div>
            </div>
          )}

          <Button
            asChild
            size="lg"
            className="group mt-2 bg-white text-primary hover:bg-white/90 hover:text-primary/90"
          >
            <Link href={buttonLink}>
              <span className="font-semibold">{buttonText}</span>
              <motion.div
                className="ml-2 inline-block"
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.div>
            </Link>
          </Button>
        </div>
      </div>

      {/* 装饰性背景元素 */}
      <div className="absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute right-1/4 top-0 h-16 w-16 translate-y-1/2 transform rounded-full bg-white/10 blur-xl"></div>
    </motion.div>
  );
}
