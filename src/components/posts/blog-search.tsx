'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogPost } from '@/hooks/use-blog';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SearchSuggestions } from './search-suggestions';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  posts?: BlogPost[];
  className?: string;
}

export function BlogSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
  posts = [],
  className,
}: BlogSearchProps) {
  const t = useTranslations('blog');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // 延迟关闭搜索建议，避免点击建议时无法捕获点击事件
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className || ''}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSearch}
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t('clearSearch')}</span>
          </Button>
        )}
      </div>

      <SearchSuggestions
        query={searchQuery}
        posts={posts}
        isVisible={showSuggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </div>
  );
}
