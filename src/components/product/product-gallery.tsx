import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface ProductGalleryProps {
  images: Array<{ url: string }>;
  title?: string;
  initialIndex?: number;
}

export function ProductGallery({ images, title, initialIndex = 0 }: ProductGalleryProps) {
  // 状态管理
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // refs
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // 计算有效图片和当前选中图片
  const validImages = useMemo(() => {
    return images?.length > 0 ? images : [{ url: '/placeholder-product.png' }];
  }, [images]);

  const selectedImage = useMemo(() => {
    return validImages[selectedIndex]?.url || '/placeholder-product.png';
  }, [validImages, selectedIndex]);

  // 是否显示左右滚动按钮
  const shouldShowScrollButtons = useMemo(() => {
    return validImages.length > 3;
  }, [validImages.length]);

  // 导航操作
  const handlePrevious = useCallback(() => {
    setSelectedIndex(prev => (prev === 0 ? validImages.length - 1 : prev - 1));
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1));
  }, [validImages.length]);

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        handleNext();
        e.preventDefault();
      } else if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
        e.preventDefault();
      } else if (e.key === 'Enter' && !isZoomed) {
        setIsZoomed(true);
        e.preventDefault();
      }
    },
    [handleNext, handlePrevious, isZoomed]
  );

  // 触摸处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSignificantMovement = Math.abs(distance) > 30;

    if (isSignificantMovement) {
      if (distance > 0) {
        // 向左滑动
        handleNext();
      } else {
        // 向右滑动
        handlePrevious();
      }
    }

    // 重置触摸状态
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, handleNext, handlePrevious]);

  // 缩略图滚动
  const scrollThumbnailIntoView = useCallback(() => {
    if (!thumbnailsRef.current) return;

    const container = thumbnailsRef.current;
    const thumbnails = container.querySelectorAll('button');
    const thumbnail = thumbnails[selectedIndex];

    if (!thumbnail) return;

    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;
    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailRight = thumbnailLeft + thumbnail.clientWidth;
    const scrollPadding = 16; // 添加一些边距

    // 如果缩略图不在可视区域内，则滚动到可视区域
    if (thumbnailLeft < containerLeft) {
      container.scrollTo({
        left: thumbnailLeft - scrollPadding,
        behavior: 'smooth',
      });
    } else if (thumbnailRight > containerRight) {
      container.scrollTo({
        left: thumbnailRight - container.clientWidth + scrollPadding,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // 点击缩放
  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  // 效果处理
  useEffect(() => {
    galleryRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollThumbnailIntoView();
  }, [selectedIndex, scrollThumbnailIntoView]);

  // 处理图片加载错误
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-product.png';
  }, []);

  return (
    <div
      className="flex flex-col gap-6"
      ref={galleryRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`${title || '商品'}图片浏览器`}
    >
      {/* 主图展示区域 */}
      <div
        ref={mainImageRef}
        className="relative aspect-square overflow-hidden rounded-xl border bg-muted/10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={selectedImage}
          alt={`${title || '商品'} ${selectedIndex + 1}`}
          layout="fill"
          priority
          className={cn(
            'h-full w-full object-cover transition-all duration-300',
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in hover:scale-105'
          )}
          onClick={toggleZoom}
          onError={handleImageError}
        />

        {/* 缩放控制 */}
        {!isZoomed ? (
          <button
            className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsZoomed(true)}
            aria-label="放大查看"
          >
            <ZoomIn size={16} />
          </button>
        ) : (
          <button
            className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsZoomed(false)}
            aria-label="退出放大"
          >
            <X size={16} />
          </button>
        )}

        {/* 图片计数器 */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {selectedIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* 缩略图区域 */}
      {validImages.length > 1 && (
        <div className="relative w-full pb-2 pt-2">
          <div
            ref={thumbnailsRef}
            className="scrollbar-none mx-auto flex space-x-3 overflow-x-auto px-12 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {validImages.map((image, index) => (
              <button
                key={index}
                className={cn(
                  'relative aspect-square h-28 w-28 flex-shrink-0 overflow-visible rounded-lg border bg-muted/10',
                  'transition-all duration-200 hover:border-primary/50',
                  selectedIndex === index
                    ? 'shadow-lg ring-2 ring-primary ring-offset-2'
                    : 'opacity-80 hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
                onClick={() => setSelectedIndex(index)}
                aria-label={`查看第${index + 1}张图片`}
                aria-current={selectedIndex === index}
                style={{ margin: '4px' }} // 添加外边距，确保选中边框不被裁切
              >
                <Image
                  src={image.url}
                  alt={`${title || '商品'} ${index + 1}`}
                  layout="fill"
                  className="h-full w-full rounded-lg object-cover"
                  onError={handleImageError}
                  priority
                />
              </button>
            ))}
          </div>

          {shouldShowScrollButtons && (
            <>
              <button
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handlePrevious}
                aria-label="上一张图片"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleNext}
                aria-label="下一张图片"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
