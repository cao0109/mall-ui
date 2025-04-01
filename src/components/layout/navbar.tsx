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
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useToast } from '@/hooks/use-toast';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { ProductCategory } from '@medusajs/medusa';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Clock,
  Command,
  Flame,
  History,
  Info,
  LogIn,
  LogOut,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  Timer,
  User,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useProductCategories } from 'medusa-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();
  const { product_categories } = useProductCategories({
    limit: 4,
    parent_category_id: 'null',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 保存搜索历史
  const saveSearchHistory = (query: string) => {
    if (!query.trim()) return;
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 清除搜索历史
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // 处理搜索
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    saveSearchHistory(query);
    // TODO: 实现搜索功能
    setIsSearchOpen(false);
  };

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
                            {category.image && (
                              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                <Image
                                  src={category.image}
                                  alt={category.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
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
            <NavigationMenuItem>
              <Link
                href="/suppliers"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Store className="mr-1 h-4 w-4" />
                {t('common.suppliers')}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/my-stores"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Users className="mr-1 h-4 w-4" />
                {t('common.myStores')}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/selected-products"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                {t('common.selectedProducts')}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Info className="mr-1 h-4 w-4" />
                {t('common.about')}
              </Link>
            </NavigationMenuItem>
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

          {/* 搜索按钮和对话框 */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen} aria-label="搜索">
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="group relative hidden h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-accent/50 md:flex"
                aria-label="打开搜索"
              >
                <Search
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
            </DialogTrigger>
            <DialogContent
              className="top-[20%] gap-0 overflow-hidden p-0 sm:max-w-[425px]"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center border-b px-4 py-3"
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <DialogTitle className="text-base font-medium">{t('common.search')}</DialogTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="p-4"
              >
                <div className="relative w-full">
                  <label htmlFor="search-input" className="sr-only">
                    {t('search.searchContent')}
                  </label>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="relative"
                  >
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleSearch(searchQuery);
                        }
                      }}
                      placeholder={t('search.searchPlaceholder')}
                      className="w-full rounded-lg border border-input bg-background/50 py-2 pl-10 pr-4 text-sm ring-offset-background backdrop-blur-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      autoFocus
                      aria-label={t('search.searchInput')}
                    />
                    <Search
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Command className="h-3 w-3" />
                    <span>{t('search.search')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                      esc
                    </kbd>
                    <span>{t('search.close')}</span>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                  >
                    {/* 搜索历史 */}
                    {searchHistory.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-muted-foreground">
                            {t('search.searchHistory')}
                          </h3>
                          <button
                            onClick={clearSearchHistory}
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {t('search.clearHistory')}
                          </button>
                        </div>
                        <div className="mt-2 space-y-1">
                          {searchHistory.map((term, index) => (
                            <motion.button
                              key={term}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSearchQuery(term);
                                handleSearch(term);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <History className="h-4 w-4" />
                              <span>{term}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* 热门搜索 */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="border-t p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-medium text-muted-foreground">
                          {t('search.hotSearches')}
                        </h3>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          t('search.newArrivals'),
                          t('search.hotProducts'),
                          t('search.specialOffers'),
                          t('search.limitedEdition'),
                        ].map((term, index) => (
                          <motion.button
                            key={term}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSearchQuery(term);
                              handleSearch(term);
                            }}
                            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* 实时搜索建议 */}
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                        className="border-t p-4"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <h3 className="text-sm font-medium text-muted-foreground">
                            {t('search.suggestions')}
                          </h3>
                        </div>
                        <div className="mt-2 space-y-1">
                          {[
                            t('search.relatedProducts', { query: searchQuery }),
                            t('search.specialOffersFor', { query: searchQuery }),
                            t('search.newArrivalsFor', { query: searchQuery }),
                          ].map((suggestion, index) => (
                            <motion.button
                              key={suggestion}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                handleSearch(suggestion);
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <Search className="h-4 w-4" />
                              <span>{suggestion}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>

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
                        </div>
                      </DropdownMenuItem>
                    </motion.div>
                    <DropdownMenuSeparator className="my-2" />
                    <motion.div
                      key="menu-items"
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link href="/my-stores">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <Store className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.myStores')}</span>
                        </DropdownMenuItem>
                      </Link>
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
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/settings">
                        <DropdownMenuItem className="group relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-all duration-200 hover:bg-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-md bg-accent/20"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <Settings className="relative h-4 w-4" />
                          <span className="relative font-medium">{t('common.settings')}</span>
                        </DropdownMenuItem>
                      </Link>
                    </motion.div>
                    <DropdownMenuSeparator className="my-2" />
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
                </div>
              </div>
              <Link
                href="/my-stores"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Store className="h-4 w-4" />
                {t('common.myStores')}
              </Link>
              <Link
                href="/selected-products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                {t('common.selectedProducts')}
              </Link>
              <Link
                href="/settings"
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
                <ShoppingCart className="h-4 w-4" />
                {t('common.selectedProducts')}
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
