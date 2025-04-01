import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface ProductGalleryProps {
  images: Array<{ url: string }>;
  title?: string;
  initialIndex?: number;
}

export function ProductGallery({ images, title, initialIndex = 0 }: ProductGalleryProps) {
  const t = useTranslations('product.gallery');

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
  // useEffect(() => {
  //   galleryRef.current?.focus();
  // }, []);

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
      className="flex flex-col gap-4 sm:gap-6"
      ref={galleryRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={t('imageBrowser')}
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
            className="absolute bottom-2 right-2 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary sm:bottom-3 sm:right-3 sm:p-2"
            onClick={() => setIsZoomed(true)}
            aria-label={t('zoomIn')}
          >
            <ZoomIn size={14} className="sm:h-4 sm:w-4" />
          </button>
        ) : (
          <button
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary sm:right-3 sm:top-3 sm:p-2"
            onClick={() => setIsZoomed(false)}
            aria-label={t('zoomOut')}
          >
            <X size={14} className="sm:h-4 sm:w-4" />
          </button>
        )}

        {/* 图片计数器 */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-sm">
            {t('imageCounter', { current: selectedIndex + 1, total: validImages.length })}
          </div>
        )}
      </div>

      {/* 缩略图区域 */}
      {validImages.length > 1 && (
        <div className="relative w-full pb-1 pt-1 sm:pb-2 sm:pt-2">
          <div
            ref={thumbnailsRef}
            className="scrollbar-none mx-auto flex space-x-2 overflow-x-auto px-8 py-1 sm:space-x-3 sm:px-12 sm:py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {validImages.map((image, index) => (
              <button
                key={index}
                className={cn(
                  'relative aspect-square h-16 w-16 flex-shrink-0 overflow-visible rounded-lg border bg-muted/10 sm:h-24 sm:w-24 md:h-28 md:w-28',
                  'transition-all duration-200 hover:border-primary/50',
                  selectedIndex === index
                    ? 'shadow-lg ring-2 ring-primary ring-offset-1 sm:ring-offset-2'
                    : 'opacity-80 hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 sm:focus:ring-offset-2'
                )}
                onClick={() => setSelectedIndex(index)}
                aria-label={t('viewImage', { index: index + 1 })}
                aria-current={selectedIndex === index}
                style={{ margin: '2px sm:4px' }} // 添加外边距，确保选中边框不被裁切
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
                className="absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary sm:h-10 sm:w-10"
                onClick={handlePrevious}
                aria-label={t('previousImage')}
              >
                <ChevronLeft size={16} className="sm:h-[18px] sm:w-[18px]" />
              </button>
              <button
                className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-primary sm:h-10 sm:w-10"
                onClick={handleNext}
                aria-label={t('nextImage')}
              >
                <ChevronRight size={16} className="sm:h-[18px] sm:w-[18px]" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
