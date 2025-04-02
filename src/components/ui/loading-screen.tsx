import { LoadingSpinner } from './loading-spinner';

interface LoadingScreenProps {
  text?: string;
}

export function LoadingScreen({ text }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
      {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
