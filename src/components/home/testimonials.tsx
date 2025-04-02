'use client';

import { ArrowRight, MessageSquare, Quote, Star } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: '张先生',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    role: '跨境电商卖家',
    rating: 5,
    content:
      'HiDoo平台上的供应商质量都很好，产品种类丰富，价格也很实惠。最重要的是平台的服务非常贴心，帮我解决了很多采购中的问题。',
    date: '2024-03-20',
    verifiedPurchase: true,
    category: '产品质量',
    likes: 128,
  },
  {
    id: 2,
    name: '李女士',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    role: '独立站店主',
    rating: 4.5,
    content:
      '使用HiDoo已经半年多了，平台的一键建站功能特别好用，帮我省去了很多技术开发的麻烦。供应商的发货速度和质量也都不错。',
    date: '2024-03-15',
    verifiedPurchase: true,
    category: '建站服务',
    likes: 96,
  },
  {
    id: 3,
    name: '王先生',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    role: '亚马逊卖家',
    rating: 5,
    content:
      '作为一个亚马逊卖家，我最看重的是产品质量和交付时间。HiDoo的供应商在这两方面都表现出色，让我的生意运营更加顺畅。',
    date: '2024-03-10',
    verifiedPurchase: true,
    category: '物流服务',
    likes: 156,
  },
];

const categories = ['全部', '产品质量', '建站服务', '物流服务', '客户支持'];

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredTestimonials = testimonials.filter(
    testimonial => selectedCategory === '全部' || testimonial.category === selectedCategory
  );

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="relative">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <MessageSquare className="h-6 w-6 text-primary" />
            用户评价
          </h2>
          <p className="mt-1 text-muted-foreground">来自真实用户的使用体验和评价反馈</p>
          <div className="absolute -right-12 -top-2 rotate-12">
            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              Reviews
            </span>
          </div>
        </div>
        <Button variant="ghost" className="group">
          查看更多
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTestimonials.map(testimonial => (
          <Card
            key={testimonial.id}
            className="group relative transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredCard(testimonial.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-6">
              <Quote
                className={`absolute right-6 top-6 h-8 w-8 transition-all duration-300 ${
                  hoveredCard === testimonial.id ? 'rotate-12 text-primary' : 'text-primary/10'
                }`}
              />
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border ring-2 ring-primary/20">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-semibold transition-colors group-hover:text-primary">
                      {testimonial.name}
                    </h3>
                    {testimonial.verifiedPurchase && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-xs text-emerald-600 group-hover:bg-emerald-100"
                      >
                        已验证购买
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{testimonial.role}</span>
                    <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>{testimonial.category}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 transition-all duration-300 ${
                          index < testimonial.rating
                            ? 'fill-current text-amber-500'
                            : 'text-gray-200'
                        } ${hoveredCard === testimonial.id ? 'scale-110' : 'scale-100'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`mt-4 text-sm leading-relaxed transition-all duration-300 ${
                  hoveredCard === testimonial.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                <p className="line-clamp-4">{testimonial.content}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                <span>发布于 {testimonial.date}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 px-2 hover:text-primary">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    <span>{testimonial.likes}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
