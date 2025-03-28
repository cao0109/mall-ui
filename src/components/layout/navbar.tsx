'use client';

import { LanguageSwitcher } from '@/components/language-switcher';
import { RegionSwitcher } from '@/components/region-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useToast } from '@/hooks/use-toast';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/store/auth';
import {
  Info,
  LogOut,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Store,
  User,
  Users,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();

  const handleLogout = () => {
    logout();
    toast({
      title: t('auth.logoutSuccess'),
      description: t('auth.logoutDescription'),
    });
    router.push('/');
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo区域 */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
            aria-label="返回首页"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg transition-shadow hover:shadow-primary/50"
              aria-hidden="true"
            >
              <span className="text-sm font-bold text-white">HD</span>
            </div>
            <span className="hidden text-xl font-bold md:inline-block">HiDoo</span>
          </Link>
        </div>

        {/* 导航区域 - 中等屏幕及以上显示 */}
        <NavigationMenu className="hidden md:flex" aria-label="主导航">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="text-sm font-medium text-muted-foreground"
                aria-label="产品库导航"
              >
                <Package className="mr-1 h-4 w-4" aria-hidden="true" />
                {t('common.productLibrary')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <nav className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]" aria-label="产品分类">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h2 className="mb-2 text-sm font-medium leading-none">热门分类</h2>
                      <div className="grid grid-cols-2 gap-2" role="list">
                        <Link
                          href="/products/category/electronics"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          电子产品
                        </Link>
                        <Link
                          href="/products/category/clothing"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          服装服饰
                        </Link>
                        <Link
                          href="/products/category/home"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          家居用品
                        </Link>
                        <Link
                          href="/products/category/beauty"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          美妆个护
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h2 className="mb-2 text-sm font-medium leading-none">特色商品</h2>
                      <div className="grid grid-cols-2 gap-2" role="list">
                        <Link
                          href="/products/featured/new"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          新品上市
                        </Link>
                        <Link
                          href="/products/featured/hot"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          热销商品
                        </Link>
                        <Link
                          href="/products/featured/sale"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          特惠活动
                        </Link>
                        <Link
                          href="/products/featured/limited"
                          className="text-sm text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                          role="listitem"
                        >
                          限量商品
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/suppliers" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <Store className="mr-1 h-4 w-4" />
                  {t('common.suppliers')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/my-stores" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <Users className="mr-1 h-4 w-4" />
                  {t('common.myStores')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/selected-products" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  {t('common.selectedProducts')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <Info className="mr-1 h-4 w-4" />
                  关于我们
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <Phone className="mr-1 h-4 w-4" />
                  联系我们
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 用户区域 */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <RegionSwitcher />

          {/* 搜索按钮和对话框 */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen} aria-label="搜索">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden transition-transform hover:scale-105 md:flex"
                aria-label="打开搜索"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="top-[20%] gap-0 p-0 sm:max-w-[425px]"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center border-b px-4 py-3">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <DialogTitle className="text-base font-medium">{t('common.search')}</DialogTitle>
              </div>
              <div className="p-4">
                <div className="relative w-full">
                  <label htmlFor="search-input" className="sr-only">
                    搜索内容
                  </label>
                  <input
                    id="search-input"
                    type="text"
                    placeholder={t('common.search')}
                    className="w-full rounded-lg border border-input bg-background/50 py-2 pl-10 pr-4 text-sm ring-offset-background backdrop-blur-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    autoFocus
                    aria-label="搜索输入框"
                  />
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="用户菜单">
                <User className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" role="menu" aria-label="用户菜单选项">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2"
                    role="menuitem"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={`${user.name}的头像`}
                          width={24}
                          height={24}
                          layout="fixed"
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <span className="text-xs font-medium" aria-label={`${user?.name}的首字母`}>
                          {user?.name?.[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href="/my-stores">
                    <DropdownMenuItem className="cursor-pointer">
                      {t('common.myStores')}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/selected-products">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t('common.selectedProducts')}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('common.settings')}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('common.logout')}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <DropdownMenuItem className="cursor-pointer">
                      {t('common.login')}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/auth/register">
                    <DropdownMenuItem className="cursor-pointer">
                      {t('common.register')}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/selected-products">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t('common.selectedProducts')}
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t bg-background md:hidden"
          role="navigation"
          aria-label="移动端导航"
        >
          <nav className="flex flex-col">
            {isAuthenticated ? (
              <>
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          layout="fixed"
                          className="h-full w-full rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium">{user?.name?.[0]}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/my-stores"
                  className="border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('common.myStores')}
                </Link>
                <Link
                  href="/selected-products"
                  className="flex items-center border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('common.selectedProducts')}
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t('common.settings')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/products"
                  className="border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('common.productLibrary')}
                </Link>
                <Link
                  href="/suppliers"
                  className="border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('common.suppliers')}
                </Link>
                <Link
                  href="/selected-products"
                  className="flex items-center border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('common.selectedProducts')}
                </Link>
                <Link
                  href="/auth/login"
                  className="border-b px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('common.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('common.register')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
