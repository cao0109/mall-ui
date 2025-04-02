'use client';

import { LoadingScreen } from '@/components/ui/loading-screen';
import { useLoadingStore } from '@/store/loading-store';

export function LoadingProvider() {
  const { isLoading, loadingText } = useLoadingStore();

  if (!isLoading) return null;

  return <LoadingScreen text={loadingText} />;
}
