import { Lock, Shield, ShoppingBag, Store, User } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('accountSettings');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AccountSettingsPage() {
  const t = await getTranslations('accountSettings');

  // 模拟用户数据，实际应用中应从API或状态管理获取
  const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'seller',
    storeCount: 2,
    productCount: 45,
    joinDate: '2023-01-15',
    verified: true,
  };

  // 根据角色获取对应的图标和标签
  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'seller':
        return {
          icon: <Store className="h-4 w-4" />,
          label: t('sellerRole'),
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
      case 'vendor':
        return {
          icon: <ShoppingBag className="h-4 w-4" />,
          label: t('vendorRole'),
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        };
      default:
        return {
          icon: <User className="h-4 w-4" />,
          label: t('userRole'),
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const roleInfo = getRoleInfo(userData.role);

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('description')}</p>
      </div>

      <div className="mx-auto rounded-xl border bg-card shadow-sm">
        <Tabs defaultValue="profile" className="w-full">
          <div className="border-b px-4">
            <TabsList className="mx-auto flex h-14 w-full max-w-md justify-center space-x-4 bg-transparent p-0">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <User className="h-4 w-4" />
                <span className="font-medium">{t('profile')}</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <Lock className="h-4 w-4" />
                <span className="font-medium">{t('security')}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="profile" className="mt-0">
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex flex-col space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <h3 className="text-lg font-medium">{userData.name}</h3>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${roleInfo.color}`}
                      >
                        {roleInfo.icon}
                        <span>{roleInfo.label}</span>
                      </Badge>
                      {userData.verified && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          <Shield className="mr-1 h-3 w-3" />
                          {t('verified')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{t('profileDescription')}</p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      {t('changeAvatar')}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <span className="text-2xl font-bold">{userData.storeCount}</span>
                    <span className="text-sm text-muted-foreground">{t('stores')}</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <span className="text-2xl font-bold">{userData.productCount}</span>
                    <span className="text-sm text-muted-foreground">{t('products')}</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <span className="text-2xl font-bold">{userData.joinDate}</span>
                    <span className="text-sm text-muted-foreground">{t('joinDate')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t('profileSettings')}</h3>
                  <p className="text-sm text-muted-foreground">{t('profileDescription')}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t('name')}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t('namePlaceholder')}
                      className="h-10"
                      defaultValue={userData.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="h-10"
                      defaultValue={userData.email}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="px-6">{t('saveProfile')}</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t('passwordSettings')}</h3>
                  <p className="text-sm text-muted-foreground">{t('passwordDescription')}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-medium">
                      {t('currentPassword')}
                    </Label>
                    <Input id="currentPassword" type="password" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      {t('newPassword')}
                    </Label>
                    <Input id="newPassword" type="password" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      {t('confirmPassword')}
                    </Label>
                    <Input id="confirmPassword" type="password" className="h-10" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="px-6">{t('changePassword')}</Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
