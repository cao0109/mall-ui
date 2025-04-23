'use client';

import { useCart, useRegion } from 'medusa-react';
import { useTranslations } from 'next-intl';

import { useRegionStore } from '@/store/region';

interface PriceDisplayProps {
  prices?: Array<{
    amount: number;
    currency_code: string;
  }>;
  locale?: string;
  className?: string;
  showSuggestedPrice?: boolean;
  profitMargin?: number;
}

export function PriceDisplay({
  prices,
  locale = 'zh-CN',
  className = '',
  showSuggestedPrice = false,
  profitMargin = 30,
}: PriceDisplayProps) {
  const { regionId } = useRegionStore();
  const { cart } = useCart();
  const { region } = useRegion(regionId || '');
  const t = useTranslations();

  // 如果没有用户登录信息，可以添加登录提示
  // 这里假设已登录，如果需要可以添加相关逻辑

  // 如果没有价格或区域信息
  if (!prices || (!region && !cart?.region)) {
    return (
      <span className={`text-muted-foreground ${className}`}>{t('common.inquiryWelcome')}</span>
    );
  }

  // 获取当前区域的货币代码
  const currentCurrencyCode = region?.currency_code || cart?.region?.currency_code;

  if (!currentCurrencyCode) {
    return (
      <span className={`text-muted-foreground ${className}`}>{t('common.inquiryWelcome')}</span>
    );
  }

  // 查找匹配当前区域货币的价格
  const price = prices.find(price => price.currency_code === currentCurrencyCode);

  // 如果没有匹配的价格或价格为0
  if (!price || price.amount === 0) {
    return (
      <span className={`text-muted-foreground ${className}`}>{t('common.inquiryWelcome')}</span>
    );
  }

  // 计算建议售价
  const suggestedAmount = price.amount * (1 + profitMargin / 100);

  // 格式化价格
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency_code,
  }).format(price.amount / 100);

  // 格式化建议售价
  const formattedSuggestedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency_code,
  }).format(suggestedAmount / 100);

  return (
    <div className={className}>
      <div className="text-lg font-bold text-primary">{formattedPrice}</div>
      {showSuggestedPrice && (
        <div className="text-xs text-muted-foreground">
          {t('common.suggestedPrice')} {formattedSuggestedPrice}
        </div>
      )}
    </div>
  );
}
