'use client';

import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
  icon?: ReactNode;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive';
  };
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  icon,
  badge,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="relative">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
        {badge && (
          <div className="absolute -right-12 -top-2 rotate-12">
            <span className="inline-block rounded-full bg-red-50 px-2 py-1 text-xs text-red-500">
              {badge.text}
            </span>
          </div>
        )}
      </div>
      {action && (
        <Button variant="ghost" className="group" onClick={action.onClick}>
          {action.label}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </div>
  );
}
