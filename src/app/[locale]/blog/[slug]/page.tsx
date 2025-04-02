'use client';

import { RelatedPosts } from '@/components/posts/related-posts';
import { ShareDialog } from '@/components/share-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useBlogPost, useBlogPosts } from '@/hooks/use-blog';
import { motion } from 'framer-motion';
import { Bookmark, Calendar, Clock, MessageSquare, ThumbsUp, User } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <article className="mx-auto max-w-4xl">
          {/* 文章头部 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="mb-4 flex justify-center gap-2">
              {post.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-primary/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
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
            className="relative mb-8 h-[400px] overflow-hidden rounded-xl shadow-lg"
          >
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* 文章内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg dark:prose-invert mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 文章底部操作 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-4"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{t('blog.like')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('blog.like')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{t('blog.comment')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('blog.comment')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    <span>{t('blog.bookmark')}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('blog.bookmark')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <ShareDialog
              title={post.title}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
          </motion.div>

          {/* 作者信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-12 max-w-3xl rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Avatar className="h-20 w-20">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold">{post.author.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
                <div className="mt-4 flex justify-center gap-2 md:justify-start">
                  <Button variant="outline" size="sm">
                    {t('blog.follow')}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t('blog.viewProfile')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 相关文章 */}
          {!isLoadingPosts && posts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <RelatedPosts posts={posts} currentPostId={post.id} />
            </motion.div>
          )}
        </article>
      </div>
    </div>
  );
}
