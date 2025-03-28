"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { AiFillWechat } from "react-icons/ai";
import { FaTiktok, FaWeibo } from "react-icons/fa";

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

const pulseAnimation = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function ContactPage() {
  // const t = useTranslations();
  const containerRef = useRef(null);

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
              联系我们
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              无论您有任何问题或建议，我们都随时为您提供帮助。选择最适合您的方式与我们联系。
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* 左侧：联系信息 */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-8">联系方式</h2>
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: "电子邮件",
                  content: "support@hidoo.com",
                  subtext: "24小时内回复",
                },
                {
                  icon: Phone,
                  title: "电话",
                  content: "+86 400 888 8888",
                  subtext: "周一至周日 9:00-18:00",
                },
                {
                  icon: MapPin,
                  title: "地址",
                  content: "上海市浦东新区张江高科技园区",
                  subtext: "欢迎来访参观",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-4 p-6 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.content}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 工作时间 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="mt-12 p-6 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-medium mb-4 flex items-center">
                <motion.div
                  animate={pulseAnimation}
                  className="h-5 w-5 text-primary mr-2"
                >
                  <Clock className="h-5 w-5" />
                </motion.div>
                工作时间
              </h3>
              <div className="space-y-2">
                {[
                  { day: "周一至周五", time: "9:00 - 18:00" },
                  { day: "周六", time: "10:00 - 16:00" },
                  { day: "周日", time: "休息" },
                ].map((item, index) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex justify-between text-muted-foreground group"
                  >
                    <span>{item.day}</span>
                    <span className="group-hover:text-primary transition-colors">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 右侧：留言表单 */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="p-8 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-8">在线留言</h2>
            <form className="space-y-6">
              <motion.div
                variants={fadeInUp}
                className="grid md:grid-cols-2 gap-6"
              >
                {[
                  {
                    label: "姓名",
                    type: "text",
                    placeholder: "请输入您的姓名",
                  },
                  {
                    label: "邮箱",
                    type: "email",
                    placeholder: "请输入您的邮箱",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium mb-2">
                      {item.label}
                    </label>
                    <input
                      type={item.type}
                      className="w-full px-4 py-2 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300 hover:border-primary/50"
                      placeholder={item.placeholder}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-2">主题</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300 hover:border-primary/50"
                  placeholder="请输入留言主题"
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="block text-sm font-medium mb-2">
                  留言内容
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-32 resize-none transition-all duration-300 hover:border-primary/50"
                  placeholder="请输入您的留言内容"
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center space-x-2"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  提交留言
                </motion.button>
                <p className="text-sm text-muted-foreground">
                  我们将在24小时内回复您的留言
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* 常见问题 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">常见问题</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                question: "如何成为供应商？",
                answer: "请访问供应商注册页面，填写相关信息并提交申请。",
              },
              {
                question: "如何追踪订单？",
                answer: "登录您的账户，在订单中心可以查看所有订单状态。",
              },
              {
                question: "支持哪些支付方式？",
                answer: "我们支持多种支付方式，包括信用卡、PayPal等。",
              },
            ].map((item) => (
              <motion.div
                key={item.question}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                  {item.question}
                </h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 社交媒体 */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-8">关注我们</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
            {[
              {
                name: "微信",
                icon: <AiFillWechat className="h-6 w-6" />,
                qrCode: "/images/wechat-qr.jpg",
                account: "HiDoo_Official",
                color: "bg-green-500/10 hover:bg-green-500/20",
                iconColor: "text-green-500",
              },
              {
                name: "微博",
                icon: <FaWeibo className="h-6 w-6" />,
                qrCode: "/images/weibo-qr.jpg",
                account: "@HiDoo官方",
                color: "bg-red-500/10 hover:bg-red-500/20",
                iconColor: "text-red-500",
              },
              {
                name: "抖音",
                icon: <FaTiktok className="h-6 w-6" />,
                qrCode: "/images/tiktok-qr.jpg",
                account: "HiDoo_Official",
                color: "bg-gray-500/10 hover:bg-gray-500/20",
                iconColor: "text-black-500",
              },
            ].map((item) => (
              <motion.div
                key={item.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="w-40 p-6 rounded-xl bg-card border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
              >
                <div
                  className={`h-12 w-12 rounded-full ${item.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300`}
                >
                  <div className={item.iconColor}>{item.icon}</div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-base font-medium group-hover:text-primary transition-colors">
                    {item.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.account}
                  </div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                  <div className="bg-white p-3 rounded-xl shadow-xl border">
                    <div className="relative">
                      <Image
                        src={item.qrCode}
                        alt={`${item.name}二维码`}
                        width={140}
                        height={140}
                        className="rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        扫码关注
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
