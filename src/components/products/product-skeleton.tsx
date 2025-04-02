'use client';

import { cn } from '@/lib/utils';

interface ProductSkeletonProps {
  viewMode: 'grid' | 'list';
  count?: number;
}

export function ProductSkeleton({ viewMode, count = 6 }: ProductSkeletonProps) {
  return (
    <div
      className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'space-y-4'
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'group animate-pulse overflow-hidden rounded-lg border transition-colors',
            viewMode === 'list' && 'flex flex-col sm:flex-row'
          )}
        >
          <div
            className={cn(
              'relative bg-muted',
              viewMode === 'grid' && 'aspect-square',
              viewMode === 'list' && 'aspect-video w-full sm:aspect-auto sm:w-48'
            )}
          />
          <div className="flex-1 space-y-3 p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="ml-auto flex items-center gap-1">
                <div className="h-3 w-8 rounded bg-muted" />
              </div>
            </div>
            <div className="h-4 w-3/4 rounded bg-muted" />
            {viewMode === 'list' && <div className="h-3 w-4/5 rounded bg-muted" />}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="h-5 w-16 rounded bg-muted" />
                <div className="mt-1 h-3 w-20 rounded bg-muted" />
              </div>
              <div className="h-8 w-20 rounded-md bg-muted" />
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <div className="h-3 w-12 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
