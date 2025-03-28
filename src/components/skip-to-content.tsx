import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-2 left-2 z-[100]",
        "bg-background px-4 py-2 text-sm",
        "rounded-md border shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      )}
    >
      跳转到主要内容
    </a>
  );
}
