"use client";

import { SectionHeader } from "@/components/home/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Flame,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Tag,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: "faq-1",
    question: "如何创建账户？",
    answer:
      "点击网站右上角的'注册'按钮，填写必要信息即可完成账户创建。我们会向您的邮箱发送验证邮件，请及时验证。",
    category: "入门指南",
    isHot: true,
  },
  {
    id: "faq-2",
    question: "HiDoo平台如何保证供应商的质量？",
    answer:
      "我们有严格的供应商审核机制。所有供应商在入驻前都需要通过资质审核、实地考察等多个环节。我们会定期对供应商进行评估，包括产品质量、发货速度、售后服务等多个维度，确保为您提供优质的供应商资源。",
    category: "供应商管理",
    isHot: true,
  },
  {
    id: "faq-3",
    question: "支持哪些支付方式？",
    answer:
      "我们支持支付宝、微信支付、银联等主流支付方式。对于企业用户，我们还支持对公转账。所有支付渠道都经过严格的安全认证，确保您的资金安全。",
    category: "支付方式",
    isHot: true,
  },
  {
    id: "faq-4",
    question: "如何查看订单状态？",
    answer:
      "登录后，点击'我的订单'即可查看所有订单的状态。您也可以通过订单号在订单查询页面直接查询。",
    category: "订单管理",
    isHot: false,
  },
  {
    id: "faq-5",
    question: "退换货政策是怎样的？",
    answer:
      "商品签收后7天内，如果商品存在质量问题，我们提供免费退换服务。部分特殊商品（如定制商品）可能不支持退换，具体以商品页面说明为准。",
    category: "售后服务",
    isHot: true,
  },
  {
    id: "faq-6",
    question: "如何成为供应商？",
    answer:
      "请将您的公司介绍、产品目录等相关资料发送至：supplier@example.com，我们的商务团队会在3个工作日内与您联系。",
    category: "供应商管理",
    isHot: false,
  },
  {
    id: "faq-7",
    question: "如何联系客服？",
    answer:
      "您可以通过以下方式联系我们：1. 在线客服（工作日9:00-18:00）2. 客服热线：400-xxx-xxxx 3. 发送邮件至：support@example.com",
    category: "联系我们",
    isHot: true,
  },
  {
    id: "faq-8",
    question: "是否提供发票？",
    answer:
      "是的，我们提供电子发票和纸质发票。您可以在下单时选择是否需要发票，并填写发票信息。",
    category: "支付方式",
    isHot: false,
  },
  {
    id: "faq-9",
    question: "物流配送时间是多久？",
    answer:
      "我们承诺在订单支付成功后48小时内发货。具体送达时间取决于配送地址，一般国内3-7天可送达，跨境配送7-15天可送达。您可以在订单详情页实时查看物流状态。",
    category: "物流配送",
    isHot: true,
  },
  {
    id: "faq-10",
    question: "如何选择合适的产品？",
    answer:
      "您可以通过以下方式找到合适的产品：1. 使用搜索功能 2. 浏览分类目录 3. 查看热销榜单 4. 使用筛选功能（如价格区间、发货地等）。我们还提供产品对比功能，帮助您更好地做出选择。",
    category: "产品选购",
    isHot: false,
  },
];

const categories = Array.from(new Set(faqs.map((faq) => faq.category)));
const hotFaqs = faqs.filter((faq) => faq.isHot);
const recentFaqs = faqs.slice(-5);

const contactMethods = [
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "在线客服",
    description: "工作日 9:00-18:00",
    action: "立即咨询",
    link: "/support",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "客服热线",
    description: "400-xxx-xxxx",
    action: "拨打电话",
    link: "tel:400-xxx-xxxx",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "电子邮件",
    description: "support@example.com",
    action: "发送邮件",
    link: "mailto:support@example.com",
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "全部" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8 space-y-8">
      <SectionHeader
        title="常见问题"
        subtitle="解答您的疑问，帮助您更好地使用平台"
        icon={<HelpCircle className="h-6 w-6 text-primary" />}
        badge={{ text: "FAQ" }}
      />

      {/* 快速访问区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactMethods.map((method, index) => (
          <Card key={index} className="p-6">
            <a
              href={method.link}
              className="flex items-start gap-4 hover:bg-muted/50 -m-6 p-6 transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {method.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-base">{method.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {method.description}
                </p>
                <Button
                  variant="link"
                  className="px-0 h-auto font-normal mt-2 text-primary"
                >
                  {method.action}
                </Button>
              </div>
            </a>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <Card className="p-8">
        <div className="space-y-8">
          {/* 搜索栏 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索问题..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* 分类标签页 */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6 bg-transparent border-b h-auto p-0 space-x-6">
              <TabsTrigger
                value="all"
                className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-auto pb-2 px-0"
                onClick={() => setSelectedCategory("全部")}
              >
                <Tag className="h-4 w-4 mr-2" />
                全部问题
              </TabsTrigger>
              <TabsTrigger
                value="hot"
                className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-auto pb-2 px-0"
              >
                <Flame className="h-4 w-4 mr-2" />
                热门问题
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-auto pb-2 px-0"
              >
                <Clock className="h-4 w-4 mr-2" />
                最新问题
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              {/* 分类按钮组 */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedCategory === "全部" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("全部")}
                  className="shrink-0"
                >
                  全部
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* FAQ 列表 */}
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 px-4 rounded-lg hover:bg-muted transition-colors data-[state=open]:bg-muted">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                          Q
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                              {faq.category}
                            </span>
                            {faq.isHot && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                热门
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-4 px-4">
                      <div className="flex items-start gap-3 pl-9">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  没有找到相关问题，请尝试其他关键词
                </div>
              )}
            </TabsContent>

            <TabsContent value="hot" className="m-0">
              <Accordion type="single" collapsible className="w-full">
                {hotFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 px-4 rounded-lg hover:bg-muted transition-colors data-[state=open]:bg-muted">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                          Q
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                              {faq.category}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                              热门
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-4 px-4">
                      <div className="flex items-start gap-3 pl-9">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="recent" className="m-0">
              <Accordion type="single" collapsible className="w-full">
                {recentFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 px-4 rounded-lg hover:bg-muted transition-colors data-[state=open]:bg-muted">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                          Q
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                              {faq.category}
                            </span>
                            {faq.isHot && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                热门
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-4 px-4">
                      <div className="flex items-start gap-3 pl-9">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
