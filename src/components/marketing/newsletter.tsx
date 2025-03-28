'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaGift } from 'react-icons/fa';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '订阅成功',
      description: '感谢您的订阅，我们会定期发送最新优惠信息给您！',
    });
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-6 text-white shadow-lg"
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <FaGift className="h-6 w-6" />
          <h3 className="text-xl font-semibold">订阅获取独家优惠</h3>
        </div>
        <p className="mb-6 text-sm text-white/90">
          成为我们的订阅会员，抢先获取全球优质货源信息、行业动态和独家优惠！
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <FaEnvelope className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="email"
              placeholder="请输入您的邮箱地址"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="h-12 w-full border-white/20 bg-white/10 pl-10 text-white placeholder-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 focus:border-white/40 focus:bg-white/20 focus:ring-2 focus:ring-white/40"
            />
          </div>
          <Button
            type="submit"
            className="h-12 bg-white px-8 text-primary hover:bg-white/90 hover:text-primary/90"
          >
            立即订阅
          </Button>
        </form>
        <p className="mt-3 text-xs text-white/60">
          注：订阅即表示您同意接收我们的营销邮件，您可以随时取消订阅。
        </p>
      </div>
      {/* 装饰性背景元素 */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
    </motion.div>
  );
}
