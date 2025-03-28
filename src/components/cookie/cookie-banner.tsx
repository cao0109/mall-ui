"use client";

import { getCookie, setCookie } from "cookies-next";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmation, setConfirmation] = useState<
    "accepted" | "rejected" | null
  >(null);

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleCookieChoice = (accepted: boolean) => {
    setCookie("cookie-consent", accepted ? "true" : "false", {
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });
    setIsVisible(false);
    setConfirmation(accepted ? "accepted" : "rejected");
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
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
          role="region"
          aria-label="Cookie 确认"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    confirmation === "accepted" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <p className="text-sm text-gray-600">
                  {confirmation === "accepted"
                    ? "您已接受 Cookie"
                    : "您已拒绝 Cookie"}
                  <span className="mx-1">·</span>
                  <Link
                    href="/policies/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    查看隐私政策
                  </Link>
                </p>
              </div>
              <button
                onClick={hideConfirmation}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="关闭"
              >
                <X className="w-4 h-4 text-gray-500" />
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
        className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
        role="region"
        aria-label="Cookie 设置"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-600"
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
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Cookie 设置
                  </h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>我们使用必要的 Cookie 来使网站正常运行。</p>
                    <p>
                      我们还想使用分析 Cookie
                      来了解您如何使用本网站，以便我们可以改进服务。
                      这需要您的同意。详细信息请查看我们的
                      <Link
                        href="/policies/privacy"
                        className="text-blue-600 hover:underline mx-1"
                      >
                        隐私政策
                      </Link>
                      和
                      <Link
                        href="/policies/terms"
                        className="text-blue-600 hover:underline mx-1"
                      >
                        服务条款
                      </Link>
                      。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:ml-4">
              <button
                onClick={() => handleCookieChoice(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                接受所有 Cookie
              </button>
              <button
                onClick={() => handleCookieChoice(false)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                仅使用必要的 Cookie
              </button>
              <Link
                href="/policies/privacy#cookies"
                className="px-6 py-2 text-blue-600 hover:underline text-center"
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
