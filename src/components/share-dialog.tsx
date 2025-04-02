'use client';

import { Facebook, Link, Linkedin, Share2, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ShareDialogProps {
  title: string;
  url: string;
}

export function ShareDialog({ title, url }: ShareDialogProps) {
  const t = useTranslations();

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // TODO: 添加复制成功的提示
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          {t('blog.share')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('blog.shareTitle')}</DialogTitle>
          <DialogDescription>{t('blog.shareDescription')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center gap-2 rounded-md border p-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent outline-none"
            />
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Link className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            {shareLinks.map(link => (
              <Button key={link.name} variant="outline" size="icon" asChild className="h-10 w-10">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
