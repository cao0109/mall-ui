'use client';

import { Building2, Globe2, Package, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface EnhancedPromotionalBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
}

export function EnhancedPromotionalBanner({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  stats = [
    { label: '优质供应商', value: '1000+' },
    { label: '全球市场', value: '50+' },
    { label: '热销品类', value: '100+' },
  ],
}: EnhancedPromotionalBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-r from-primary/95 to-primary p-4 shadow-sm sm:p-6">
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
            <p className="max-w-md text-sm text-white/90">{description}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-2 bg-white text-primary hover:bg-white/90 hover:text-primary/90 sm:mt-0"
          >
            <Link href={buttonLink}>
              <span className="font-medium">{buttonText}</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-sm"
            >
              <div className="rounded-lg bg-white/20 p-2">
                {index === 0 && <Building2 className="h-5 w-5 text-white" />}
                {index === 1 && <Globe2 className="h-5 w-5 text-white" />}
                {index === 2 && <Package className="h-5 w-5 text-white" />}
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>高利润空间</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            <Package className="h-3.5 w-3.5" />
            <span>一件代发</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            <Globe2 className="h-3.5 w-3.5" />
            <span>全球市场</span>
          </div>
        </div>
      </div>

      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="促销背景"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}
    </div>
  );
}
