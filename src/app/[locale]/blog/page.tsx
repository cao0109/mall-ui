'use client';

import { BlogSearch } from '@/components/posts/blog-search';
import { HighlightText } from '@/components/posts/highlight-text';
import { SearchHistory } from '@/components/posts/search-history';
import { TagFilter } from '@/components/posts/tag-filter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useBlogPosts } from '@/hooks/use-blog';
import { addBlogSearchHistory } from '@/lib/search-history';
import { motion } from 'framer-motion';
import { ArrowUpDown, Bookmark, Calendar, Clock, Grid, List, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 视图类型
type ViewType = 'grid' | 'list';

export default function BlogPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const { posts, isLoading, error } = useBlogPosts({ searchQuery });

  // 获取所有标签
  const allTags = posts?.flatMap(post => post.tags) || [];

  // 根据选中的标签筛选文章
  const filteredPosts =
    selectedTags.length > 0
      ? posts?.filter(post => selectedTags.some(tag => post.tags.includes(tag)))
      : posts;

  // 排序文章
  const sortedPosts = [...(filteredPosts || [])].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      // 模拟按热度排序（实际项目中应该使用真实数据）
      return Math.random() - 0.5;
    }
  });

  // 记录搜索历史
  useEffect(() => {
    if (hasSearched && searchQuery.trim()) {
      addBlogSearchHistory(searchQuery);
    }
  }, [hasSearched, searchQuery]);

  // 搜索处理
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  // 清除搜索
  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
  };

  // 从历史中选择
  const handleSelectHistory = (term: string) => {
    setSearchQuery(term);
    setHasSearched(true);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {t('common.error')}: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-5xl font-bold text-transparent">
            {t('blog.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('blog.description')}
          </p>
        </motion.div>

        {/* 搜索框 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="mx-auto max-w-xl">
            <BlogSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onClearSearch={handleClearSearch}
              posts={posts || []}
            />

            {/* 搜索历史 */}
            {!searchQuery && !hasSearched && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <SearchHistory onSelectHistory={handleSelectHistory} />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* 搜索结果提示 */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-lg bg-primary/5 p-6 text-center"
          >
            <h2 className="text-2xl font-semibold">
              {t('blog.searchResults')}: &quot;{searchQuery}&quot;
            </h2>
            <p className="mt-2 text-muted-foreground">
              {filteredPosts?.length === 0 ? t('blog.noResults') : `${filteredPosts?.length} 篇文章`}
            </p>
          </motion.div>
        )}

        {/* 标签筛选和视图控制 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          {/* 标签筛选 - 只在无搜索时显示 */}
          {!searchQuery && (
            <div className="flex-1">
              <TagFilter
                tags={allTags}
                selectedTags={selectedTags}
                onTagSelect={tag => {
                  if (tag === '') {
                    setSelectedTags([]);
                  } else {
                    setSelectedTags(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    );
                  }
                }}
              />
            </div>
          )}

          {/* 视图控制和排序 */}
          <div className="flex items-center gap-3">
            {/* 排序下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {sortBy === 'date' ? t('blog.sortByDate') : t('blog.sortByPopularity')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => setSortBy('date')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{t('blog.sortByDate')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('popularity')}
                  className="flex items-center gap-2"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>{t('blog.sortByPopularity')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 视图切换 */}
            <div className="flex items-center gap-1 rounded-md border p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewType === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewType('grid')}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                      <span className="sr-only">{t('blog.gridView')}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('blog.gridView')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewType === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewType('list')}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">{t('blog.listView')}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('blog.listView')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>

        {/* 文章列表 */}
        {isLoading ? (
          <div className={viewType === 'grid' ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
            {[1, 2, 3].map(i => (
              viewType === 'grid' ? (
                <div key={i} className="animate-pulse">
                  <div className="h-48 rounded-lg bg-muted" />
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-4 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              ) : (
                <div key={i} className="flex animate-pulse gap-4 rounded-lg border bg-card p-4">
                  <div className="h-32 w-32 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-4 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              )
            ))}
          </div>
        ) : sortedPosts?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my-16 rounded-lg bg-muted/50 p-8 text-center"
          >
            <p className="text-lg text-muted-foreground">{t('blog.noResults')}</p>
          </motion.div>
        ) : viewType === 'grid' ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts?.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                          >
                            {searchQuery ? <HighlightText text={tag} highlight={searchQuery} /> : tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-3 text-xl font-semibold leading-tight group-hover:text-primary">
                      {searchQuery ? (
                        <HighlightText text={post.title} highlight={searchQuery} />
                      ) : (
                        post.title
                      )}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {searchQuery ? (
                        <HighlightText text={post.excerpt} highlight={searchQuery} />
                      ) : (
                        post.excerpt
                      )}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            {searchQuery ? (
                              <HighlightText text={post.author.name} highlight={searchQuery} />
                            ) : (
                              post.author.name
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{t('blog.readTime', { time: post.readTime })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedPosts?.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row">
                  <div className="relative h-48 w-full overflow-hidden md:h-auto md:w-1/3">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-primary/5"
                        >
                          {searchQuery ? <HighlightText text={tag} highlight={searchQuery} /> : tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="mb-3 text-xl font-semibold leading-tight group-hover:text-primary">
                      {searchQuery ? (
                        <HighlightText text={post.title} highlight={searchQuery} />
                      ) : (
                        post.title
                      )}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {searchQuery ? (
                        <HighlightText text={post.excerpt} highlight={searchQuery} />
                      ) : (
                        post.excerpt
                      )}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            {searchQuery ? (
                              <HighlightText text={post.author.name} highlight={searchQuery} />
                            ) : (
                              post.author.name
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{t('blog.readTime', { time: post.readTime })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* 分页控件 */}
        {!isLoading && sortedPosts && sortedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                {t('blog.previous')}
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
              </div>
              <Button variant="outline" size="sm">
                {t('blog.next')}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
