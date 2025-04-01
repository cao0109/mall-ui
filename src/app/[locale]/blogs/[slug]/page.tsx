'use client';

import { RelatedPosts } from '@/components/posts/related-posts';
import { ShareDialog } from '@/components/share-dialog';
import { useBlogPost, useBlogPosts } from '@/hooks/use-blog';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { use } from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const t = useTranslations();
  const { post, isLoading: isLoadingPost, error: postError } = useBlogPost(resolvedParams.slug);
  const { posts, isLoading: isLoadingPosts } = useBlogPosts();

  if (postError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {t('common.error')}: {postError.message}
        </div>
      </div>
    );
  }

  if (isLoadingPost || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="mx-auto h-8 w-3/4 rounded bg-muted" />
          <div className="h-64 rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <div className="h-4 w-4/6 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8">
      {/* 文章头部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="mb-4 flex justify-center gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{t('blog.readTime', { time: post.readTime })}</span>
          </div>
        </div>
      </motion.div>

      {/* 封面图 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8 h-[400px] overflow-hidden rounded-lg"
      >
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </motion.div>

      {/* 文章内容 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg dark:prose-invert mx-auto max-w-3xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 作者信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-12 max-w-3xl rounded-lg border bg-card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{post.author.name}</h3>
            <p className="text-sm text-muted-foreground">{post.author.bio}</p>
          </div>
        </div>
      </motion.div>

      {/* 分享按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 flex max-w-3xl justify-center"
      >
        <ShareDialog
          title={post.title}
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
      </motion.div>

      {/* 相关文章 */}
      {!isLoadingPosts && posts && <RelatedPosts posts={posts} currentPostId={post.id} />}
    </article>
  );
}
