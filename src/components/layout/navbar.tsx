"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { RegionSwitcher } from "@/components/region-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link, useRouter } from "@/i18n/navigation";
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
import { useTranslations } from "next-intl";
import { useState } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
              placeholder={t("common.search")}
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
            {t("common.productLibrary")}
          </Link>
          <Link
            href="/suppliers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("common.suppliers")}
          </Link>
          <Link
            href="/my-stores"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("common.myStores")}
          </Link>
          <Link
            href="/selected-products"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            {t("common.selectedProducts")}
          </Link>
        </nav>

        {/* 用户区域 */}
        <div className="flex items-center space-x-4">
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
                    <DropdownMenuItem>{t("common.myStores")}</DropdownMenuItem>
                  </Link>
                  <Link href="/selected-products">
                    <DropdownMenuItem>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t("common.selectedProducts")}
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      {t("common.settings")}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("common.logout")}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <DropdownMenuItem>{t("common.login")}</DropdownMenuItem>
                  </Link>
                  <Link href="/auth/register">
                    <DropdownMenuItem>{t("common.register")}</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/selected-products">
                    <DropdownMenuItem>
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

      {/* 移动端搜索框 */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("common.search")}
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
                  {t("common.myStores")}
                </Link>
                <Link
                  href="/selected-products"
                  className="px-4 py-3 border-b text-sm font-medium flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("common.selectedProducts")}
                </Link>
                <Link
                  href="/settings"
                  className="px-4 py-3 border-b text-sm font-medium flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t("common.settings")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-sm font-medium flex items-center text-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("common.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/products"
                  className="px-4 py-3 border-b text-sm font-medium"
                >
                  {t("common.productLibrary")}
                </Link>
                <Link
                  href="/suppliers"
                  className="px-4 py-3 border-b text-sm font-medium"
                >
                  {t("common.suppliers")}
                </Link>
                <Link
                  href="/selected-products"
                  className="px-4 py-3 border-b text-sm font-medium flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("common.selectedProducts")}
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-3 border-b text-sm font-medium"
                >
                  {t("common.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-3 text-sm font-medium"
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
