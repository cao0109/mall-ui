'use client';

import { BlogPost } from '@/hooks/use-blog';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const t = useTranslations();

  // 过滤掉当前文章，并获取最多3篇相关文章
  const relatedPosts = posts.filter(post => post.id !== currentPostId).slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t pt-8">
      <h2 className="mb-8 text-2xl font-bold">{t('blog.relatedPosts')}</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group overflow-hidden rounded-lg border bg-card"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
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
    </section>
  );
}
