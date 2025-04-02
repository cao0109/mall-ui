'use client';

import { BlogSearch } from '@/components/posts/blog-search';
import { HighlightText } from '@/components/posts/highlight-text';
import { SearchHistory } from '@/components/posts/search-history';
import { TagFilter } from '@/components/posts/tag-filter';
import { useBlogPosts } from '@/hooks/use-blog';
import { addBlogSearchHistory } from '@/lib/search-history';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { posts, isLoading, error } = useBlogPosts({ searchQuery });

  // 获取所有标签
  const allTags = posts?.flatMap(post => post.tags) || [];

  // 根据选中的标签筛选文章
  const filteredPosts =
    selectedTags.length > 0
      ? posts?.filter(post => selectedTags.some(tag => post.tags.includes(tag)))
      : posts;

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
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">{t('blog.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('blog.description')}</p>
      </motion.div>

      {/* 搜索框 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="mx-auto max-w-xl">
          <BlogSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onClearSearch={handleClearSearch}
            posts={posts || []}
          />

          {/* 搜索历史 */}
          {!searchQuery && !hasSearched && <SearchHistory onSelectHistory={handleSelectHistory} />}
        </div>
      </motion.div>

      {/* 搜索结果提示 */}
      {searchQuery && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center">
          <h2 className="text-xl font-semibold">
            {t('blog.searchResults')}: &quot;{searchQuery}&quot;
          </h2>
          <p className="mt-2 text-muted-foreground">
            {filteredPosts?.length === 0 ? t('blog.noResults') : `${filteredPosts?.length} 篇文章`}
          </p>
        </motion.div>
      )}

      {/* 标签筛选 - 只在无搜索时显示 */}
      {!searchQuery && (
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
      )}

      {/* 文章列表 */}
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-48 rounded-lg bg-muted" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts?.length === 0 ? (
        <div className="my-16 text-center">
          <p className="text-lg text-muted-foreground">{t('blog.noResults')}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts?.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border bg-card"
            >
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {searchQuery ? <HighlightText text={tag} highlight={searchQuery} /> : tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    {searchQuery ? (
                      <HighlightText text={post.title} highlight={searchQuery} />
                    ) : (
                      post.title
                    )}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
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
      )}
    </div>
  );
}
