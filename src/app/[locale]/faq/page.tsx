"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "如何创建账户？",
    answer:
      "点击网站右上角的'注册'按钮，填写必要信息即可完成账户创建。我们会向您的邮箱发送验证邮件，请及时验证。",
  },
  {
    question: "支持哪些支付方式？",
    answer:
      "我们支持支付宝、微信支付、银联等主流支付方式。对于企业用户，我们还支持对公转账。",
  },
  {
    question: "如何查看订单状态？",
    answer:
      "登录后，点击'我的订单'即可查看所有订单的状态。您也可以通过订单号在订单查询页面直接查询。",
  },
  {
    question: "退换货政策是怎样的？",
    answer:
      "商品签收后7天内，如果商品存在质量问题，我们提供免费退换服务。部分特殊商品（如定制商品）可能不支持退换，具体以商品页面说明为准。",
  },
  {
    question: "配送范围和时间？",
    answer:
      "我们目前支持全国配送，一般在付款后48小时内发货。具体到货时间取决于您的收货地址，一般3-7天可送达。",
  },
  {
    question: "如何联系客服？",
    answer:
      "您可以通过以下方式联系我们：1. 在线客服（工作日9:00-18:00）2. 客服热线：400-xxx-xxxx 3. 发送邮件至：support@example.com",
  },
  {
    question: "是否提供发票？",
    answer:
      "是的，我们提供电子发票和纸质发票。您可以在下单时选择是否需要发票，并填写发票信息。",
  },
  {
    question: "如何成为供应商？",
    answer:
      "请将您的公司介绍、产品目录等相关资料发送至：supplier@example.com，我们的商务团队会在3个工作日内与您联系。",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">常见问题</h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
