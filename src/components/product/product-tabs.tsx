'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricedProduct } from '@/types/product';

import HtmlRichText from '../html-rich-text';

import { ProductReviews } from './product-reviews';

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

  // 模拟评论数据
  const mockReviews = [
    {
      id: '1',
      title: '非常满意的购物体验',
      content:
        '商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！',
      rating: 5,
      customer: {
        first_name: '张',
        last_name: '小明',
        email: 'xiaoming@example.com',
      },
      created_at: '2024-04-05T10:30:00Z',
    },
    {
      id: '2',
      title: '性价比很高',
      content: '价格实惠，商品和描述的一样。就是发货稍微有点慢，其他都挺好的。',
      rating: 4,
      customer: {
        first_name: '李',
        last_name: '华',
        email: 'lihua@example.com',
      },
      created_at: '2024-04-03T15:20:00Z',
    },
    {
      id: '3',
      title: '一般般吧',
      content: '商品本身没什么问题，但是款式跟图片有点差异。建议卖家把产品图片拍得更真实一些。',
      rating: 3,
      customer: {
        first_name: '王',
        last_name: '芳',
        email: 'wangfang@example.com',
      },
      created_at: '2024-04-01T09:15:00Z',
    },
    {
      id: '4',
      title: '非常满意的购物体验',
      content:
        '商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！',
      rating: 5,
      created_at: '2024-03-30T09:15:00Z',
    },
    {
      id: '5',
      title: '非常满意的购物体验',
      content:
        '商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！',
      rating: 5,
      created_at: '2024-03-29T09:15:00Z',
    },
    {
      id: '6',
      title: '非常满意的购物体验',
      content:
        '商品质量很好，物流速度快，包装也很完整。卖家服务态度很好，有问必答。下次还会继续购买！',
      rating: 5,
      created_at: '2024-03-28T09:15:00Z',
    },
  ];

  // 提取产品规格
  const specs = product.variants.map(variant => ({
    title: variant.title,
    sku: variant.sku,
    barcode: variant.barcode,
  })) as Spec[];

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">{t('details')}</TabsTrigger>
        <TabsTrigger value="specs">{t('specifications')}</TabsTrigger>
        <TabsTrigger value="reviews">用户评价</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-3 sm:mt-4">
        <Card className="p-4 sm:p-6">
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <HtmlRichText content={product.details || ''} />
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
      <TabsContent value="reviews">
        <div className="space-y-6">
          <ProductReviews reviews={mockReviews} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
