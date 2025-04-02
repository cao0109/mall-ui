'use client';

import { getCookie, setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmation, setConfirmation] = useState<'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    const consent = getCookie('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleCookieChoice = (accepted: boolean) => {
    setCookie('cookie-consent', accepted ? 'true' : 'false', {
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });
    setIsVisible(false);
    setConfirmation(accepted ? 'accepted' : 'rejected');
  };

  const hideConfirmation = () => {
    setConfirmation(null);
  };

  if (!isVisible && !confirmation) return null;

  if (confirmation) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg"
          role="region"
          aria-label="Cookie 确认"
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    confirmation === 'accepted' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <p className="text-sm text-gray-600">
                  {confirmation === 'accepted' ? '您已接受 Cookie' : '您已拒绝 Cookie'}
                  <span className="mx-1">·</span>
                  <Link href="/policies/privacy" className="text-blue-600 hover:underline">
                    查看隐私政策
                  </Link>
                </p>
              </div>
              <button
                onClick={hideConfirmation}
                className="rounded-full p-1 transition-colors hover:bg-gray-100"
                aria-label="关闭"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg"
        role="region"
        aria-label="Cookie 设置"
      >
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="mb-1 text-lg font-semibold text-gray-900">Cookie 设置</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>我们使用必要的 Cookie 来使网站正常运行。</p>
                    <p>
                      我们还想使用分析 Cookie 来了解您如何使用本网站，以便我们可以改进服务。
                      这需要您的同意。详细信息请查看我们的
                      <Link href="/policies/privacy" className="mx-1 text-blue-600 hover:underline">
                        隐私政策
                      </Link>
                      和
                      <Link href="/policies/terms" className="mx-1 text-blue-600 hover:underline">
                        服务条款
                      </Link>
                      。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:ml-4">
              <button
                onClick={() => handleCookieChoice(true)}
                className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                接受所有 Cookie
              </button>
              <button
                onClick={() => handleCookieChoice(false)}
                className="rounded-md border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                仅使用必要的 Cookie
              </button>
              <Link
                href="/policies/privacy#cookies"
                className="px-6 py-2 text-center text-blue-600 hover:underline"
              >
                查看 Cookie 详情
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
