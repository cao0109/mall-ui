'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:from-gray-800 dark:to-gray-900"
    >
      <div className="relative z-10">
        <div className="mb-4 inline-block rounded-xl bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      {/* 装饰性背景元素 */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150"></div>
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150"></div>
    </motion.div>
  );
}
