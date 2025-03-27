"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { RegionSwitcher } from "@/components/region-switcher";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth";
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
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
      title: t("auth.logoutSuccess"),
      description: t("auth.logoutDescription"),
    });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        {/* 导航区域 - 中等屏幕及以上显示 */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground">
                <Package className="mr-1 h-4 w-4" />
                {t("common.productLibrary")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none mb-2">
                        热门分类
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/products/category/electronics"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          电子产品
                        </Link>
                        <Link
                          href="/products/category/clothing"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          服装服饰
                        </Link>
                        <Link
                          href="/products/category/home"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          家居用品
                        </Link>
                        <Link
                          href="/products/category/beauty"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          美妆个护
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none mb-2">
                        特色商品
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/products/featured/new"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          新品上市
                        </Link>
                        <Link
                          href="/products/featured/hot"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          热销商品
                        </Link>
                        <Link
                          href="/products/featured/sale"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          特惠活动
                        </Link>
                        <Link
                          href="/products/featured/limited"
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          限量商品
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/suppliers" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2 flex items-center">
                  <Store className="mr-1 h-4 w-4" />
                  {t("common.suppliers")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/my-stores" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2 flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {t("common.myStores")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/selected-products" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2 flex items-center">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  {t("common.selectedProducts")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2 flex items-center">
                  <Info className="mr-1 h-4 w-4" />
                  关于我们
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2 flex items-center">
                  <Phone className="mr-1 h-4 w-4" />
                  联系我们
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 用户区域 */}
        <div className="flex items-center space-x-2">
          {/* 搜索按钮 */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 top-[20%]">
              <div className="flex items-center px-4 py-3 border-b">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <DialogTitle className="text-base font-medium">
                  {t("common.search")}
                </DialogTitle>
              </div>
              <div className="p-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={t("common.search")}
                    className="w-full py-2 pl-10 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <LanguageSwitcher />
          <RegionSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
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
                    <DropdownMenuItem className="cursor-pointer">
                      {t("common.myStores")}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/selected-products">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t("common.selectedProducts")}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("common.settings")}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("common.logout")}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("common.login")}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/auth/register">
                    <DropdownMenuItem className="cursor-pointer">
                      {t("common.register")}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/selected-products">
                    <DropdownMenuItem className="cursor-pointer">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t("common.selectedProducts")}
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {!isAuthenticated && (
            <Link href="/auth/login">
              <Button size="sm" className="hidden md:flex">
                {t("common.login")}
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

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
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
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("common.myStores")}
                </Link>
                <Link
                  href="/selected-products"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("common.selectedProducts")}
                </Link>
                <Link
                  href="/settings"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t("common.settings")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-sm font-medium flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("common.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/products"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("common.productLibrary")}
                </Link>
                <Link
                  href="/suppliers"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("common.suppliers")}
                </Link>
                <Link
                  href="/selected-products"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("common.selectedProducts")}
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-3 border-b text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("common.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("common.register")}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
