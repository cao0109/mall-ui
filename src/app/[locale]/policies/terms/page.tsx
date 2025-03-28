'use client';

import { motion } from 'framer-motion';

export default function TermsOfService() {
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
        服务条款
      </motion.h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">1. 服务说明</h2>
          <p className="text-gray-600 dark:text-gray-400">
            HiDoo商城（以下简称&quot;我们&quot;）通过网站和移动应用程序提供电子商务服务。使用我们的服务即表示您同意这些条款。
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">2. 用户责任</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>您同意：</p>
            <ul className="list-inside list-disc space-y-2">
              <li>提供准确的个人信息</li>
              <li>遵守所有适用的法律和法规</li>
              <li>不进行任何欺诈或违法活动</li>
              <li>保护您的账户安全</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">3. 商品和定价</h2>
          <p className="text-gray-600 dark:text-gray-400">
            我们会尽力确保商品信息和价格的准确性，但可能会出现错误。如果发现错误，我们保留修正错误和取消订单的权利。
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">4. 知识产权</h2>
          <p className="text-gray-600 dark:text-gray-400">
            网站上的所有内容（包括但不限于文字、图片、标志、按钮图标、图像、音频剪辑、数字下载、数据编辑和软件）均为我们或我们的内容提供商的财产。
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">5. 免责声明</h2>
          <p className="text-gray-600 dark:text-gray-400">
            我们的服务按&quot;现状&quot;提供，不提供任何明示或暗示的保证。我们不对服务的中断或任何损失承担责任。
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}
