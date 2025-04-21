'use client';

import {
  Clock,
  Flame,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Tag,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const faqs = [
  {
    id: 'faq-1',
    question: '如何创建账户？',
    answer:
      "点击网站右上角的'注册'按钮，填写必要信息即可完成账户创建。我们会向您的邮箱发送验证邮件，请及时验证。",
    category: '入门指南',
    isHot: true,
  },
  {
    id: 'faq-2',
    question: 'HiDoo平台如何保证供应商的质量？',
    answer:
      '我们有严格的供应商审核机制。所有供应商在入驻前都需要通过资质审核、实地考察等多个环节。我们会定期对供应商进行评估，包括产品质量、发货速度、售后服务等多个维度，确保为您提供优质的供应商资源。',
    category: '供应商管理',
    isHot: true,
  },
  {
    id: 'faq-3',
    question: '支持哪些支付方式？',
    answer:
      '我们支持支付宝、微信支付、银联等主流支付方式。对于企业用户，我们还支持对公转账。所有支付渠道都经过严格的安全认证，确保您的资金安全。',
    category: '支付方式',
    isHot: true,
  },
  {
    id: 'faq-4',
    question: '如何查看订单状态？',
    answer:
      "登录后，点击'我的订单'即可查看所有订单的状态。您也可以通过订单号在订单查询页面直接查询。",
    category: '订单管理',
    isHot: false,
  },
  {
    id: 'faq-5',
    question: '退换货政策是怎样的？',
    answer:
      '商品签收后7天内，如果商品存在质量问题，我们提供免费退换服务。部分特殊商品（如定制商品）可能不支持退换，具体以商品页面说明为准。',
    category: '售后服务',
    isHot: true,
  },
  {
    id: 'faq-6',
    question: '如何成为供应商？',
    answer:
      '请将您的公司介绍、产品目录等相关资料发送至：supplier@example.com，我们的商务团队会在3个工作日内与您联系。',
    category: '供应商管理',
    isHot: false,
  },
  {
    id: 'faq-7',
    question: '如何联系客服？',
    answer:
      '您可以通过以下方式联系我们：1. 在线客服（工作日9:00-18:00）2. 客服热线：400-xxx-xxxx 3. 发送邮件至：support@example.com',
    category: '联系我们',
    isHot: true,
  },
  {
    id: 'faq-8',
    question: '是否提供发票？',
    answer: '是的，我们提供电子发票和纸质发票。您可以在下单时选择是否需要发票，并填写发票信息。',
    category: '支付方式',
    isHot: false,
  },
  {
    id: 'faq-9',
    question: '物流配送时间是多久？',
    answer:
      '我们承诺在订单支付成功后48小时内发货。具体送达时间取决于配送地址，一般国内3-7天可送达，跨境配送7-15天可送达。您可以在订单详情页实时查看物流状态。',
    category: '物流配送',
    isHot: true,
  },
  {
    id: 'faq-10',
    question: '如何选择合适的产品？',
    answer:
      '您可以通过以下方式找到合适的产品：1. 使用搜索功能 2. 浏览分类目录 3. 查看热销榜单 4. 使用筛选功能（如价格区间、发货地等）。我们还提供产品对比功能，帮助您更好地做出选择。',
    category: '产品选购',
    isHot: false,
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));
const hotFaqs = faqs.filter(faq => faq.isHot);
const recentFaqs = faqs.slice(-5);

const contactMethods = [
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: '在线客服',
    description: '工作日 9:00-18:00',
    action: '立即咨询',
    link: '/support',
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: '客服热线',
    description: '400-xxx-xxxx',
    action: '拨打电话',
    link: 'tel:400-xxx-xxxx',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: '电子邮件',
    description: 'support@example.com',
    action: '发送邮件',
    link: 'mailto:support@example.com',
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredFaqs = faqs.filter(
    faq =>
      (selectedCategory === '全部' || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background pb-16">
      <PageHeader
        title="常见问题解答"
        subtitle="解答您的疑问，帮助您更好地使用 HiDoo 跨境电商平台"
        icon={<HelpCircle className="h-6 w-6" />}
        badge={{ text: 'FAQ', variant: 'primary' }}
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: '输入关键词搜索问题...',
        }}
      />

      <div className="container mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
        {/* 快速访问区域 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {method.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 w-full border-primary/50 text-primary hover:bg-primary/5"
                >
                  <a href={method.link}>{method.action}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容区域 */}
        <Card className="overflow-hidden shadow-sm">
          <CardHeader className="border-b border-border/60 bg-muted/30 pb-6">
            <CardTitle className="text-xl font-semibold">常见问题分类</CardTitle>
            <CardDescription>选择问题分类或使用上方搜索栏查找您需要的帮助</CardDescription>
          </CardHeader>
          <CardContent className="p-6 lg:p-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="h-auto bg-muted/40 p-1">
                  <TabsTrigger
                    value="all"
                    className="flex items-center gap-1 rounded-md data-[state=active]:bg-background"
                  >
                    <Tag className="h-4 w-4" />
                    <span>全部问题</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="hot"
                    className="flex items-center gap-1 rounded-md data-[state=active]:bg-background"
                  >
                    <Flame className="h-4 w-4" />
                    <span>热门问题</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent"
                    className="flex items-center gap-1 rounded-md data-[state=active]:bg-background"
                  >
                    <Clock className="h-4 w-4" />
                    <span>最新问题</span>
                  </TabsTrigger>
                </TabsList>

                {/* 仅在"全部"标签下显示分类筛选 */}
                <div className="scrollbar-thin -mx-1 flex overflow-x-auto px-1 pb-2 sm:hidden">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="mr-2 flex-shrink-0 whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <TabsContent value="all" className="m-0 mt-2">
                {/* 分类按钮组 - 桌面版 */}
                <div className="mb-6 hidden flex-wrap gap-2 sm:flex">
                  <Button
                    variant={selectedCategory === '全部' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('全部')}
                    className="flex-shrink-0"
                  >
                    全部
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="flex-shrink-0"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* FAQ 列表 */}
                <div className="overflow-hidden rounded-lg bg-muted/10">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-md border border-border/30"
                  >
                    {filteredFaqs.map(faq => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="group border-b border-border/30 last:border-b-0"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline data-[state=open]:bg-muted/30">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                              Q
                            </span>
                            <div className="space-y-1.5 text-left">
                              <h3 className="text-base font-medium transition-colors group-hover:text-primary">
                                {faq.question}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                  {faq.category}
                                </span>
                                {faq.isHot && (
                                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                    热门
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-1">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 text-sm font-medium">
                              A
                            </span>
                            <div className="prose prose-sm max-w-none">
                              <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  这对我有帮助
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                                  <span>有用</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredFaqs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search className="mb-3 h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mb-1 text-lg font-medium">未找到相关问题</h3>
                      <p className="max-w-md text-muted-foreground">
                        尝试使用不同的关键词或浏览其他分类，如果问题仍未解决，请联系我们的客服。
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('全部');
                        }}
                      >
                        清除筛选条件
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="hot" className="m-0 mt-2">
                <div className="overflow-hidden rounded-lg bg-muted/10">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-md border border-border/30"
                  >
                    {hotFaqs.map(faq => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="group border-b border-border/30 last:border-b-0"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline data-[state=open]:bg-muted/30">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                              Q
                            </span>
                            <div className="space-y-1.5 text-left">
                              <h3 className="text-base font-medium transition-colors group-hover:text-primary">
                                {faq.question}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                  {faq.category}
                                </span>
                                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                  热门
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-1">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 text-sm font-medium">
                              A
                            </span>
                            <div className="prose prose-sm max-w-none">
                              <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  这对我有帮助
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                                  <span>有用</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="m-0 mt-2">
                <div className="overflow-hidden rounded-lg bg-muted/10">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-md border border-border/30"
                  >
                    {recentFaqs.map(faq => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="group border-b border-border/30 last:border-b-0"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:no-underline data-[state=open]:bg-muted/30">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                              Q
                            </span>
                            <div className="space-y-1.5 text-left">
                              <h3 className="text-base font-medium transition-colors group-hover:text-primary">
                                {faq.question}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                  {faq.category}
                                </span>
                                {faq.isHot && (
                                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                    热门
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-1">
                          <div className="flex items-start gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 text-sm font-medium">
                              A
                            </span>
                            <div className="prose prose-sm max-w-none">
                              <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  这对我有帮助
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                                  <span>有用</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 未解决问题提示 */}
        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">没有找到您需要的答案？</h3>
              <p className="mt-1 text-muted-foreground">
                如果您的问题未能在FAQ中得到解答，请直接联系我们的客服团队
              </p>
            </div>
            <Button size="sm" className="shrink-0">
              联系客服
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
