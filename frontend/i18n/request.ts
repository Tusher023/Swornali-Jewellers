import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['en', 'bn', 'hi', 'or'] as const;
type Locale = (typeof locales)[number];

const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;

  const locale: Locale = locales.includes(savedLocale as Locale)
    ? (savedLocale as Locale)
    : defaultLocale;

  const messages = (
    await import(`../messages/${locale}.json`)
  ).default;

  return {
    locale,
    messages,
  };
});

