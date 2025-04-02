'use client';

import { Button } from '@/components/ui/button';
import {
  clearBlogSearchHistory,
  getBlogSearchHistory,
  removeBlogSearchHistoryItem,
} from '@/lib/search-history';
import { Clock, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface SearchHistoryProps {
  onSelectHistory: (term: string) => void;
  className?: string;
}

export function SearchHistory({ onSelectHistory, className }: SearchHistoryProps) {
  const t = useTranslations('blog');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(getBlogSearchHistory());
  }, []);

  const handleClearAll = () => {
    clearBlogSearchHistory();
    setHistory([]);
  };

  const handleRemoveItem = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    removeBlogSearchHistoryItem(term);
    setHistory(prev => prev.filter(item => item !== term));
  };

  if (!history.length) return null;

  return (
    <div className={`mt-4 border-t pt-4 ${className || ''}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center text-sm font-medium text-muted-foreground">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          搜索历史
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="h-6 text-xs hover:bg-muted"
        >
          {t('clearSearch')}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map(term => (
          <div
            key={term}
            onClick={() => onSelectHistory(term)}
            className="group flex cursor-pointer items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span>{term}</span>
            <button
              onClick={e => handleRemoveItem(e, term)}
              className="rounded-full p-0.5 opacity-60 hover:bg-background hover:opacity-100"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">删除 {term}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
