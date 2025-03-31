'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Handshake, Upload } from 'lucide-react';

export interface Resource {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  icon?: React.ReactNode;
}

interface HelpResourcesProps {
  resources: Resource[];
}

export function HelpResources({ resources }: HelpResourcesProps) {
  // 默认图标映射
  const defaultIcons = [
    <BookOpen key="book" className="h-5 w-5" />,
    <Handshake key="handshake" className="h-5 w-5" />,
    <Upload key="upload" className="h-5 w-5" />,
  ];

  return (
    <div className="rounded-lg border bg-gradient-to-br from-muted/30 to-muted/10 p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-3">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="group relative space-y-3 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                {resource.icon || defaultIcons[index % defaultIcons.length]}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold leading-none">{resource.title}</h3>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-primary hover:bg-transparent hover:text-primary/80"
                  asChild
                >
                  <a href={resource.linkHref} className="group/link flex items-center gap-1">
                    {resource.linkText}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
