'use client';

import Image from 'next/image';

import { BlogChart } from '@/components/posts/blog-chart';
import { BlogCodeBlock } from '@/components/posts/blog-code-block';
import { BlogVideo } from '@/components/posts/blog-video';
import { Card } from '@/components/ui/card';

export default function RichContentExamplePage() {
  // 示例数据 - 销售数据
  const salesData = [
    { month: '一月', electronics: 1200, clothing: 800, furniture: 600 },
    { month: '二月', electronics: 1300, clothing: 750, furniture: 650 },
    { month: '三月', electronics: 1400, clothing: 850, furniture: 700 },
    { month: '四月', electronics: 1500, clothing: 900, furniture: 750 },
    { month: '五月', electronics: 1600, clothing: 950, furniture: 800 },
    { month: '六月', electronics: 1700, clothing: 1000, furniture: 850 },
    { month: '七月', electronics: 1800, clothing: 1050, furniture: 900 },
    { month: '八月', electronics: 1900, clothing: 1100, furniture: 950 },
    { month: '九月', electronics: 2000, clothing: 1150, furniture: 1000 },
    { month: '十月', electronics: 2100, clothing: 1200, furniture: 1050 },
    { month: '十一月', electronics: 2200, clothing: 1250, furniture: 1100 },
    { month: '十二月', electronics: 2300, clothing: 1300, furniture: 1150 },
  ];

  // 示例数据 - 类别销售分布
  const categorySalesData = [
    { name: '电子产品', value: 40 },
    { name: '服装', value: 30 },
    { name: '家具', value: 15 },
    { name: '食品', value: 10 },
    { name: '其他', value: 5 },
  ];

  // 示例数据 - 区域销售数据
  const regionSalesData = [
    { region: '华东', sales: 1200 },
    { region: '华北', sales: 900 },
    { region: '华南', sales: 800 },
    { region: '西部', sales: 600 },
    { region: '东北', sales: 500 },
  ];

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-4xl font-bold">打造丰富的博客内容：数据可视化与多媒体</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        学习如何利用图表、视频和代码块增强您的电商博客内容
      </p>

      <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
        <Image
          src="/images/blog-hero-placeholder.jpg"
          alt="博客封面图"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>数据可视化的重要性</h2>
        <p>
          在电子商务领域，数据可视化是传达复杂信息和趋势的有效方式。通过图表和图形，您可以帮助读者更好地理解市场动态、产品性能和消费者行为。
        </p>

        <h3>销售趋势分析</h3>
        <p>
          下面的折线图展示了过去一年中不同产品类别的销售趋势。通过这种可视化方式，我们可以清晰地看到季节性变化和整体增长模式。
        </p>

        <div className="my-8">
          <BlogChart
            title="年度销售趋势"
            description="过去12个月各产品类别的销售额"
            type="line"
            data={salesData}
            xAxisKey="month"
            dataKeys={['electronics', 'clothing', 'furniture']}
            labels={{
              electronics: '电子产品',
              clothing: '服装',
              furniture: '家具',
            }}
            height={350}
          />
        </div>

        <h3>类别销售分布</h3>
        <p>饼图是展示比例分布的理想选择。以下图表显示了不同产品类别在总销售额中的占比。</p>

        <div className="my-8">
          <BlogChart
            title="销售额分布"
            description="各产品类别占总销售额的百分比"
            type="pie"
            data={categorySalesData}
            dataKeys={['value']}
            height={350}
          />
        </div>

        <h3>区域销售对比</h3>
        <p>条形图可以有效对比不同区域或类别的性能。下图展示了各地区的销售业绩对比。</p>

        <div className="my-8">
          <BlogChart
            title="区域销售对比"
            description="各地区销售业绩"
            type="bar"
            data={regionSalesData}
            xAxisKey="region"
            dataKeys={['sales']}
            labels={{
              sales: '销售额',
            }}
            height={350}
          />
        </div>

        <h2>多媒体内容的价值</h2>
        <p>视频内容可以提供更加生动和互动的用户体验，特别是对于教程和产品展示。</p>

        <div className="my-8">
          <BlogVideo
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="电商策略详解"
            platform="youtube"
            aspectRatio="16:9"
          />
        </div>

        <h2>代码示例：实现简单的产品过滤功能</h2>
        <p>在电商网站中，产品过滤功能是提升用户体验的关键。以下是一个简单的React组件实现：</p>

        <div className="my-8">
          <BlogCodeBlock
            code={`import React, { useState } from 'react';

// 产品过滤组件
function ProductFilter({ products, onFilterChange }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false
  });

  // 处理过滤条件变化
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 应用过滤
  const applyFilters = () => {
    const filteredProducts = products.filter(product => {
      // 类别过滤
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      
      // 价格范围过滤
      const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      
      // 库存状态过滤
      const stockMatch = !filters.inStock || product.inStock;
      
      return categoryMatch && priceMatch && stockMatch;
    });
    
    onFilterChange(filteredProducts);
  };

  return (
    <div className="product-filter">
      <h3>筛选产品</h3>
      
      <div className="filter-group">
        <label>类别：</label>
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="all">所有类别</option>
          <option value="electronics">电子产品</option>
          <option value="clothing">服装</option>
          <option value="furniture">家具</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>价格范围：</label>
        <input
          type="range"
          name="minPrice"
          min="0"
          max="1000"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <span>{filters.minPrice}</span>
        <input
          type="range"
          name="maxPrice"
          min="0"
          max="1000"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <span>{filters.maxPrice}</span>
      </div>
      
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={filters.inStock}
            onChange={handleFilterChange}
          />
          仅显示有库存
        </label>
      </div>
      
      <button onClick={applyFilters}>应用筛选</button>
    </div>
  );
}`}
            language="typescript"
            fileName="ProductFilter.tsx"
            showLineNumbers={true}
          />
        </div>

        <p>
          上面的代码示例展示了如何创建一个简单但功能完整的产品过滤组件，它允许用户按类别、价格范围和库存状态筛选产品。
        </p>

        <h2>总结</h2>
        <Card className="my-8 p-6">
          <h3 className="mb-4 text-xl font-semibold">丰富博客内容的关键元素</h3>
          <ul className="space-y-2">
            <li>
              ✅ <strong>数据可视化</strong>：通过图表帮助读者理解复杂的数据和趋势
            </li>
            <li>
              ✅ <strong>视频内容</strong>：提供更具吸引力和教育意义的内容形式
            </li>
            <li>
              ✅ <strong>代码示例</strong>：为开发者和技术用户提供实用的代码参考
            </li>
            <li>
              ✅ <strong>视觉层次结构</strong>：使用标题、卡片和间距创建清晰的内容组织
            </li>
          </ul>
        </Card>

        <p>
          通过整合数据可视化、视频内容和代码示例，您可以创建更加引人入胜、内容丰富的博客文章，为读者提供更高的价值，同时提升您网站的专业形象和权威性。
        </p>
      </div>
    </div>
  );
}
