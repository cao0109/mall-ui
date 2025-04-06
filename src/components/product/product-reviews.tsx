import { Star } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ProductReview {
  id: string;
  title: string;
  content: string;
  rating: number;
  customer?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
  created_at: string;
}

interface ProductReviewsProps {
  reviews: ProductReview[];
}

const PAGE_SIZE = 5;

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');

  if (!reviews?.length) {
    return <div className="py-8 text-center text-muted-foreground">暂无评论</div>;
  }

  // 计算平均评分
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // 统计各个评分的数量
  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  // 筛选和排序评论
  const filteredReviews = reviews
    .filter(review => selectedRating === 'all' || review.rating === Number(selectedRating))
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return b.rating - a.rating;
    });

  // 分页
  const totalPages = Math.ceil(filteredReviews.length / PAGE_SIZE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到评论列表顶部
    document.getElementById('reviews-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* 评分统计 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{avgRating.toFixed(1)}</div>
              <div className="space-y-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        'h-5 w-5',
                        index < Math.round(avgRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      )}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">共 {reviews.length} 条评价</div>
              </div>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => {
                    setSelectedRating(selectedRating === String(rating) ? 'all' : String(rating));
                    setCurrentPage(1);
                  }}
                  className={cn(
                    'w-full rounded-lg transition-colors hover:bg-accent',
                    selectedRating === String(rating) && 'bg-accent'
                  )}
                >
                  <div className="flex items-center gap-2 p-2 text-sm">
                    <div className="flex w-24 items-center">
                      <div className="flex">
                        {Array.from({ length: rating }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground">{ratingCounts[rating] || 0}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 最新评论预览 */}
          <div className="space-y-4">
            <h4 className="font-medium">最新评论</h4>
            {reviews.slice(0, 2).map(review => (
              <div key={review.id} className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">
                    {review.customer
                      ? `${review.customer.first_name || ''} ${
                          review.customer.last_name || ''
                        }`.trim() || review.customer.email
                      : '匿名用户'}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          'h-3.5 w-3.5',
                          index < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 筛选和排序控件 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <RadioGroup
            value={selectedRating}
            onValueChange={value => {
              setSelectedRating(value);
              setCurrentPage(1);
            }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">全部</Label>
            </div>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-2">
                <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`}>{rating}星</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Select
          value={sortBy}
          onValueChange={(value: 'latest' | 'rating') => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">最新</SelectItem>
            <SelectItem value="rating">评分</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 评论列表 */}
      <div id="reviews-list" className="space-y-4">
        {paginatedReviews.map(review => (
          <Card key={review.id} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <span className="text-sm font-medium">
                      {review.customer?.first_name?.[0] || review.customer?.email[0] || '?'}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">
                    {review.customer
                      ? `${review.customer.first_name || ''} ${
                          review.customer.last_name || ''
                        }`.trim() || review.customer.email
                      : '匿名用户'}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={cn(
                            'h-3.5 w-3.5',
                            index < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                    <time dateTime={review.created_at}>
                      {new Date(review.created_at).toLocaleDateString('zh-CN')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mb-2 font-medium">{review.title}</h5>
            <p className="whitespace-pre-line text-sm text-muted-foreground">{review.content}</p>
          </Card>
        ))}
      </div>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一页
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            下一页
          </Button>
        </div>
      )}
    </div>
  );
}
