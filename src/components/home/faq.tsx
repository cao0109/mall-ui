'use client';

import { ArrowRight, HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    id: 'faq-1',
    question: '如何开始使用HiDoo平台？',
    answer:
      '使用HiDoo平台非常简单。首先，您需要注册一个账户，完成基本信息的填写。之后，您就可以浏览平台上的供应商、产品，并开始您的采购或建站journey。我们还提供详细的新手指南和客服支持，帮助您快速上手。',
    category: '入门指南',
  },
  {
    id: 'faq-2',
    question: 'HiDoo平台如何保证供应商的质量？',
    answer:
      '我们有严格的供应商审核机制。所有供应商在入驻前都需要通过资质审核、实地考察等多个环节。我们会定期对供应商进行评估，包括产品质量、发货速度、售后服务等多个维度，确保为您提供优质的供应商资源。',
    category: '供应商管理',
  },
  {
    id: 'faq-3',
    question: '平台支持哪些支付方式？',
    answer:
      '我们支持多种支付方式，包括信用卡、PayPal、银行转账等。对于大额订单，我们还提供灵活的支付方案，可以根据您的需求进行定制。所有支付渠道都经过严格的安全认证，确保您的资金安全。',
    category: '支付方式',
  },
  {
    id: 'faq-4',
    question: '如何处理产品质量问题？',
    answer:
      '我们有完善的质量保障体系。如果您收到的产品出现质量问题，可以通过平台的售后系统提交申请。我们会在24小时内响应，并协调供应商进行处理。对于符合条件的情况，我们提供退换货服务。',
    category: '售后服务',
  },
  {
    id: 'faq-5',
    question: '建站服务包含哪些内容？',
    answer:
      '我们的建站服务是一站式解决方案，包括域名注册、网站设计、功能开发、支付集成、物流对接等。您可以选择使用我们的模板快速建站，也可以根据需求进行定制开发。我们还提供持续的技术支持和运维服务。',
    category: '建站服务',
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredFaqs = faqs.filter(
    faq =>
      (selectedCategory === '全部' || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <HelpCircle className="h-6 w-6 text-primary" />
            常见问题
          </h2>
          <p className="mt-1 text-muted-foreground">解答您可能遇到的问题，帮助您更好地使用平台</p>
          <div className="absolute -right-12 -top-2 rotate-12">
            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              FAQ
            </span>
          </div>
        </div>
        <Link href="/faq">
          <Button variant="ghost" className="group">
            查看更多
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索问题..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border bg-background py-2 pl-10 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Button
                variant={selectedCategory === '全部' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('全部')}
                className="shrink-0"
              >
                全部
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map(faq => (
              <AccordionItem key={faq.id} value={faq.id} className="group border-none">
                <AccordionTrigger className="rounded-lg px-4 py-4 text-left transition-colors hover:bg-muted hover:no-underline data-[state=open]:bg-muted">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      Q
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-medium transition-colors group-hover:text-primary">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="flex items-start gap-3 pl-9">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              没有找到相关问题，请尝试其他关键词
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
