'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaFacebook,
  FaGithub,
  FaGlobeAsia,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWeixin,
} from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

export function Footer() {
  const footerLinks = [
    {
      title: '关于',
      links: [
        { name: '公司介绍', href: '/about' },
        { name: '加入我们', href: '/careers' },
        { name: '联系我们', href: '/contact' },
      ],
    },
    {
      title: '商务合作',
      links: [
        { name: '供应商入驻', href: '/supplier' },
        { name: '分销商加盟', href: '/distributor' },
        { name: '品牌合作', href: '/brand' },
      ],
    },
    {
      title: '帮助中心',
      links: [
        { name: '常见问题', href: '/help/faq' },
        { name: '支付方式', href: '/help/payment' },
        { name: '配送说明', href: '/help/shipping' },
      ],
    },
    {
      title: '订阅资讯',
      links: [],
      subscription: true,
    },
  ];

  const socialLinks = [
    { icon: FaWeixin, href: '#', label: '微信' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative border-t border-gray-200/30 bg-gradient-to-b from-gray-50 via-white to-gray-50/90 backdrop-blur-xl dark:border-gray-800/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/90">
      {/* AI 风格装饰元素 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        {/* 光效装饰 */}
        <div className="absolute left-1/4 top-0 -translate-x-1/2 opacity-50">
          <div className="h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
        </div>
        <div className="absolute right-1/4 top-0 translate-x-1/2 opacity-50">
          <div className="h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>

        {/* 科技线条 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Logo 和简介 */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-12 sm:flex-row sm:gap-6 sm:text-left lg:mb-16">
          <div className="group relative flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/80 to-blue-600/80 shadow-lg transition-all duration-300 group-hover:shadow-primary/25 sm:h-10 sm:w-10">
                <FaGlobeAsia className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-xl">
                  HiDoo
                </h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
                  跨境分销生态平台
                </p>
              </div>
            </Link>
          </div>
          <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-700 sm:mx-6 sm:block lg:mx-8" />
          <p className="max-w-md text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
            HiDoo
            致力于为全球供应商和分销商搭建高效的跨境电商贸易平台，提供一站式选品和供应链解决方案
          </p>
        </div>

        {/* 主要链接区域 */}
        <div className="mb-8 grid grid-cols-1 gap-y-8 sm:mb-12 sm:grid-cols-4 sm:gap-8 lg:mb-16">
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-gray-700/50 sm:block" />

              <h3 className="relative mb-4 inline-flex text-sm font-medium tracking-wider text-gray-900 dark:text-gray-100">
                <span className="relative">
                  {section.title}
                  <span className="absolute -bottom-1 left-0 h-px w-12 bg-gradient-to-r from-primary via-blue-500 to-primary/0" />
                </span>
              </h3>

              {section.subscription ? (
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-[10px] leading-relaxed text-gray-500/80 dark:text-gray-400/80 sm:text-xs">
                    订阅获取最新优惠及产品资讯
                  </p>
                  <div className="group/input relative">
                    {/* 发光边框 */}
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/30 via-blue-500/30 to-primary/30 opacity-0 blur-sm transition-all duration-500 group-hover/input:opacity-100" />

                    {/* 输入框容器 */}
                    <div className="relative flex items-center overflow-hidden rounded-xl bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/90 dark:bg-gray-900/70 dark:hover:bg-gray-900/90">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent px-3 py-2 text-[11px] tracking-wide text-gray-700 placeholder-gray-400/80 outline-none transition-colors dark:text-gray-300 dark:placeholder-gray-500 sm:px-4 sm:py-2.5 sm:text-xs"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-0.5">
                        <button className="group/btn active:scale-98 relative flex h-[calc(100%-4px)] items-center gap-1 rounded-lg bg-primary/90 px-2 text-[11px] font-medium text-white/90 transition-all hover:bg-primary hover:text-white hover:shadow-md sm:gap-1.5 sm:px-3 sm:text-[13px]">
                          <span>订阅</span>
                          <IoSend className="h-2.5 w-2.5 transition-all duration-300 group-hover/btn:translate-x-0.5 sm:h-3 sm:w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 订阅说明 */}
                  <p className="text-[10px] leading-relaxed text-gray-400/80 dark:text-gray-500/80 sm:text-[11px]">
                    我们承诺不会向您发送垃圾邮件，您可以随时取消订阅
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + linkIndex * 0.05 }}
                    >
                      <div className="group/link relative inline-flex items-center">
                        <Link
                          href={link.href}
                          className="relative inline-flex items-center text-[13px] text-gray-500 transition-all duration-300 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                        >
                          <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40 opacity-0 transition-all duration-300 group-hover/link:opacity-100 sm:hidden" />
                          <span className="absolute -left-2 top-1/2 hidden h-1 w-1 -translate-x-full rounded-full bg-primary opacity-0 transition-all duration-300 group-hover/link:opacity-100 sm:block" />
                          {link.name}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 group-hover/link:w-full" />
                        </Link>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* 社交媒体和版权信息 */}
        <div className="relative">
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />

          <div className="relative pt-6 sm:pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
              {/* 社交媒体链接 */}
              <div className="flex space-x-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group relative text-gray-400 transition-all duration-300 hover:text-primary dark:text-gray-500 dark:hover:text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="absolute -inset-2 -z-10 scale-0 rounded-lg bg-gray-100/80 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 dark:bg-gray-800/80" />
                    <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                ))}
              </div>

              {/* 版权信息 */}
              <motion.div
                className="flex flex-col items-center gap-1.5 text-xs tracking-wide text-gray-500/90 dark:text-gray-400/90 sm:flex-row sm:gap-4 sm:text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="font-medium">© {new Date().getFullYear()} HiDoo跨境分销平台</p>
                <div className="hidden text-gray-300 dark:text-gray-700 sm:block">·</div>
                <p className="text-[10px] text-gray-500/70 dark:text-gray-400/70 sm:text-xs">
                  增值电信业务经营许可证：B2-20230101
                </p>
                <div className="hidden text-gray-300 dark:text-gray-700 sm:block">·</div>
                <p className="text-[10px] text-gray-500/70 dark:text-gray-400/70 sm:text-xs">
                  工商备案号：123456789
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
