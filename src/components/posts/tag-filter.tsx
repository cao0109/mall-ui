'use client';

import { Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  const t = useTranslations();

  // 获取所有唯一标签
  const uniqueTags = Array.from(new Set(tags));

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Tag className="h-4 w-4" />
        <h3 className="text-lg font-semibold">{t('blog.filterByTags')}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTags.length === 0 ? 'default' : 'outline'}
          onClick={() => onTagSelect('')}
        >
          {t('blog.tags.all')}
        </Button>
        {uniqueTags.map(tag => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
