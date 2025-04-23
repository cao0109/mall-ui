'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

// 品牌数据（使用适合电商分销平台的品牌）
const BRANDS = [
  {
    id: 1,
    name: 'Shopify',
    logo: 'https://dianshangjun.com/wp-content/uploads/2021/06/Shopify.jpg',
    url: 'https://www.shopify.com',
  },
  {
    id: 2,
    name: 'Amazon',
    logo: 'https://static.vecteezy.com/system/resources/previews/018/779/927/original/3d-illustration-of-amazon-logo-free-png.png',
    url: 'https://www.amazon.com',
  },
  {
    id: 3,
    name: 'Alibaba',
    logo: 'https://cdn-1.webcatalog.io/catalog/alibaba/alibaba-icon.png',
    url: 'https://www.alibaba.com',
  },
  {
    id: 4,
    name: 'eBay',
    logo: 'https://toppng.com/uploads/preview/ebay-logo-png-hd-11659520827vtx2fhue9j.png',
    url: 'https://www.ebay.com',
  },
  {
    id: 5,
    name: 'Walmart',
    logo: 'https://logo800.cn/uploads/logoxinshang/57/logo800_16491625664825691.png',
    url: 'https://www.walmart.com',
  },
  {
    id: 6,
    name: 'Target',
    logo: 'https://logolook.net/wp-content/uploads/2021/06/Target-Logo-2004-2048x1152.png',
    url: 'https://www.target.com',
  },
  {
    id: 7,
    name: 'Wix',
    logo: 'https://static-wix-blog.wix.com/blog/wp-content/uploads/2018/02/logo-white-01.png',
    url: 'https://www.wix.com',
  },
  {
    id: 8,
    name: 'Etsy',
    logo: 'https://logos-world.net/wp-content/uploads/2020/12/Etsy-Emblem.png',
    url: 'https://www.etsy.com',
  },
  {
    id: 9,
    name: 'Wayfair',
    logo: 'https://pic3.zhimg.com/v2-5145159519f71965e216c94ee30eafe3_720w.jpg?source=172ae18b',
    url: 'https://www.wayfair.com',
  },
  {
    id: 10,
    name: 'JD.com',
    logo: 'https://www.jd.com/favicon.ico',
    url: 'https://www.jd.com',
  },
];

export default function PartnerBrands() {
  const t = useTranslations();
  const brandsContainerRef = useRef<HTMLDivElement>(null);

  // 容器动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // 品牌项目动画
  const brandItemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <div className="mb-16 max-w-3xl">
          <motion.h2
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('home.partnerBrands.title')}
          </motion.h2>
          <motion.h3
            className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            全球领先电商平台的<span className="text-primary">合作伙伴</span>
          </motion.h3>
          <motion.p
            className="mb-6 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            我们与全球知名电商平台和供应链巨头建立了深度合作关系，为您的跨境电商业务提供无缝连接和优质资源，助力您的产品轻松触达全球市场
          </motion.p>
        </div>

        {/* 品牌展示区域 */}
        <div ref={brandsContainerRef}>
          {/* 品牌卡片网格 */}
          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {BRANDS.map(brand => (
              <motion.div
                key={brand.id}
                className={`} group relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg
                dark:bg-slate-900`}
                variants={brandItemVariants}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={brand.url}
                  target="_blank"
                  className="flex h-full flex-col items-center justify-between"
                >
                  <div className="relative mb-4 flex h-16 w-full items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={64}
                      height={64}
                      className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="mb-1 font-medium">{brand.name}</h3>

                    <div className="mt-2 flex items-center justify-center text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>查看平台</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 合作邀请区域 */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl overflow-hidden rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-full overflow-hidden bg-slate-900 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-primary/20 mix-blend-overlay"></div>
              <div className="relative flex h-full flex-col justify-center p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">加入我们的全球分销网络</h3>
                <p className="mb-6 text-slate-200">
                  HiDoo为您提供一站式跨境电商解决方案，连接全球顶级平台和海量优质供应商。注册成为我们的合作伙伴，享受专属API对接服务、库存自动同步、物流全程跟踪等多重优势，轻松开启您的全球化电商之旅。
                </p>
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-100"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    立即注册
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="全球电商分销合作"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
