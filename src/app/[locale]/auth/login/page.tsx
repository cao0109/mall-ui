'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useAdminLogin } from 'medusa-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          name: user.first_name + ' ' + user.last_name,
          email: user.email,
          role: 'vendor',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        },
        'medusa-token'
      );

      toast({
        title: '登录成功',
        description: '欢迎回来！',
      });

      router.push('/');
    } catch (error) {
      toast({
        title: '登录失败',
        description: `请检查您的邮箱和密码是否正确 ${
          error instanceof Error ? `: ${error.message}` : ''
        }`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        {/* 左侧品牌介绍 */}
        <div className="hidden flex-col justify-center space-y-8 lg:flex">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              账号登录
            </div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent xl:text-4xl">
              欢迎回到 HiDoo，
              <br />
              开启您的跨境之旅
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              HiDoo 为跨境电商从业者提供一站式解决方案，助力您的业务快速发展。
            </p>
          </div>

          <div className="grid gap-4">
            <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 truncate text-base font-semibold">一站式跨境解决方案</h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  从选品、采购到运营，提供全方位支持
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 truncate text-base font-semibold">专业的运营支持</h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  提供专业的运营指导和培训服务
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-5 rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 truncate text-base font-semibold">高效的数据分析</h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  实时市场数据分析，助您把握商机
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧登录表单 */}
        <div className="mx-auto w-full max-w-md space-y-6 lg:max-w-none">
          <div className="flex flex-col items-center space-y-2 lg:items-start">
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              账号登录
            </h2>
            <p className="text-sm text-muted-foreground">登录您的 HiDoo 账号，开启跨境电商之旅</p>
          </div>

          <Card className="border-0 bg-white/90 shadow-lg backdrop-blur-md">
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-2 pb-4">
                <CardTitle className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-center text-lg font-bold text-transparent sm:text-xl">
                  欢迎回来
                </CardTitle>
                <CardDescription className="text-center text-xs sm:text-sm">
                  使用您的邮箱和密码登录
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    邮箱地址
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="请输入邮箱地址"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="h-10 rounded-lg pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    登录密码
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="请输入密码"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="h-10 rounded-lg pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <span className="text-xs text-muted-foreground sm:text-sm">记住我</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 sm:text-sm"
                  >
                    忘记密码？
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pb-4 pt-2">
                <Button
                  type="submit"
                  className="h-10 w-full rounded-lg font-medium shadow-md transition-all hover:shadow-lg"
                  disabled={adminLogin.isLoading}
                >
                  {adminLogin.isLoading ? (
                    <div className="flex items-center justify-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      登录中...
                    </div>
                  ) : (
                    '登录'
                  )}
                </Button>
                <div className="text-center text-xs text-muted-foreground sm:text-sm">
                  还没有账号？{' '}
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center font-medium text-primary hover:text-primary/80"
                  >
                    立即注册
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center lg:text-left">
            <p className="text-xs text-muted-foreground sm:text-sm">
              登录即表示您同意我们的
              <Link href="/terms" className="ml-1 text-primary hover:text-primary/80">
                服务条款
              </Link>
              和
              <Link href="/privacy" className="ml-1 text-primary hover:text-primary/80">
                隐私政策
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
