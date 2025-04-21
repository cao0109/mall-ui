import { Search, X } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: { text: string; variant?: 'default' | 'primary' };
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, icon, badge, search, actions }: PageHeaderProps) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-muted/80 via-muted/25 to-muted/80 px-6 py-12 shadow-sm">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[200px] w-[200px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          {/* 标题部分 */}
          <div className="max-w-2xl">
            <div className="flex items-start gap-4">
              {icon && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  {icon}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
                  {badge && (
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        badge.variant === 'primary'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      )}
                    >
                      {badge.text}
                    </span>
                  )}
                </div>
                {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
          </div>

          {/* 搜索或操作部分 */}
          <div className="shrink-0">
            {search ? (
              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={search.placeholder || '搜索...'}
                  value={search.value}
                  onChange={e => search.onChange(e.target.value)}
                  className="w-full rounded-full border-0 bg-background/80 px-10 py-2 shadow-sm backdrop-blur-sm transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {search.value && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => search.onChange('')}
                    className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ) : actions ? (
              <div className="flex items-center gap-3">{actions}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
