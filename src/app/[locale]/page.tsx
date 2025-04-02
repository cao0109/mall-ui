'use client';

import { useTranslations } from 'next-intl';

import Advantages from '@/components/home/advantages';
import HomeBanner from '@/components/home/banner';
import Categories from '@/components/home/categories';
import DataOverview from '@/components/home/data-overview';
import FAQ from '@/components/home/faq';
import FlashSale from '@/components/home/flash-sale';
import MustHaveSection from '@/components/home/must-have';
import Products from '@/components/home/products';
import Testimonials from '@/components/home/testimonials';
import Trending from '@/components/home/trending';
import WelcomeSection from '@/components/home/welcome';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container mx-auto space-y-16 py-6">
      {/* 轮播图区域 */}
      <HomeBanner
        title={t('home.banner.title')}
        subtitle={t('home.banner.subtitle')}
        cta={t('home.banner.cta')}
      />

      {/* 欢迎区域 */}
      <WelcomeSection
        title={t('home.welcome.title')}
        subtitle={t('home.welcome.subtitle')}
        description={t('home.welcome.description')}
      />

      {/* 数据概览 */}
      <DataOverview
        title={t('home.dataOverview.title')}
        items={[
          {
            label: t('home.dataOverview.items.suppliers.label'),
            value: t('home.dataOverview.items.suppliers.value'),
          },
          {
            label: t('home.dataOverview.items.products.label'),
            value: t('home.dataOverview.items.products.value'),
          },
          {
            label: t('home.dataOverview.items.buyers.label'),
            value: t('home.dataOverview.items.buyers.value'),
          },
          {
            label: t('home.dataOverview.items.countries.label'),
            value: t('home.dataOverview.items.countries.value'),
          },
        ]}
      />

      {/* 商城优势 */}
      <Advantages
        title={t('home.advantages.title')}
        items={[
          {
            title: t('home.advantages.items.quality.title'),
            description: t('home.advantages.items.quality.description'),
          },
          {
            title: t('home.advantages.items.price.title'),
            description: t('home.advantages.items.price.description'),
          },
          {
            title: t('home.advantages.items.shipping.title'),
            description: t('home.advantages.items.shipping.description'),
          },
          {
            title: t('home.advantages.items.service.title'),
            description: t('home.advantages.items.service.description'),
          },
        ]}
      />

      {/* 商品分类 */}
      <Categories />

      {/* 跨境爆款 */}
      <Trending />

      {/* 商品展示 */}
      <Products />

      {/* 限时特惠 */}
      <FlashSale />

      {/* 新店必备 */}
      <MustHaveSection />

      {/* 用户评价 */}
      <Testimonials />

      {/* 常见问题 */}
      <FAQ />
    </div>
  );
}
