import { getTranslations } from 'next-intl/server';

import Advantages from '@/components/home/advantages';
import HomeBanner from '@/components/home/banner';
import Categories from '@/components/home/categories';
import DataOverview from '@/components/home/data-overview';
import FAQ from '@/components/home/faq';
// import FlashSale from '@/components/home/flash-sale';
import MustHaveSection from '@/components/home/must-have';
import PartnerBrands from '@/components/home/partner-brands';
import Products from '@/components/home/products';
// import Testimonials from '@/components/home/testimonials';
import Trending from '@/components/home/trending';
import WelcomeSection from '@/components/home/welcome';
import { listProducts } from '@/lib/actions/product';
import { listProductCategories } from '@/lib/actions/product-category';

// get hot products
async function getHotProducts() {
  return await listProducts({
    limit: 10,
    offset: 100,
  });
}

// get new products
async function getNewProducts() {
  return await listProducts({
    limit: 5,
    offset: 5,
  });
}

// get must have products
async function getMustHaveProducts() {
  return await listProducts({
    limit: 12,
    offset: 30,
  });
}

export default async function Home() {
  const t = await getTranslations();
  const categories = await listProductCategories({
    limit: 4,
    parent_category_id: 'null',
    expand: 'products',
  });

  const hotProducts = await getHotProducts();
  const newProducts = await getNewProducts();
  const mustHaveProducts = await getMustHaveProducts();
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

      {/* 商品分类 */}
      <Categories categories={categories} />

      {/* 商品展示 */}
      <Products hotProducts={hotProducts} newProducts={newProducts} />

      {/* 跨境爆款 */}
      <Trending />

      {/* 限时特惠 */}
      {/* <FlashSale /> */}

      {/* 新店必备 */}
      <MustHaveSection products={mustHaveProducts} />

      {/* 用户评价 */}
      {/*<Testimonials />*/}

      {/* 合作品牌 */}
      <PartnerBrands />

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

      {/* 常见问题 */}
      <FAQ />
    </div>
  );
}
