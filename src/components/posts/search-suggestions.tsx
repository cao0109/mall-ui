'use client';

import { BlogPost } from '@/hooks/use-blog';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';

interface SearchSuggestionsProps {
  query: string;
  posts: BlogPost[];
  isVisible: boolean;
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

export function SearchSuggestions({
  query,
  posts,
  isVisible,
  onSelectSuggestion,
  className,
}: SearchSuggestionsProps) {
  const t = useTranslations('blog');
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 生成建议列表
  const suggestions = useCallback(() => {
    if (!query || query.length < 2) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    const matchedTitles = new Set<string>();

    // 最多返回5个建议
    const result: string[] = [];

    // 首先添加完全匹配的标题
    posts.forEach(post => {
      if (result.length >= 5) return;

      const title = post.title.toLowerCase();
      if (title.includes(query.toLowerCase()) && !matchedTitles.has(post.title)) {
        result.push(post.title);
        matchedTitles.add(post.title);
      }
    });

    // 然后添加部分匹配的标题
    if (result.length < 5) {
      posts.forEach(post => {
        if (result.length >= 5) return;

        const title = post.title.toLowerCase();
        if (!matchedTitles.has(post.title) && searchTerms.some(term => title.includes(term))) {
          result.push(post.title);
          matchedTitles.add(post.title);
        }
      });
    }

    // 最后添加标签匹配
    if (result.length < 5) {
      posts.forEach(post => {
        if (result.length >= 5) return;

        // 检查标签是否匹配
        const hasMatchingTag = post.tags.some(tag =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

        if (hasMatchingTag && !matchedTitles.has(post.title)) {
          result.push(post.title);
          matchedTitles.add(post.title);
        }
      });
    }

    return result;
  }, [query, posts]);

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        // 外部点击逻辑可以在这里处理
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const suggestionItems = suggestions();

  if (!isVisible || !query || query.length < 2 || suggestionItems.length === 0) {
    return null;
  }

  return (
    <div
      ref={suggestionsRef}
      className={cn(
        'absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-md border bg-popover p-2 shadow-md',
        className
      )}
    >
      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">{t('suggestions')}</div>
      {suggestionItems.map((suggestion, index) => (
        <button
          key={index}
          className="w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
