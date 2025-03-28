'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Globe, Users, Zap } from 'lucide-react';
import { useRef } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

const scaleAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const glowAnimation = {
  boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.5)', '0 0 0 10px rgba(59, 130, 246, 0)'],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export default function AboutPage() {
  // const t = useTranslations();
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[200px] overflow-hidden bg-primary/5 sm:h-[250px] lg:h-[300px]"
      >
        <motion.div
          animate={rotateAnimation}
          className="bg-grid-pattern absolute inset-0 opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        <div className="container relative flex h-full items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-3 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-2xl font-bold text-transparent sm:mb-4 sm:text-3xl lg:text-4xl"
            >
              关于我们
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base text-muted-foreground sm:text-lg lg:text-xl"
            >
              HiDoo
              是一个专注于为全球买家提供优质商品和服务的跨境电商平台。我们致力于连接全球优质供应商和买家，打造一个高效、便捷、可靠的国际贸易平台。
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* 核心价值 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 lg:mb-16 lg:grid-cols-3 lg:gap-8"
        >
          {[
            {
              icon: Globe,
              title: '全球视野',
              description: '连接全球优质供应商和买家，打造无国界的贸易平台，让全球贸易更加便捷。',
            },
            {
              icon: Zap,
              title: '技术创新',
              description: '持续创新，运用先进技术提升用户体验，打造智能化的贸易生态系统。',
            },
            {
              icon: Users,
              title: '用户至上',
              description: '以用户需求为中心，提供优质服务和解决方案，建立长期信任关系。',
            },
          ].map(item => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="group rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 使命和愿景 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 lg:mb-16 lg:grid-cols-2 lg:gap-8"
        >
          {[
            {
              title: '我们的使命',
              description:
                '通过技术创新和优质服务，为全球贸易提供更简单、更高效的解决方案，促进国际贸易的繁荣发展。',
              items: ['打造便捷的全球贸易平台', '提供优质的用户服务体验', '推动贸易数字化转型'],
            },
            {
              title: '我们的愿景',
              description:
                '成为全球领先的跨境电商平台，为全球买家和供应商创造更多价值，推动全球贸易的数字化转型。',
              items: ['建立全球贸易新生态', '引领行业技术创新', '实现可持续发展目标'],
            },
          ].map(item => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="rounded-lg border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="mb-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mb-4 text-muted-foreground">{item.description}</p>
              <ul className="space-y-2">
                {item.items.map((listItem, i) => (
                  <motion.li
                    key={listItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="group flex items-center text-muted-foreground"
                  >
                    <motion.span
                      animate={glowAnimation}
                      className="mr-2 h-2 w-2 rounded-full bg-primary"
                    />
                    {listItem}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="ml-2"
                    >
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* 发展历程 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="mb-6 text-center text-xl font-semibold sm:mb-8 sm:text-2xl">发展历程</h2>
          <div className="relative">
            {/* 时间轴线 - 移动端水平，桌面端垂直 */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute left-0 top-[2.25rem] h-0.5 w-full bg-gradient-to-r from-transparent via-border to-transparent sm:left-1/2 sm:top-0 sm:h-full sm:w-0.5 sm:bg-gradient-to-b"
            />
            <div className="space-y-0 sm:space-y-8">
              {[
                {
                  year: '2020',
                  title: '平台成立',
                  description: 'HiDoo 平台正式上线，开始为全球用户提供服务。',
                },
                {
                  year: '2021',
                  title: '业务扩张',
                  description: '成功拓展多个国家和地区市场，用户规模突破百万。',
                },
                {
                  year: '2022',
                  title: '技术创新',
                  description: '推出智能推荐系统，提升用户购物体验。',
                },
                {
                  year: '2023',
                  title: '生态建设',
                  description: '建立完整的供应商体系，打造优质商品供应链。',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  {/* 移动端布局 */}
                  <div className="flex flex-col gap-4 sm:hidden">
                    <motion.div
                      animate={scaleAnimation}
                      className="relative mx-auto h-3 w-3 rounded-full bg-primary"
                    >
                      <span className="absolute -inset-2 rounded-full bg-primary/10" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <motion.div
                        animate={glowAnimation}
                        className="mb-2 text-sm font-semibold text-primary"
                      >
                        {item.year}
                      </motion.div>
                      <h3 className="mb-2 text-sm font-medium">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* 桌面端布局 */}
                  <div
                    className={`hidden sm:flex ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    } items-center gap-8`}
                  >
                    <div className="w-1/2 px-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
                      >
                        <motion.div
                          animate={glowAnimation}
                          className="mb-2 text-base font-semibold text-primary"
                        >
                          {item.year}
                        </motion.div>
                        <h3 className="mb-2 text-base font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </motion.div>
                    </div>
                    <motion.div
                      animate={scaleAnimation}
                      className="relative h-4 w-4 rounded-full bg-primary"
                    >
                      <span className="absolute -inset-2 rounded-full bg-primary/10" />
                    </motion.div>
                    <div className="w-1/2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 团队优势 */}
        <div className="text-center">
          <h2 className="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">团队优势</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {[
              {
                number: '100+',
                label: '专业团队',
              },
              {
                number: '50+',
                label: '合作伙伴',
              },
              {
                number: '1000+',
                label: '优质供应商',
              },
              {
                number: '100万+',
                label: '活跃用户',
              },
            ].map(item => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-5 lg:p-6"
              >
                <div className="mb-1 text-xl font-bold text-primary sm:mb-2 sm:text-2xl lg:text-3xl">
                  {item.number}
                </div>
                <div className="text-xs text-muted-foreground sm:text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
