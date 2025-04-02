'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaGlobeAsia, FaRegClock } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

interface PromotionalBannerProps {
  variant?: 'primary' | 'secondary' | 'accent';
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  endDate?: string;
}

export function PromotionalBanner({
  variant = 'primary',
  title,
  description,
  buttonText,
  buttonLink,
  endDate,
}: PromotionalBannerProps) {
  const variants = {
    primary: 'from-primary/80 to-primary text-white',
    secondary: 'from-gray-900 to-gray-800 text-white',
    accent: 'from-orange-500 to-pink-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${variants[variant]} p-6 shadow-lg`}
    >
      <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaGlobeAsia className="h-5 w-5" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-sm text-white/90">{description}</p>
          {endDate && (
            <div className="flex items-center gap-1 text-xs text-white/80">
              <FaRegClock className="h-3 w-3" />
              <span>活动截止：{endDate}</span>
            </div>
          )}
        </div>
        <Button asChild className="group bg-white/20 backdrop-blur-sm hover:bg-white/30">
          <Link href={buttonLink}>
            <span>{buttonText}</span>
            <FaArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      {/* 装饰性背景元素 */}
      <div className="absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl"></div>
    </motion.div>
  );
}
