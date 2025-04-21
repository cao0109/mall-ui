'use client';

import {
  BanknoteIcon,
  Check,
  CheckCircle,
  ClipboardCheck,
  Clock,
  CreditCard,
  Fingerprint,
  HelpCircle,
  Info,
  LockIcon,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Truck,
  WalletIcon,
} from 'lucide-react';
import Link from 'next/link';
import { AiFillWechat } from 'react-icons/ai';
import { FaAlipay, FaMoneyCheckAlt } from 'react-icons/fa';
import { RiVisaLine } from 'react-icons/ri';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const paymentMethods = [
  {
    id: 'alipay',
    name: '支付宝',
    icon: <FaAlipay size={24} className="text-[#1677FF]" />,
    description: '国内领先的第三方支付平台，安全便捷',
    advantages: ['随时随地，安全支付', '无需手续费', '支持花呗分期'],
    support: ['PC网页', '移动端', '支付宝APP'],
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: <AiFillWechat size={28} className="text-[#07C160]" />,
    description: '腾讯旗下支付平台，使用微信即可完成支付',
    advantages: ['扫码即可支付', '无需手续费', '支持零钱支付'],
    support: ['PC网页', '移动端', '微信APP'],
  },
  {
    id: 'unionpay',
    name: '银联支付',
    icon: <RiVisaLine size={24} className="text-[#0066B3]" />,
    description: '中国银联提供的安全支付服务',
    advantages: ['支持大多数银行卡', '交易更安全', '适合大额支付'],
    support: ['PC网页', '移动端', '银联云闪付'],
  },
  {
    id: 'bank',
    name: '对公转账',
    icon: <FaMoneyCheckAlt size={22} className="text-[#2E7D32]" />,
    description: '企业用户专属支付方式，支持大额交易',
    advantages: ['支持发票抬头', '适合大额订单', '专属对账服务'],
    support: ['企业网银', '柜台转账', '手机银行'],
  },
];

const paymentFAQs = [
  {
    question: '支付过程中遇到问题怎么办？',
    answer:
      '如果您在支付过程中遇到问题，请先检查网络连接是否稳定，或尝试刷新页面重新支付。如果问题仍然存在，可以联系我们的客服团队获取帮助。',
  },
  {
    question: '支付成功但订单显示未支付怎么办？',
    answer:
      '这种情况通常是由于系统延迟导致的。请耐心等待几分钟，系统会自动更新订单状态。如果超过30分钟订单状态仍未更新，请联系客服并提供您的支付凭证。',
  },
  {
    question: '支付安全吗？',
    answer:
      '是的，我们采用银行级加密技术保护您的支付信息。所有的支付流程都在第三方支付平台完成，我们不会存储您的银行卡信息。',
  },
  {
    question: '如何申请发票？',
    answer:
      '您可以在下单时选择是否需要发票，并填写发票信息。如果您在下单后需要申请发票，可以在订单详情页找到"申请发票"按钮，或联系客服进行处理。',
  },
  {
    question: '支持货到付款吗？',
    answer: '目前我们不支持货到付款，敬请谅解。',
  },
];

const paymentProcess = [
  {
    title: '选择商品',
    description: '挑选您需要的商品，添加到购物车',
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
  },
  {
    title: '确认订单',
    description: '核对订单信息，包括收货地址、商品信息等',
    icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: '选择支付方式',
    description: '选择您偏好的支付方式',
    icon: <CreditCard className="h-6 w-6 text-primary" />,
  },
  {
    title: '完成支付',
    description: '根据所选支付方式的指引完成付款',
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: '等待发货',
    description: '我们会尽快为您安排发货',
    icon: <Truck className="h-6 w-6 text-primary" />,
  },
];

export default function PaymentHelpPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <PageHeader
        title="支付帮助中心"
        subtitle="了解我们支持的支付方式、流程及常见问题解答"
        icon={<WalletIcon className="h-6 w-6" />}
        badge={{ text: '支付', variant: 'primary' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="methods" className="space-y-8">
          <div className="sticky top-0 z-10 -mx-4 bg-background/80 px-4 py-2 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="methods" className="py-2.5">
                <CreditCard className="mr-2 h-4 w-4" />
                支付方式
              </TabsTrigger>
              <TabsTrigger value="process" className="py-2.5">
                <ReceiptText className="mr-2 h-4 w-4" />
                支付流程
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
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">我们接受的支付方式</h2>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  HiDoo跨境电商平台支持多种支付方式，您可以根据自己的需求选择最适合的支付方法。所有支付渠道均采用银行级加密技术，确保您的资金安全。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {paymentMethods.map(method => (
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
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-medium">优势</h4>
                      <ul className="space-y-1">
                        {method.advantages.map((advantage, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="mr-2 mt-0.5 h-3.5 w-3.5 text-primary" />
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">支持平台</h4>
                      <div className="flex flex-wrap gap-2">
                        {method.support.map((platform, index) => (
                          <div
                            key={index}
                            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                          >
                            {platform}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      查看详情
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">发票说明</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  我们提供电子发票和纸质发票服务。您可以在下单时选择是否需要发票，并填写发票抬头、税号等信息。如有发票相关问题，请联系我们的客服。
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-card p-3">
                    <h4 className="font-medium">电子发票</h4>
                    <p className="text-xs text-muted-foreground">
                      快速便捷，系统自动发送至您的邮箱
                    </p>
                  </div>
                  <div className="rounded-lg bg-card p-3">
                    <h4 className="font-medium">纸质发票</h4>
                    <p className="text-xs text-muted-foreground">随订单一起寄出，或单独邮寄</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>支付流程指南</CardTitle>
                <CardDescription>了解从商品选择到完成支付的整个流程</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mt-4">
                  <div className="absolute left-8 top-0 h-full w-px bg-border"></div>
                  <ol className="space-y-10">
                    {paymentProcess.map((step, index) => (
                      <li key={index} className="relative pl-16">
                        <div className="absolute left-[1.6875rem] top-0 -translate-x-1/2 -translate-y-1/3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-muted">
                            {step.icon}
                          </div>
                        </div>
                        <h3 className="text-lg font-medium">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 border-t px-6 py-5">
                <div className="flex items-center gap-2">
                  <BanknoteIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">支付小贴士</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      1
                    </span>
                    <span>支付前请确认您的订单信息和收货地址是否正确</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      2
                    </span>
                    <span>如果需要发票，请在下单时填写完整的发票信息</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      3
                    </span>
                    <span>若支付过程中遇到问题，请勿重复下单，及时联系客服</span>
                  </li>
                </ul>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <LockIcon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="mt-3 text-base">安全支付</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    所有支付过程均采用SSL加密技术，保护您的支付信息安全。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Fingerprint className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="mt-3 text-base">身份验证</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    支持3D验证，二次验证等多重安全措施，防止欺诈交易。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="mt-3 text-base">即时到账</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    支付成功后系统会立即更新订单状态，无需长时间等待。
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">支付常见问题</h2>
              <div className="space-y-4">
                {paymentFAQs.map((faq, index) => (
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
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">还有其他支付问题？</h3>
                  <p className="mt-1 text-muted-foreground">
                    如果您的问题在上面没有得到解答，请直接联系我们的客服团队，我们将为您提供及时的帮助。
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
