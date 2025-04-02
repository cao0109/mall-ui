'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricedProduct } from '@/types/product';

interface ProductTabsProps {
  product: PricedProduct;
}

interface Spec {
  title: string;
  sku: string | null | undefined;
  barcode: string | null | undefined;
  [key: string]: string | null | undefined;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const t = useTranslations('product.tabs');

  // 提取产品规格
  const specs = product.variants.map(variant => ({
    title: variant.title,
    sku: variant.sku,
    barcode: variant.barcode,
  })) as Spec[];

  return (
    <Tabs defaultValue="details" className="mt-6 sm:mt-8">
      <TabsList className="w-full sm:w-auto">
        <TabsTrigger value="details" className="flex-1 text-xs sm:flex-initial sm:text-sm">
          {t('details')}
        </TabsTrigger>
        <TabsTrigger value="specs" className="flex-1 text-xs sm:flex-initial sm:text-sm">
          {t('specs')}
        </TabsTrigger>
        <TabsTrigger value="shipping" className="flex-1 text-xs sm:flex-initial sm:text-sm">
          {t('shipping')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-3 sm:mt-4">
        <Card className="p-4 sm:p-6">
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <h2 className="text-lg sm:text-xl">{t('description')}</h2>
            <p>{product.description}</p>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="specs" className="mt-3 sm:mt-4">
        <Card className="p-4 sm:p-6">
          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('basicInfo')}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">{t('productName')}</p>
                  <p className="mt-1">{product.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('productCode')}</p>
                  <p className="mt-1">{product.handle}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* 规格信息 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('specifications')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                        {t('spec')}
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                        SKU
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                        {t('barcode')}
                      </th>
                      {product.options?.map(option => (
                        <th
                          key={option.id}
                          className="px-4 py-2 text-left text-sm font-medium text-muted-foreground"
                        >
                          {option.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm">{spec.title}</td>
                        <td className="px-4 py-2 text-sm">{spec.sku || '-'}</td>
                        <td className="px-4 py-2 text-sm">{spec.barcode || '-'}</td>
                        {product.options?.map(option => (
                          <td key={option.id} className="px-4 py-2 text-sm">
                            {spec[option.title || ''] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Separator />

            {/* 其他参数 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('otherParams')}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.metadata &&
                  Object.entries(product.metadata).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="mt-1">{String(value || '')}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="shipping" className="mt-3 sm:mt-4">
        <Card className="p-4 sm:p-6">
          <div className="space-y-3 text-sm sm:space-y-4 sm:text-base">
            <div>
              <h3 className="font-semibold">{t('shippingOrigin')}</h3>
              <p className="text-muted-foreground">
                {String(product.metadata?.origin || t('china'))}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">{t('shippingMethod')}</h3>
              <p className="text-muted-foreground">
                {String(product.metadata?.shipping_methods || t('standardShipping'))}
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
