'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BlogVideoProps {
  src: string;
  title?: string;
  platform?: 'youtube' | 'bilibili' | 'vimeo' | 'generic';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  className?: string;
}

export function BlogVideo({
  src,
  title,
  platform = 'generic',
  aspectRatio = '16:9',
  className,
}: BlogVideoProps) {
  const [isLoading, setIsLoading] = useState(true);

  // 处理不同平台的URL
  const getEmbedUrl = (url: string, platform: string) => {
    if (platform === 'youtube') {
      // 处理YouTube链接
      const youtubeRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(youtubeRegex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=0`;
      }
    } else if (platform === 'bilibili') {
      // 处理Bilibili链接
      const bilibiliRegex = /(?:https?:\/\/)?(?:www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+)/;
      const match = url.match(bilibiliRegex);
      if (match && match[1]) {
        return `https://player.bilibili.com/player.html?bvid=${match[1]}&page=1`;
      }
    } else if (platform === 'vimeo') {
      // 处理Vimeo链接
      const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/([0-9]+)/;
      const match = url.match(vimeoRegex);
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}?autoplay=0`;
      }
    }

    // 对于通用链接，直接返回
    return url;
  };

  const embedUrl = getEmbedUrl(src, platform);

  // 设置不同宽高比的类名
  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case '16:9':
        return 'aspect-video'; // 16:9
      case '4:3':
        return 'aspect-[4/3]'; // 4:3
      case '1:1':
        return 'aspect-square'; // 1:1
      default:
        return 'aspect-video';
    }
  };

  const aspectRatioClass = getAspectRatioClass(aspectRatio);

  return (
    <div className={cn('relative overflow-hidden rounded-lg border', aspectRatioClass, className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title || '嵌入视频'}
        allowFullScreen
        className="h-full w-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
