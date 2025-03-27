"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAdminLogin } from "medusa-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const adminLogin = useAdminLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await adminLogin.mutateAsync({
        email,
        password,
      });

      // 登录成功后更新本地状态
      login(
        {
          id: user.id,
          name: user.first_name + " " + user.last_name,
          email: user.email,
          role: "vendor",
          avatar:
            user.avatar ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        },
        "medusa-token"
      );

      toast({
        title: "登录成功",
        description: "欢迎回来！",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "登录失败",
        description: "邮箱或密码错误",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 gap-12 items-start py-8 px-4">
      {/* 左侧品牌介绍 */}
      <div className="hidden lg:flex flex-col justify-center space-y-10 sticky top-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            账号登录
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            欢迎回到 HiDoo，
            <br />
            开启您的跨境之旅
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            HiDoo 为跨境电商从业者提供一站式解决方案，助力您的业务快速发展。
          </p>
        </div>

        <div className="grid gap-4">
          <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-0.5">
                一站式跨境解决方案
              </h3>
              <p className="text-xs text-muted-foreground">
                从选品、采购到运营，提供全方位支持
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-0.5">专业的运营支持</h3>
              <p className="text-xs text-muted-foreground">
                提供专业的运营指导和培训服务
              </p>
            </div>
          </div>

          <div className="group flex items-center gap-5 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm transition-all hover:shadow-md hover:bg-white/90">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-0.5">高效的数据分析</h3>
              <p className="text-xs text-muted-foreground">
                实时市场数据分析，助您把握商机
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="lg:max-w-md w-full mx-auto space-y-6">
        <div className="flex flex-col items-center lg:items-start space-y-1.5">
          <h2 className="text-center lg:text-left text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            账号登录
          </h2>
          <p className="text-center lg:text-left text-sm text-muted-foreground">
            登录您的 HiDoo 账号，开启跨境电商之旅
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-md">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-lg font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                欢迎回来
              </CardTitle>
              <CardDescription className="text-center text-xs">
                使用您的邮箱和密码登录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  邮箱地址
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 rounded-lg text-sm h-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  登录密码
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 rounded-lg text-sm h-9"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 h-3.5 w-3.5"
                  />
                  <span className="text-xs text-muted-foreground">记住我</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:text-primary/80"
                >
                  忘记密码？
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-2 pb-4">
              <Button
                type="submit"
                className="w-full rounded-lg text-sm h-9 font-medium shadow-md hover:shadow-lg"
                disabled={adminLogin.isLoading}
              >
                {adminLogin.isLoading ? (
                  <div className="flex items-center">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5" />
                    登录中...
                  </div>
                ) : (
                  "登录"
                )}
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                还没有账号？{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  立即注册
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center lg:text-left">
          <p className="text-xs text-muted-foreground">
            登录即表示您同意我们的
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 ml-1"
            >
              服务条款
            </Link>
            和
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 ml-1"
            >
              隐私政策
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
