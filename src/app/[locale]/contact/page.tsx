'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillWechat } from 'react-icons/ai';
import { FaTiktok, FaWeibo } from 'react-icons/fa';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.string().min(2, '主题至少需要2个字符'),
  message: z.string().min(10, '留言内容至少需要10个字符'),
});

type FormValues = z.infer<typeof formSchema>;

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

const pulseAnimation = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export default function ContactPage() {
  const containerRef = useRef(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: 实现发送留言的逻辑
      console.log('Form data:', data);
      toast({
        title: '提交成功',
        description: '我们将在24小时内回复您的留言',
      });
      form.reset();
    } catch (error) {
      toast({
        title: '提交失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] overflow-hidden bg-primary/5"
      >
        <motion.div
          animate={rotateAnimation}
          className="bg-grid-pattern absolute inset-0 opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        <div className="container relative flex h-full items-center">
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
              className="mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-4xl font-bold text-transparent"
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
        <div className="grid gap-12 md:grid-cols-2">
          {/* 左侧：联系信息 */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-2xl font-semibold">联系方式</h2>
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: '电子邮件',
                  content: 'support@hidoo.com',
                  subtext: '24小时内回复',
                },
                {
                  icon: Phone,
                  title: '电话',
                  content: '+86 400 888 8888',
                  subtext: '周一至周日 9:00-18:00',
                },
                {
                  icon: MapPin,
                  title: '地址',
                  content: '上海市浦东新区张江高科技园区',
                  subtext: '欢迎来访参观',
                },
              ].map(item => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="group flex items-start space-x-4 rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.content}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 工作时间 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="mt-12 rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="mb-4 flex items-center font-medium">
                <motion.div animate={pulseAnimation} className="mr-2 h-5 w-5 text-primary">
                  <Clock className="h-5 w-5" />
                </motion.div>
                工作时间
              </h3>
              <div className="space-y-2">
                {[
                  { day: '周一至周五', time: '9:00 - 18:00' },
                  { day: '周六', time: '10:00 - 16:00' },
                  { day: '周日', time: '休息' },
                ].map((item, index) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group flex justify-between text-muted-foreground"
                  >
                    <span>{item.day}</span>
                    <span className="transition-colors group-hover:text-primary">{item.time}</span>
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
            className="rounded-lg border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="mb-8 text-2xl font-semibold">在线留言</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入您的姓名" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="请输入您的邮箱" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>主题</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入留言主题" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>留言内容</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="请输入您的留言内容"
                            className="h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                  <Button
                    type="submit"
                    className="flex items-center"
                    disabled={form.formState.isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {form.formState.isSubmitting ? '提交中...' : '提交留言'}
                  </Button>
                  <p className="text-sm text-muted-foreground">我们将在24小时内回复您的留言</p>
                </motion.div>
              </form>
            </Form>
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
          <h2 className="mb-8 text-center text-2xl font-semibold">常见问题</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                question: '如何成为供应商？',
                answer: '请访问供应商注册页面，填写相关信息并提交申请。',
              },
              {
                question: '如何追踪订单？',
                answer: '登录您的账户，在订单中心可以查看所有订单状态。',
              },
              {
                question: '支持哪些支付方式？',
                answer: '我们支持多种支付方式，包括信用卡、PayPal等。',
              },
            ].map(item => (
              <motion.div
                key={item.question}
                variants={fadeInUp}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="mb-2 font-medium transition-colors group-hover:text-primary">
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
          <h2 className="mb-8 text-2xl font-semibold">关注我们</h2>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-8">
            {[
              {
                name: '微信',
                icon: <AiFillWechat className="h-6 w-6" />,
                qrCode: '/images/wechat-qr.jpg',
                account: 'HiDoo_Official',
                color: 'bg-green-500/10 hover:bg-green-500/20',
                iconColor: 'text-green-500',
              },
              {
                name: '微博',
                icon: <FaWeibo className="h-6 w-6" />,
                qrCode: '/images/weibo-qr.jpg',
                account: '@HiDoo官方',
                color: 'bg-red-500/10 hover:bg-red-500/20',
                iconColor: 'text-red-500',
              },
              {
                name: '抖音',
                icon: <FaTiktok className="h-6 w-6" />,
                qrCode: '/images/tiktok-qr.jpg',
                account: 'HiDoo_Official',
                color: 'bg-gray-500/10 hover:bg-gray-500/20',
                iconColor: 'text-black-500',
              },
            ].map(item => (
              <motion.div
                key={item.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group relative z-10 w-40 cursor-pointer rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`h-12 w-12 rounded-full ${item.color} mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                >
                  <div className={item.iconColor}>{item.icon}</div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-base font-medium transition-colors group-hover:text-primary">
                    {item.name}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.account}</div>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-4 -translate-x-1/2 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="rounded-xl border bg-white p-3 shadow-xl">
                    <div className="relative">
                      <Image
                        src={item.qrCode}
                        alt={`${item.name}二维码`}
                        width={140}
                        height={140}
                        className="rounded-lg"
                      />
                      <div className="absolute -right-2 -top-2 rounded-full bg-primary px-2 py-1 text-xs text-white">
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
