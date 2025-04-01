import { useEffect, useState } from 'react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: number;
  tags: string[];
}

// 模拟数据
const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'cross-border-ecommerce-growth-2025',
    title: '2025年跨境电商增长预测与策略',
    excerpt: '探讨2025年跨境电商市场的增长潜力，以及卖家如何抓住机遇。',
    content: `
      <h2>市场趋势</h2>
      <p>2025年，全球跨境电商预计将突破1.5万亿美元。随着新兴市场的崛起，消费需求持续增长。</p>
      
      <h2>关键策略</h2>
      <ul>
        <li>多平台运营</li>
        <li>供应链优化</li>
        <li>个性化营销</li>
        <li>绿色物流推广</li>
      </ul>
      
      <h2>未来展望</h2>
      <p>面对关税政策变化和物流瓶颈，卖家需灵活调整策略以保持竞争力。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：现代办公桌上的笔记本电脑和咖啡，象征电商行业的数字化趋势。
    author: {
      name: '张明',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
      bio: '跨境电商行业分析师，拥有10年行业经验'
    },
    date: '2025-03-20',
    readTime: 9,
    tags: ['市场预测', '策略分析']
  },
  {
    id: '2',
    slug: 'amazon-fba-tips',
    title: '亚马逊FBA实用技巧：提升利润的5个方法',
    excerpt: '分享亚马逊FBA卖家如何优化运营流程以提高利润率。',
    content: `
      <h2>FBA基础</h2>
      <p>亚马逊FBA为卖家提供了仓储和配送便利，但成本控制至关重要。</p>
      
      <h2>优化技巧</h2>
      <ul>
        <li>选择低竞争产品</li>
        <li>优化库存补货</li>
        <li>降低退货率</li>
        <li>利用促销工具</li>
      </ul>
      
      <h2>案例分析</h2>
      <p>通过实际案例，展示如何将利润率从10%提升至25%。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：仓库中的货架和包裹，反映亚马逊FBA的仓储场景。
    author: {
      name: '李华',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      bio: '亚马逊卖家导师，专注于FBA运营优化'
    },
    date: '2025-03-12',
    readTime: 7,
    tags: ['亚马逊', '运营技巧']
  },
  {
    id: '3',
    slug: 'last-mile-delivery',
    title: '跨境电商最后一公里配送：挑战与解决方案',
    excerpt: '分析最后一公里配送的痛点，并提供实用解决方案。',
    content: `
      <h2>配送难题</h2>
      <p>最后一公里配送占物流成本的50%以上，尤其在偏远地区更具挑战。</p>
      
      <h2>解决方案</h2>
      <ul>
        <li>无人机配送试点</li>
        <li>本地物流合作</li>
        <li>智能取件柜</li>
        <li>实时追踪系统</li>
      </ul>
      
      <h2>实施效果</h2>
      <p>通过优化最后一公里，配送效率可提升30%。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：城市中的快递员骑自行车送货，体现最后一公里配送场景。
    author: {
      name: '王强',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
      bio: '国际物流专家，专注于跨境电商物流解决方案'
    },
    date: '2025-03-08',
    readTime: 8,
    tags: ['物流', '最后一公里']
  },
  {
    id: '4',
    slug: 'niche-market-selection',
    title: '跨境电商利基市场选择：找到你的金矿',
    excerpt: '如何通过市场分析找到高潜力利基市场并成功进入。',
    content: `
      <h2>利基市场定义</h2>
      <p>利基市场是需求明确但竞争较小的细分领域，例如宠物智能产品。</p>
      
      <h2>选择步骤</h2>
      <ul>
        <li>趋势研究</li>
        <li>需求验证</li>
        <li>竞争评估</li>
        <li>试销测试</li>
      </ul>
      
      <h2>成功案例</h2>
      <p>一位卖家通过专注瑜伽配件，年收入突破百万美元。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：数据分析图表，象征市场研究的科学性。
    author: {
      name: '陈静',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
      bio: '市场研究专家，专注于跨境电商市场分析'
    },
    date: '2025-03-01',
    readTime: 6,
    tags: ['市场选择', '利基市场']
  },
  {
    id: '5',
    slug: 'cross-border-tax-guide',
    title: '跨境电商税务指南：如何合规避税',
    excerpt: '解析跨境电商税务问题，提供合规避税的实用建议。',
    content: `
      <h2>税务挑战</h2>
      <p>不同国家的关税和增值税政策让跨境卖家头疼不已。</p>
      
      <h2>合规策略</h2>
      <ul>
        <li>了解目标市场税率</li>
        <li>使用税务软件</li>
        <li>合理定价</li>
        <li>咨询专业税务师</li>
      </ul>
      
      <h2>注意事项</h2>
      <p>避免税务违规可能导致账户冻结，合规是第一要务。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：办公桌上的计算器和文件，代表税务管理的专业性。
    author: {
      name: '刘伟',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
      bio: '税务专家，专注于跨境电商税务合规'
    },
    date: '2025-02-25',
    readTime: 7,
    tags: ['税务', '合规']
  },
  {
    id: '6',
    slug: 'tiktok-ecommerce-strategy',
    title: 'TikTok跨境电商策略：短视频如何带动销量',
    excerpt: '利用TikTok短视频平台提升跨境电商销量的实用指南。',
    content: `
      <h2>TikTok潜力</h2>
      <p>TikTok已成为年轻消费者购物的主要渠道，月活跃用户超15亿。</p>
      
      <h2>营销方法</h2>
      <ul>
        <li>创意短视频</li>
        <li>挑战赛推广</li>
        <li>KOL合作</li>
        <li>直播带货</li>
      </ul>
      
      <h2>案例分享</h2>
      <p>一家服饰品牌通过TikTok营销，月销量增长300%。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：手机屏幕上的社交媒体界面，突出TikTok的数字营销场景。
    author: {
      name: '赵阳',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1000&auto=format&fit=crop',
      bio: '社交媒体营销专家，专注于TikTok电商策略'
    },
    date: '2025-02-18',
    readTime: 6,
    tags: ['TikTok', '营销']
  },
  {
    id: '7',
    slug: 'returns-management',
    title: '跨境电商退货管理：降低退货率的技巧',
    excerpt: '探讨如何有效管理退货并减少损失的实用方法。',
    content: `
      <h2>退货现状</h2>
      <p>跨境电商退货率平均高达20%，对利润影响显著。</p>
      
      <h2>管理技巧</h2>
      <ul>
        <li>优化产品描述</li>
        <li>提供退货保险</li>
        <li>简化退货流程</li>
        <li>分析退货原因</li>
      </ul>
      
      <h2>实施效果</h2>
      <p>通过改进流程，退货率可降低至10%以下。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1588508065123-287b1379a65d?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：堆叠的包裹，象征退货管理的物流场景。
    author: {
      name: '孙婷',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop',
      bio: '客户服务专家，专注于跨境电商退货优化'
    },
    date: '2025-02-12',
    readTime: 5,
    tags: ['退货', '运营技巧']
  },
  {
    id: '8',
    slug: 'competitive-pricing',
    title: '跨境电商竞争定价：如何在价格战中胜出',
    excerpt: '分析竞争定价策略，帮助卖家在激烈市场中脱颖而出。',
    content: `
      <h2>价格战现状</h2>
      <p>低价竞争在跨境电商中愈发普遍，但盲目降价不可取。</p>
      
      <h2>定价策略</h2>
      <ul>
        <li>差异化定价</li>
        <li>捆绑销售</li>
        <li>限时折扣</li>
        <li>动态调整</li>
      </ul>
      
      <h2>成功秘诀</h2>
      <p>通过品牌价值和优质服务，避免陷入低价陷阱。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：办公桌上的统计图表，反映竞争定价的分析过程。
    author: {
      name: '周明',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      bio: '定价策略专家，专注于跨境电商市场竞争'
    },
    date: '2025-02-08',
    readTime: 6,
    tags: ['定价', '竞争策略']
  },
  {
    id: '9',
    slug: 'influencer-marketing',
    title: '跨境电商网红营销：如何选择合适的KOL',
    excerpt: '分享网红营销的技巧，帮助卖家提升品牌曝光度。',
    content: `
      <h2>KOL价值</h2>
      <p>网红营销能快速触达目标客户，提升购买转化率。</p>
      
      <h2>选择标准</h2>
      <ul>
        <li>受众匹配度</li>
        <li>互动率</li>
        <li>内容质量</li>
        <li>合作成本</li>
      </ul>
      
      <h2>实施建议</h2>
      <p>从小规模合作开始，逐步扩大影响力。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b539e33eac58?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：时尚博主在拍摄内容，代表网红营销的场景。
    author: {
      name: '吴静',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
      bio: '网红营销专家，专注于跨境电商品牌推广'
    },
    date: '2025-02-01',
    readTime: 7,
    tags: ['网红营销', '品牌推广']
  },
  {
    id: '10',
    slug: 'supply-chain-optimization',
    title: '跨境电商供应链优化：如何降低成本提升效率',
    excerpt: '提供供应链优化的实用方法，帮助卖家提升运营效率。',
    content: `
      <h2>供应链痛点</h2>
      <p>供应链中断和成本上升是跨境电商的常见问题。</p>
      
      <h2>优化方法</h2>
      <ul>
        <li>供应商多元化</li>
        <li>实时库存管理</li>
        <li>自动化流程</li>
        <li>数据驱动决策</li>
      </ul>
      
      <h2>实施效果</h2>
      <p>优化后，运营成本可降低15%，交付时间缩短20%。</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1586528116022-aeda1613dde7?q=80&w=2070&auto=format&fit=crop',
    // 图片描述：港口的集装箱，象征供应链的全球化运输。
    author: {
      name: '郑华',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
      bio: '供应链管理专家，专注于跨境电商优化'
    },
    date: '2025-01-28',
    readTime: 8,
    tags: ['供应链', '运营效率']
  }
];

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 模拟API调用
    const fetchPosts = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(mockPosts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('获取文章列表失败'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 模拟API调用
    const fetchPost = async () => {
      try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundPost = mockPosts.find(p => p.slug === slug);
        if (!foundPost) {
          throw new Error('文章不存在');
        }
        setPost(foundPost);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('获取文章详情失败'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
} 