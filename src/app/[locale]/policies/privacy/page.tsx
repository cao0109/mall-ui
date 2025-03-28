'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold text-transparent"
      >
        隐私政策
      </motion.h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">信息收集</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            我们收集的信息包括但不限于：个人识别信息（如姓名、电子邮件地址、电话号码）、设备信息、位置信息等。这些信息用于提供更好的服务和用户体验。
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">信息使用</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">我们使用收集的信息来：</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
            <li>提供、维护和改进我们的服务</li>
            <li>发送通知和更新</li>
            <li>防止欺诈和滥用</li>
            <li>进行数据分析</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">信息安全</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            我们采用行业标准的安全措施来保护您的个人信息，包括加密传输、安全存储等措施。
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Cookie 使用</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            我们使用 Cookie 和类似技术来提供和改进我们的服务。您可以通过浏览器设置来控制 Cookie
            的使用。
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}
