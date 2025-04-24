import { BackendFetch, DevTools, FormatSimple, LanguageDetector, Tolgee } from '@tolgee/web';

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;
const prefix = process.env.NEXT_PUBLIC_TOLGEE_CONTENT_PREFIX;

export const ALL_LANGUAGES = ['zh', 'en'];

export const DEFAULT_LANGUAGE = 'zh';

export function TolgeeBase() {
  return Tolgee()
    .use(FormatSimple())
    .use(DevTools())
    .use(LanguageDetector())
    .updateDefaults({
      apiKey,
      apiUrl,
      language: DEFAULT_LANGUAGE,
      availableLanguages: ALL_LANGUAGES,
    })
    .use(
      BackendFetch({
        prefix,
        next: {
          revalidate: 0,
        },
      })
    );
}
