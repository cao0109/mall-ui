"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

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
    variant?: "default" | "primary" | "secondary" | "outline" | "destructive";
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
    <div className={cn("flex items-center justify-between", className)}>
      <div className="relative">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        {badge && (
          <div className="absolute -top-2 -right-12 rotate-12">
            <span className="inline-block bg-red-50 text-red-500 text-xs px-2 py-1 rounded-full">
              {badge.text}
            </span>
          </div>
        )}
      </div>
      {action && (
        <Button variant="ghost" className="group" onClick={action.onClick}>
          {action.label}
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
    </div>
  );
}
