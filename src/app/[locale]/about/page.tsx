"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Globe, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

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
    ease: "linear",
  },
};

const scaleAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const glowAnimation = {
  boxShadow: [
    "0 0 0 0px rgba(59, 130, 246, 0.5)",
    "0 0 0 10px rgba(59, 130, 246, 0)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function AboutPage() {
  const t = useTranslations();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-background to-muted/20"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] bg-primary/5 overflow-hidden"
      >
        <motion.div
          animate={rotateAnimation}
          className="absolute inset-0 bg-grid-pattern opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        <div className="container h-full flex items-center relative">
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
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
            >
              关于我们
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              HiDoo
              是一个专注于为全球买家提供优质商品和服务的跨境电商平台。我们致力于连接全球优质供应商和买家，打造一个高效、便捷、可靠的国际贸易平台。
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-16">
        {/* 核心价值 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: Globe,
              title: "全球视野",
              description:
                "连接全球优质供应商和买家，打造无国界的贸易平台，让全球贸易更加便捷。",
            },
            {
              icon: Zap,
              title: "技术创新",
              description:
                "持续创新，运用先进技术提升用户体验，打造智能化的贸易生态系统。",
            },
            {
              icon: Users,
              title: "用户至上",
              description:
                "以用户需求为中心，提供优质服务和解决方案，建立长期信任关系。",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {[
            {
              title: "我们的使命",
              description:
                "通过技术创新和优质服务，为全球贸易提供更简单、更高效的解决方案，促进国际贸易的繁荣发展。",
              items: [
                "打造便捷的全球贸易平台",
                "提供优质的用户服务体验",
                "推动贸易数字化转型",
              ],
            },
            {
              title: "我们的愿景",
              description:
                "成为全球领先的跨境电商平台，为全球买家和供应商创造更多价值，推动全球贸易的数字化转型。",
              items: [
                "建立全球贸易新生态",
                "引领行业技术创新",
                "实现可持续发展目标",
              ],
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.items.map((listItem, i) => (
                  <motion.li
                    key={listItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center text-muted-foreground group"
                  >
                    <motion.span
                      animate={glowAnimation}
                      className="w-2 h-2 bg-primary rounded-full mr-2"
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
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">发展历程</h2>
          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1 }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border"
            />
            <div className="space-y-8">
              {[
                {
                  year: "2020",
                  title: "平台成立",
                  description: "HiDoo 平台正式上线，开始为全球用户提供服务。",
                },
                {
                  year: "2021",
                  title: "业务扩张",
                  description: "成功拓展多个国家和地区市场，用户规模突破百万。",
                },
                {
                  year: "2022",
                  title: "技术创新",
                  description: "推出智能推荐系统，提升用户购物体验。",
                },
                {
                  year: "2023",
                  title: "生态建设",
                  description: "建立完整的供应商体系，打造优质商品供应链。",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2 px-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <motion.div
                        animate={glowAnimation}
                        className="text-primary font-semibold mb-2"
                      >
                        {item.year}
                      </motion.div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                  <motion.div
                    animate={scaleAnimation}
                    className="w-4 h-4 rounded-full bg-primary mx-4"
                  />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 团队优势 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-8">团队优势</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                number: "100+",
                label: "专业团队",
              },
              {
                number: "50+",
                label: "合作伙伴",
              },
              {
                number: "1000+",
                label: "优质供应商",
              },
              {
                number: "100万+",
                label: "活跃用户",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {item.number}
                </div>
                <div className="text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
