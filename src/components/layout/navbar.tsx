'use client';

import { ProductCategory } from '@medusajs/medusa';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Book,
  ChevronRight,
  Flame,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Package,
  Phone,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Timer,
  User,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useProductCategories } from 'medusa-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { RegionSwitcher } from '@/components/region-switcher';
import { SearchDialog } from '@/components/search-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useToast } from '@/hooks/use-toast';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
    },
  }),
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();
  const { product_categories } = useProductCategories({
    limit: 4,
    parent_category_id: 'null',
  });

  const handleLogout = () => {
    logout();
    toast({
      title: t('auth.logoutSuccess'),
      description: t('auth.logoutDescription'),
    });
    router.push('/');
  };

  // 根据角色获取对应的图标和标签
  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'seller':
        return {
          icon: <Store className="h-3 w-3" />,
          label: t('accountSettings.sellerRole'),
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
      case 'vendor':
        return {
          icon: <ShoppingBag className="h-3 w-3" />,
          label: t('accountSettings.vendorRole'),
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        };
      default:
        return {
          icon: <User className="h-3 w-3" />,
          label: t('accountSettings.userRole'),
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const roleInfo = user ? getRoleInfo(user.role || 'user') : null;

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
            aria-label={t('common.backToHome')}
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
        <NavigationMenu className="hidden md:flex" aria-label={t('common.mainNavigation')}>
          <NavigationMenuList>
            {/* 首页 */}
            <NavigationMenuItem>
              <Link
                href="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="mr-1 h-4 w-4" />
                {t('common.home')}
              </Link>
            </NavigationMenuItem>

            {/* 产品库 */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="text-sm font-medium text-muted-foreground"
                aria-label={t('common.productLibrary')}
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
                        {product_categories?.slice(0, 4).map((category: ProductCategory) => (
                          <Link
                            key={category.id}
                            href={`/products?category_id=${category.id}`}
                            className="group flex flex-col items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            role="listitem"
                          >
                            {category.image ? (
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                <Image
                                  src={category.image}
                                  alt={category.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                            ) : (
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                  <Package className="h-8 w-8" />
                                </div>
                              </div>
                            )}
                            <span className="text-center">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h2 className="mb-2 text-sm font-medium leading-none">特色商品</h2>
                      <div className="grid grid-cols-2 gap-2" role="list">
                        <Link
                          href="/products/featured/new"
                          className="group flex flex-col items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          role="listitem"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                            <Package className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-center">新品上市</span>
                        </Link>
                        <Link
                          href="/products/featured/hot"
                          className="group flex flex-col items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          role="listitem"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                            <Flame className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-center">热销商品</span>
                        </Link>
                        <Link
                          href="/products/featured/sale"
                          className="group flex flex-col items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          role="listitem"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                            <Tag className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-center">特惠活动</span>
                        </Link>
                        <Link
                          href="/products/featured/limited"
                          className="group flex flex-col items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          role="listitem"
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                            <Timer className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-center">限量商品</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 供应商 */}
            <NavigationMenuItem>
              <Link
                href="/suppliers"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Store className="mr-1 h-4 w-4" />
                {t('common.suppliers')}
              </Link>
            </NavigationMenuItem>

            {/* 博客 */}
            <NavigationMenuItem>
              <Link
                href="/blog"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Book className="mr-1 h-4 w-4" />
                {t('blog.title')}
              </Link>
            </NavigationMenuItem>

            {/* 关于 */}
            <NavigationMenuItem>
              <Link
                href="/about"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Info className="mr-1 h-4 w-4" />
                {t('common.about')}
              </Link>
            </NavigationMenuItem>

            {/* 联系我们 */}
            <NavigationMenuItem>
              <Link
                href="/contact"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="mr-1 h-4 w-4" />
                {t('common.contact')}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 用户区域 */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <RegionSwitcher />
          <SearchDialog />

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="group relative hidden h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50 md:flex"
                aria-label={t('common.userMenu')}
              >
                <User
                  className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/20"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 overflow-hidden rounded-lg border bg-background/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
              role="menu"
              aria-label={t('common.userMenuOptions')}
            >
              <AnimatePresence>
                {isAuthenticated ? (
                  <>
                    <motion.div
                      key="user-info"
                      custom={0}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <DropdownMenuItem
                        className="group relative flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50"
                        role="menuitem"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-md bg-accent/20"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {user?.avatar ? (
                            <Image
                              src={user.avatar}
                              alt={`${user.name}的头像`}
                              width={32}
                              height={32}
                              layout="fixed"
                              className="h-full w-full rounded-full"
                            />
                          ) : (
                            <span
                              className="text-sm font-medium"
                              aria-label={`${user?.name}的首字母`}
                            >
                              {user?.name?.[0]}
                            </span>
                          )}
                        </div>
                        <div className="relative flex flex-col">
                          <span className="font-medium">{user?.name}</span>
                          <span className="text-xs text-muted-foreground">{user?.email}</span>
                          {roleInfo && (
                            <div className="flex items-center gap-1 pt-1">
                              <Badge
                                variant="outline"
                                className={`flex items-center gap-1 px-1 py-0 text-xs ${roleInfo.color}`}
                              >
                                {roleInfo.icon}
                                <span>{roleInfo.label}</span>
                              </Badge>
                              {user?.role === 'seller' && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 px-1 py-0 text-xs text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  <Shield className="mr-1 h-3 w-3" />
                                  {t('accountSettings.verified')}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </DropdownMenuItem>
                    </motion.div>
                    <DropdownMenuSeparator className="my-2" />
                    <motion.div
                      key="settings"
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link href="/account-settings">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <Settings className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.settings')}</span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                    <motion.div
                      key="my-stores"
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href="/my-stores">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <Users className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.myStores')}</span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                    <motion.div
                      key="selected-products"
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href="/selected-products">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <ShoppingCart className="relative h-4 w-4" />
                          <span className="relative font-medium">
                            {t('common.selectedProducts')}
                          </span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                    <motion.div
                      key="logout"
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-red-500 transition-all duration-200 hover:bg-red-500/10 focus:text-red-500"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-md bg-red-500/20"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <LogOut className="relative h-4 w-4" />
                        <span className="relative font-medium">{t('common.logout')}</span>
                        <ChevronRight className="relative ml-auto h-4 w-4 text-red-500/50" />
                      </DropdownMenuItem>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      key="auth-items"
                      custom={0}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link href="/auth/login">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <LogIn className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.login')}</span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/auth/register">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <UserPlus className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.register')}</span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                    <DropdownMenuSeparator className="my-2" />
                    <motion.div
                      key="cart"
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link href="/selected-products">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <ShoppingCart className="relative h-4 w-4" />
                          <span className="relative font-medium">
                            {t('common.selectedProducts')}
                          </span>
                          <ChevronRight className="relative ml-auto h-4 w-4 text-muted-foreground" />
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
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
            aria-label={isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
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
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-16 z-50 transform border-t bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden',
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
        )}
        role="navigation"
        aria-label={t('common.mobileNavigation')}
      >
        <nav className="container mx-auto flex flex-col divide-y divide-border">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium">{user?.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                  {roleInfo && (
                    <div className="flex items-center gap-1 pt-1">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 px-1 py-0 text-xs ${roleInfo.color}`}
                      >
                        {roleInfo.icon}
                        <span>{roleInfo.label}</span>
                      </Badge>
                      {user?.role === 'seller' && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 px-1 py-0 text-xs text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          {t('accountSettings.verified')}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="h-4 w-4" />
                {t('common.home')}
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Package className="h-4 w-4" />
                {t('common.productLibrary')}
              </Link>
              <Link
                href="/suppliers"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Store className="h-4 w-4" />
                {t('common.suppliers')}
              </Link>
              <Link
                href="/my-stores"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Users className="h-4 w-4" />
                {t('common.myStores')}
              </Link>
              <Link
                href="/selected-products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Star className="h-4 w-4" />
                {t('common.selectedProducts')}
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Book className="h-4 w-4" />
                {t('blog.title')}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Info className="h-4 w-4" />
                {t('common.about')}
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {t('common.contact')}
              </Link>
              <Link
                href="/account-settings"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                {t('common.settings')}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                {t('common.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Home className="h-4 w-4" />
                {t('common.home')}
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Package className="h-4 w-4" />
                {t('common.productLibrary')}
              </Link>
              <Link
                href="/suppliers"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Store className="h-4 w-4" />
                {t('common.suppliers')}
              </Link>
              <Link
                href="/selected-products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Star className="h-4 w-4" />
                {t('common.selectedProducts')}
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Book className="h-4 w-4" />
                {t('blog.title')}
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Info className="h-4 w-4" />
                {t('common.about')}
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {t('common.contact')}
              </Link>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <LogIn className="h-4 w-4" />
                {t('common.login')}
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <UserPlus className="h-4 w-4" />
                {t('common.register')}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
