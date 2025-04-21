'use client';

import {
  Box,
  Check,
  Clock,
  Compass,
  GlobeIcon,
  HelpCircle,
  Info,
  MapPin,
  PackageOpen,
  RefreshCw,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { BiWorld } from 'react-icons/bi';
import { FaBoxOpen, FaShippingFast, FaWarehouse } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

import { PageHeader } from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 配送方式数据
const shippingMethods = [
  {
    id: 'standard',
    name: '标准配送',
    icon: <TbTruckDelivery size={24} className="text-primary" />,
    description: '经济实惠的配送方式，适合大多数订单',
    time: '3-7个工作日',
    fee: '¥15.00起',
    limit: '无重量限制',
    support: ['国内所有地区', '港澳台地区'],
  },
  {
    id: 'express',
    name: '极速达',
    icon: <FaShippingFast size={22} className="text-[#F57C00]" />,
    description: '最快次日送达，部分地区支持当日达',
    time: '1-2个工作日',
    fee: '¥25.00起',
    limit: '重量≤10kg',
    support: ['一线城市', '部分二线城市'],
  },
  {
    id: 'international',
    name: '跨境配送',
    icon: <BiWorld size={24} className="text-[#2196F3]" />,
    description: '支持全球大多数国家和地区',
    time: '7-15个工作日',
    fee: '¥99.00起',
    limit: '重量≤20kg',
    support: ['美国', '欧盟', '东南亚', '澳洲'],
  },
  {
    id: 'pickup',
    name: '自提',
    icon: <FaWarehouse size={20} className="text-[#4CAF50]" />,
    description: '在就近自提点免费取件',
    time: '3-5个工作日',
    fee: '免费',
    limit: '重量≤30kg',
    support: ['全国自提网点', '合作门店'],
  },
];

// 常见问题数据
const shippingFAQs = [
  {
    question: '如何查询物流信息？',
    answer:
      '您可以在"我的订单"中找到您的订单，点击"查看物流"按钮即可查询物流信息。您也可以复制物流单号，前往对应物流公司官网查询。',
  },
  {
    question: '为什么我的订单显示"已发货"但物流信息未更新？',
    answer:
      '物流信息通常会有一定延迟。商品发出后，物流公司会在揽收包裹后才更新物流信息，这个过程可能需要24小时。如长时间未更新，请联系客服。',
  },
  {
    question: '配送范围包括哪些地区？',
    answer:
      '我们的标准配送覆盖国内所有地区及港澳台地区。跨境配送则支持全球大多数国家和地区，部分偏远地区可能无法配送。',
  },
  {
    question: '如何修改收货地址？',
    answer:
      '订单状态为"待发货"时，您可以在订单详情页点击"修改地址"。如果订单已发货，建议您联系客服协助处理。',
  },
  {
    question: '收到的商品损坏了怎么办？',
    answer:
      '请在签收后48小时内拍摄损坏商品和包装的照片，联系客服申请退换货。我们会根据实际情况为您安排退换或补发。',
  },
];

// 物流追踪流程示例
const trackingSteps = [
  {
    title: '订单已确认',
    description: '您的订单已确认，等待打包发货',
    time: '2023-11-10 15:30:25',
    completed: true,
  },
  {
    title: '包裹已发出',
    description: '包裹已由仓库发出，等待物流公司揽收',
    time: '2023-11-11 09:15:42',
    completed: true,
  },
  {
    title: '物流公司已揽收',
    description: '物流公司已揽收包裹，开始运输',
    time: '2023-11-11 14:22:18',
    completed: true,
  },
  {
    title: '包裹运输中',
    description: '包裹正在路上，预计2-3天内送达',
    time: '2023-11-12 08:10:35',
    completed: true,
  },
  {
    title: '包裹已到达目的地',
    description: '包裹已到达您所在城市，等待派送',
    time: '2023-11-14 16:45:11',
    completed: false,
  },
  {
    title: '派送中',
    description: '快递员正在派送中，请保持电话畅通',
    time: '-',
    completed: false,
  },
  {
    title: '已签收',
    description: '包裹已签收，感谢您的惠顾',
    time: '-',
    completed: false,
  },
];

export default function ShippingHelpPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <PageHeader
        title="物流配送帮助"
        subtitle="了解我们的配送方式、时效和常见物流问题"
        icon={<Truck className="h-6 w-6" />}
        badge={{ text: '物流', variant: 'primary' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="methods" className="space-y-8">
          <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 py-2 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="methods" className="py-2.5">
                <Truck className="mr-2 h-4 w-4" />
                配送方式
              </TabsTrigger>
              <TabsTrigger value="tracking" className="py-2.5">
                <PackageOpen className="mr-2 h-4 w-4" />
                物流追踪
              </TabsTrigger>
              <TabsTrigger value="faq" className="py-2.5">
                <HelpCircle className="mr-2 h-4 w-4" />
                常见问题
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="methods" className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <FaBoxOpen className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">我们的配送服务</h2>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  HiDoo提供多种配送方式，满足不同客户的需求。从经济实惠的标准配送到高效快捷的极速达服务，再到覆盖全球的跨境物流，您可以根据自己的需求选择最适合的配送方式。
                </p>
                <p className="mt-2">所有订单均提供全程追踪服务，您可以随时查看您的包裹状态。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {shippingMethods.map(method => (
                <Card key={method.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle>{method.name}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          配送时间
                        </h4>
                        <p className="mt-1 flex items-center gap-1.5 text-sm">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{method.time}</span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          配送费用
                        </h4>
                        <p className="mt-1 flex items-center gap-1.5 text-sm">
                          <Box className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{method.fee}</span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          重量限制
                        </h4>
                        <p className="mt-1 flex items-center gap-1.5 text-sm">
                          <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{method.limit}</span>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase text-muted-foreground">
                          配送区域
                        </h4>
                        <div className="mt-1 flex flex-col gap-1">
                          {method.support.map((area, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="inline-flex w-fit items-center justify-start gap-1"
                            >
                              <MapPin className="h-3 w-3" />
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      了解详情
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GlobeIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">全球配送政策</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  我们的跨境物流服务覆盖全球多个国家和地区。不同国家和地区的配送时间和关税政策可能有所不同，详情请参考下表或联系客服咨询。
                </p>
                <div className="mt-4">
                  <div className="overflow-hidden rounded-lg border bg-card">
                    <div className="grid grid-cols-3 gap-4 border-b p-3 text-sm font-medium">
                      <div>区域</div>
                      <div>预计配送时间</div>
                      <div>是否包含关税</div>
                    </div>
                    <div className="divide-y text-sm">
                      <div className="grid grid-cols-3 gap-4 p-3">
                        <div>北美洲</div>
                        <div>7-12个工作日</div>
                        <div>否</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-3">
                        <div>欧洲</div>
                        <div>8-15个工作日</div>
                        <div>否</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-3">
                        <div>东南亚</div>
                        <div>5-10个工作日</div>
                        <div>部分国家包含</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-3">
                        <div>澳洲/新西兰</div>
                        <div>10-15个工作日</div>
                        <div>否</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>物流追踪示例</CardTitle>
                <CardDescription>了解商品发货后的物流追踪流程</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mt-4 pb-4">
                  <div className="absolute left-[22px] top-1 h-full w-px bg-border"></div>
                  <ol className="space-y-6">
                    {trackingSteps.map((step, index) => (
                      <li key={index} className="relative pl-14">
                        <div
                          className={`absolute left-[22px] top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 ${
                            step.completed
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-muted-foreground/30 bg-muted/30 text-muted-foreground/50'
                          }`}
                        >
                          {step.completed ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h3
                            className={`font-medium ${
                              step.completed ? 'text-foreground' : 'text-muted-foreground/70'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              step.completed ? 'text-muted-foreground' : 'text-muted-foreground/50'
                            }`}
                          >
                            {step.description}
                          </p>
                          <span
                            className={`mt-1 text-xs ${
                              step.completed
                                ? 'text-muted-foreground/70'
                                : 'text-muted-foreground/40'
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-4 rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium">当前配送进度</h3>
                    <span className="text-xs text-muted-foreground">4/7 步骤</span>
                  </div>
                  <Progress value={57} className="h-2" />
                  <p className="mt-3 text-xs text-muted-foreground">
                    预计送达时间：2023-11-15 12:00-18:00
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4 border-t px-6 py-5">
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">物流追踪小贴士</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      1
                    </span>
                    <span>您可以通过订单号或物流单号查询物流信息</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      2
                    </span>
                    <span>物流信息更新可能存在延迟，请以实际配送情况为准</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      3
                    </span>
                    <span>如遇物流异常，可联系客服处理或直接联系物流公司</span>
                  </li>
                </ul>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">如何查询物流？</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground">您可以通过以下方式查询物流状态：</p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        1
                      </span>
                      <span>登录账户，在&quot;我的订单&quot;中查看物流详情</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        2
                      </span>
                      <span>复制物流单号，前往对应物流公司官网查询</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        3
                      </span>
                      <span>关注我们的微信公众号，绑定账号后可查询物流</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">无法收货时怎么办？</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground">如果您无法在派送时间收货：</p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        1
                      </span>
                      <span>与快递员联系，申请改期或更改地址</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        2
                      </span>
                      <span>联系客服，申请将包裹送至自提点</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        3
                      </span>
                      <span>授权他人代收（需提前告知快递员）</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">物流配送常见问题</h2>
              <div className="space-y-4">
                {shippingFAQs.map((faq, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h3 className="flex items-start text-base font-medium">
                      <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        Q
                      </span>
                      {faq.question}
                    </h3>
                    <Separator className="my-3" />
                    <p className="pl-9 text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-muted/20 p-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">配送问题或建议？</h3>
                  <p className="mt-1 text-muted-foreground">
                    如果您对我们的物流配送服务有任何问题或建议，欢迎联系我们的客服团队。我们会不断优化物流体验，为您提供更好的服务。
                  </p>
                </div>
                <div className="shrink-0">
                  <Button asChild>
                    <Link href="/contact">联系客服</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
