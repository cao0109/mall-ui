"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth";
import {
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo区域 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">HD</span>
              </div>
              <span className="font-bold text-xl hidden md:inline-block">
                HiDoo
              </span>
            </Link>
          </div>

          {/* 搜索框 - 中等屏幕及以上显示 */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索商品..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* 导航区域 - 中等屏幕及以上显示 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              商品库
            </Link>
            <Link
              href="/suppliers"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              供应商
            </Link>
            <Link
              href="/my-stores"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              我的店铺
            </Link>
            <Link
              href="/selected-products"
              className="text-sm font-medium transition-colors hover:text-primary flex items-center"
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              选品车
            </Link>
          </nav>

          {/* 用户区域 */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-medium">
                            {user?.name?.[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href="/my-stores">
                      <DropdownMenuItem>我的店铺</DropdownMenuItem>
                    </Link>
                    <Link href="/selected-products">
                      <DropdownMenuItem>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        选品车
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        设置
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      退出登录
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <DropdownMenuItem>登录</DropdownMenuItem>
                    </Link>
                    <Link href="/auth/register">
                      <DropdownMenuItem>注册</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/selected-products">
                      <DropdownMenuItem>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        选品车
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {!isAuthenticated && (
              <Link href="/auth/login">
                <Button size="sm" className="hidden md:flex">
                  登录
                </Button>
              </Link>
            )}

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* 移动端搜索框 */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full rounded-full"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {user?.name?.[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/my-stores"
                    className="px-4 py-3 border-b text-sm font-medium"
                  >
                    我的店铺
                  </Link>
                  <Link
                    href="/selected-products"
                    className="px-4 py-3 border-b text-sm font-medium flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    选品车
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-3 border-b text-sm font-medium flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    设置
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-sm font-medium flex items-center text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/products"
                    className="px-4 py-3 border-b text-sm font-medium"
                  >
                    商品库
                  </Link>
                  <Link
                    href="/suppliers"
                    className="px-4 py-3 border-b text-sm font-medium"
                  >
                    供应商
                  </Link>
                  <Link
                    href="/selected-products"
                    className="px-4 py-3 border-b text-sm font-medium flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    选品车
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-4 py-3 border-b text-sm font-medium"
                  >
                    登录
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-3 text-sm font-medium"
                  >
                    注册
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* 主内容区域 */}
      <div className="flex-1">
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
