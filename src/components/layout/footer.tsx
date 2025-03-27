"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现订阅逻辑
    toast({
      title: "订阅成功",
      description: "感谢您的订阅，我们会定期发送最新优惠信息给您！",
    });
    setEmail("");
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">关于我们</h3>
            <p className="text-sm text-gray-600">
              我们致力于为用户提供优质的购物体验，打造一个现代化的电商平台。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">微信</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M13.5,13.5A1.5,1.5 0 0,1 12,12A1.5,1.5 0 0,1 13.5,10.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 13.5,13.5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">微博</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.3,12.7c1,0.9,1.7,2.1,1.7,3.4c0,3.1-4.3,5.7-9.5,5.7S3,19.2,3,16.1c0-1.3,0.7-2.5,1.7-3.4c-0.2-0.4-0.3-0.8-0.3-1.2c0-1.7,1.6-3,3.5-3c0.5,0,1,0.1,1.4,0.3c1.2-1.5,3.1-2.5,5.2-2.5c2.1,0,4,1,5.2,2.5c0.4-0.2,0.9-0.3,1.4-0.3c1.9,0,3.5,1.3,3.5,3C24,11.9,23.9,12.3,20.3,12.7z M12.5,8.8c-4.1,0-7.5,2.6-7.5,5.8s3.4,5.8,7.5,5.8s7.5-2.6,7.5-5.8S16.6,8.8,12.5,8.8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  首页
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  商品分类
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  特惠活动
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  购物指南
                </a>
              </li>
            </ul>
          </div>

          {/* 帮助中心 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">帮助中心</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  退换货政策
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  配送说明
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  联系客服
                </a>
              </li>
            </ul>
          </div>

          {/* 订阅区域 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅优惠信息</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  placeholder="请输入您的邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  订阅
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                订阅即表示您同意接收我们的营销邮件，您可以随时取消订阅。
              </p>
            </form>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} HiDoo商城. 保留所有权利.
            <a href="#" className="text-gray-600 hover:text-gray-900 ml-2">
              隐私政策
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              服务条款
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
