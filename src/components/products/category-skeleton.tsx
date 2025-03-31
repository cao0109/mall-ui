'use client';

interface CategorySkeletonProps {
  count?: number;
}

export function CategorySkeleton({ count = 5 }: CategorySkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-32 animate-pulse rounded bg-muted" />
          <div className="h-6 w-12 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="relative">
        <div className="space-y-2">
          {/* 全部分类选项 */}
          <div className="flex h-8 animate-pulse items-center gap-2 rounded-md border-b px-2">
            <div className="h-4 w-4 rounded bg-muted" />
            <div className="h-4 w-24 flex-1 rounded bg-muted" />
            <div className="h-5 w-8 rounded-full bg-muted" />
          </div>

          {/* 分类列表项 */}
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="space-y-1">
              <div className="flex h-8 animate-pulse items-center gap-2 rounded-md px-2">
                <div className="flex flex-1 items-center gap-2">
                  <div className="h-3 w-3 rounded bg-muted" />
                  <div className="h-4 w-4 rounded bg-muted" />
                  <div className="h-4 w-24 flex-1 rounded bg-muted" />
                </div>
              </div>

              {/* 随机展示一些子分类 */}
              {index % 2 === 0 && (
                <div className="ml-6 space-y-1 border-l border-dashed pl-4">
                  {Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map((_, subIndex) => (
                    <div
                      key={`${index}-${subIndex}`}
                      className="flex h-8 animate-pulse items-center gap-2 rounded-md px-2"
                    >
                      <div className="h-4 w-4 rounded bg-muted" />
                      <div className="h-3 w-20 flex-1 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
