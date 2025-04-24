'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { useCart, useRegion } from 'medusa-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { useRegionStore } from '@/store/region';

// 定义价格显示的变体样式
const priceDisplayVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-green-600 dark:text-green-400',
      destructive: 'text-red-600 dark:text-red-400',
      muted: 'text-muted-foreground',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    weight: 'normal',
  },
});

interface PriceDisplayProps extends VariantProps<typeof priceDisplayVariants> {
  prices?: Array<{
    amount: number;
    currency_code: string;
  }>;
  locale?: string;
  className?: string;
  showSuggestedPrice?: boolean;
  profitMargin?: number;
  showCurrencyCode?: boolean;
  showDiscountBadge?: boolean;
  discountPercentage?: number;
  originalPrice?: number;
  animate?: boolean;
  containerClassName?: string;
  suggestedPriceClassName?: string;
  discountBadgeClassName?: string;
  currencyCodeClassName?: string;
  priceClassName?: string;
  showLoginPrompt?: boolean;
  loginPromptClassName?: string;
  currencyPosition?: 'before' | 'after';
  thousandsSeparator?: string;
  decimalSeparator?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compactDisplay?: boolean;
  showOriginalPrice?: boolean;
  originalPriceClassName?: string;
}

export function PriceDisplay({
  prices,
  locale = 'zh-CN',
  className,
  showSuggestedPrice = false,
  profitMargin = 30,
  size,
  variant,
  weight,
  showCurrencyCode = false,
  showDiscountBadge = false,
  discountPercentage,
  originalPrice,
  animate = true,
  containerClassName,
  suggestedPriceClassName,
  discountBadgeClassName,
  currencyCodeClassName,
  priceClassName,
  showLoginPrompt = true,
  loginPromptClassName,
  thousandsSeparator = ',',
  decimalSeparator = '.',
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  compactDisplay = false,
  showOriginalPrice = false,
  originalPriceClassName,
}: PriceDisplayProps) {
  const { regionId } = useRegionStore();
  const { cart } = useCart();
  const { region } = useRegion(regionId || '');
  const t = useTranslations();

  // 如果没有价格或区域信息
  if (!prices || (!region && !cart?.region)) {
    return showLoginPrompt ? (
      <span className={cn('text-muted-foreground', loginPromptClassName)}>
        {t('common.inquiryWelcome')}
      </span>
    ) : null;
  }

  // 获取当前区域的货币代码
  const currentCurrencyCode = region?.currency_code || cart?.region?.currency_code;

  if (!currentCurrencyCode) {
    return showLoginPrompt ? (
      <span className={cn('text-muted-foreground', loginPromptClassName)}>
        {t('common.inquiryWelcome')}
      </span>
    ) : null;
  }

  // 查找匹配当前区域货币的价格
  const price = prices.find(price => price.currency_code === currentCurrencyCode);

  // 如果没有匹配的价格或价格为0
  if (!price || price.amount === 0) {
    return showLoginPrompt ? (
      <span className={cn('text-muted-foreground', loginPromptClassName)}>
        {t('common.inquiryWelcome')}
      </span>
    ) : null;
  }

  // 计算建议售价
  const suggestedAmount = price.amount * (1 + profitMargin / 100);

  // 格式化选项
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: price.currency_code,
    currencyDisplay: showCurrencyCode ? 'code' : 'symbol',
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping: true,
  };

  if (compactDisplay) {
    formatOptions.notation = 'compact';
  }

  // 格式化价格
  const formattedPrice = new Intl.NumberFormat(locale, formatOptions)
    .format(price.amount / 100)
    .replace(',', thousandsSeparator)
    .replace('.', decimalSeparator);

  // 格式化建议售价
  const formattedSuggestedPrice = new Intl.NumberFormat(locale, formatOptions)
    .format(suggestedAmount / 100)
    .replace(',', thousandsSeparator)
    .replace('.', decimalSeparator);

  // 格式化原价
  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat(locale, formatOptions)
        .format(originalPrice / 100)
        .replace(',', thousandsSeparator)
        .replace('.', decimalSeparator)
    : null;

  return (
    <div className={cn('flex flex-col', containerClassName)}>
      <div className={cn('flex items-center gap-2', className)}>
        {showDiscountBadge && discountPercentage && (
          <motion.div
            initial={animate ? { scale: 0 } : undefined}
            animate={animate ? { scale: 1 } : undefined}
            className={cn(
              'rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400',
              discountBadgeClassName
            )}
          >
            -{discountPercentage}%
          </motion.div>
        )}
        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          className={cn(priceDisplayVariants({ size, variant, weight }), priceClassName)}
        >
          {formattedPrice}
        </motion.div>
        {showCurrencyCode && (
          <span
            className={cn(
              'text-xs text-muted-foreground dark:text-muted-foreground/70',
              currencyCodeClassName
            )}
          >
            {price.currency_code.toUpperCase()}
          </span>
        )}
      </div>

      {showOriginalPrice && formattedOriginalPrice && (
        <motion.div
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          className={cn(
            'text-sm text-muted-foreground line-through dark:text-muted-foreground/70',
            originalPriceClassName
          )}
        >
          {formattedOriginalPrice}
        </motion.div>
      )}

      {showSuggestedPrice && (
        <motion.div
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          className={cn(
            'text-xs text-muted-foreground dark:text-muted-foreground/70',
            suggestedPriceClassName
          )}
        >
          {t('common.suggestedPrice')} {formattedSuggestedPrice}
        </motion.div>
      )}
    </div>
  );
}
