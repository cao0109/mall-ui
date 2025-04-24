import { createNavigation } from 'next-intl/navigation';

import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '@/i18n/tolgee/shared';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation({
  locales: ALL_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
});
