'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, Store, Users } from 'lucide-react';

interface DataOverviewProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
}

// 定义动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function DataOverview({ title, items }: DataOverviewProps) {
  // 为每个数据项定义相应的图标和颜色
  const getIconAndColor = (index: number) => {
    const icons = [
      {
        icon: <Store className="h-8 w-8" />,
        color: 'from-blue-500/20 to-blue-100/20 dark:from-blue-900/20 dark:to-blue-800/5',
        iconColor: 'text-blue-500 dark:text-blue-400',
      },
      {
        icon: <Package className="h-8 w-8" />,
        color: 'from-green-500/20 to-green-100/20 dark:from-green-900/20 dark:to-green-800/5',
        iconColor: 'text-green-500 dark:text-green-400',
      },
      {
        icon: <Users className="h-8 w-8" />,
        color: 'from-purple-500/20 to-purple-100/20 dark:from-purple-900/20 dark:to-purple-800/5',
        iconColor: 'text-purple-500 dark:text-purple-400',
      },
      {
        icon: <ShoppingCart className="h-8 w-8" />,
        color: 'from-amber-500/20 to-amber-100/20 dark:from-amber-900/20 dark:to-amber-800/5',
        iconColor: 'text-amber-500 dark:text-amber-400',
      },
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="relative py-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <div className="mx-auto h-1 w-20 rounded-full bg-primary/50" />
      </div>

      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item, index) => {
          const { icon, color, iconColor } = getIconAndColor(index);
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-xl border bg-gradient-to-br ${color} group overflow-hidden p-6 shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center md:items-start">
                <div className={`${iconColor} mb-4 hidden rounded-md p-2 md:block`}>{icon}</div>
                <div className="mb-2 text-4xl font-bold text-foreground">{item.value}</div>
                <div className="font-medium text-muted-foreground">{item.label}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
