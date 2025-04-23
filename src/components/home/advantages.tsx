import { motion } from 'framer-motion';
import { BadgeCheck, Clock, PiggyBank, ShieldCheck } from 'lucide-react';

interface AdvantagesProps {
  title: string;
  items: {
    title: string;
    description: string;
  }[];
}

// 定义动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function Advantages({ title, items }: AdvantagesProps) {
  // 为每个优势项目定义对应的图标和样式
  const getIconAndStyle = (index: number) => {
    const iconMap = [
      {
        icon: <BadgeCheck className="h-10 w-10" />,
        gradient: 'from-blue-600 to-indigo-600',
        bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40',
      },
      {
        icon: <PiggyBank className="h-10 w-10" />,
        gradient: 'from-green-600 to-emerald-600',
        bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40',
      },
      {
        icon: <Clock className="h-10 w-10" />,
        gradient: 'from-amber-600 to-orange-600',
        bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40',
      },
      {
        icon: <ShieldCheck className="h-10 w-10" />,
        gradient: 'from-purple-600 to-fuchsia-600',
        bgGradient: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/40',
      },
    ];

    return iconMap[index % iconMap.length];
  };

  return (
    <div className="relative py-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gradient-to-br from-secondary/5 to-primary/5 blur-3xl" />
      </div>

      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          选择HiDoo，体验全球化采购的便捷与高效
        </p>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
      </div>

      <motion.div
        className="mx-auto grid max-w-6xl gap-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item, index) => {
          const { icon, gradient, bgGradient } = getIconAndStyle(index);
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl border bg-card p-8 text-center shadow-md transition-all duration-300 hover:shadow-lg"
            >
              {/* 背景渐变 */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${bgGradient}`} />

              {/* 图标 */}
              <div
                className={`mb-5 rounded-lg bg-gradient-to-br p-4 text-white ${gradient} relative z-10 shadow-md`}
              >
                {icon}
              </div>

              {/* 标题和描述 */}
              <h3 className="relative z-10 mb-3 text-xl font-bold">{item.title}</h3>
              <p className="relative z-10 text-muted-foreground">{item.description}</p>

              {/* 悬停效果装饰 */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
