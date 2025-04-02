'use client';

import { CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BlogCodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function BlogCodeBlock({
  code,
  language = 'javascript',
  fileName,
  showLineNumbers = true,
  className,
}: BlogCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  // 处理复制代码
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 格式化代码，添加行号
  const formatCode = () => {
    const lines = code.split('\n');
    if (!showLineNumbers) return code;

    return lines
      .map(
        (line, index) =>
          `<span class="code-line-number">${index + 1}</span><span class="code-line">${line}</span>`
      )
      .join('\n');
  };

  // 为不同语言应用不同的类名
  const getLanguageClass = () => {
    return `language-${language}`;
  };

  useEffect(() => {
    // 如果有语法高亮库（如Prism.js或Highlight.js），可以在这里初始化
    // 这里仅提供简单样式，您可以根据需要集成语法高亮库
  }, []);

  return (
    <div className={cn('overflow-hidden rounded-lg border bg-muted font-mono text-sm', className)}>
      {fileName && (
        <div className="flex items-center justify-between border-b bg-muted/80 px-4 py-2 text-xs text-muted-foreground">
          <span>{fileName}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-6 w-6 rounded-md p-0 hover:bg-muted-foreground/20"
          >
            <CopyIcon className="h-3.5 w-3.5" />
            <span className="sr-only">复制代码</span>
          </Button>
        </div>
      )}
      <div className="relative">
        {!fileName && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute right-2 top-2 h-6 w-6 rounded-md bg-background/80 p-0 hover:bg-muted-foreground/20"
          >
            <CopyIcon className="h-3.5 w-3.5" />
            <span className="sr-only">复制代码</span>
          </Button>
        )}
        <pre
          className={cn(
            'scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent max-h-[500px] overflow-auto p-4',
            getLanguageClass(),
            showLineNumbers && 'line-numbers'
          )}
        >
          <code className={getLanguageClass()} dangerouslySetInnerHTML={{ __html: formatCode() }} />
        </pre>
      </div>
      {isCopied && (
        <div className="absolute right-2 top-2 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
          已复制
        </div>
      )}
    </div>
  );
}
