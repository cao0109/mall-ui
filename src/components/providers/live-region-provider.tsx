'use client';

import React, { createContext, useCallback, useContext, useRef } from 'react';

interface LiveRegionContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const LiveRegionContext = createContext<LiveRegionContextType | undefined>(undefined);

export function LiveRegionProvider({ children }: { children: React.ReactNode }) {
  const politeRef = useRef<HTMLDivElement>(null);
  const assertiveRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const targetRef = priority === 'polite' ? politeRef : assertiveRef;
    if (targetRef.current) {
      targetRef.current.textContent = '';
      // 使用 setTimeout 确保屏幕阅读器能够捕获到内容更新
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.textContent = message;
        }
      }, 100);
    }
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      <div
        ref={politeRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        ref={assertiveRef}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />
      {children}
    </LiveRegionContext.Provider>
  );
}

export const useLiveRegion = () => {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error('useLiveRegion must be used within a LiveRegionProvider');
  }
  return context;
};
