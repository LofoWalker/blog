import type { Lang } from './ui';
import { defaultLang, langs } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return langs.includes(segment as Lang) ? (segment as Lang) : defaultLang;
}

export function localizedPath(lang: Lang, path: string): string {
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

export function swapLang(pathname: string, currentLang: Lang): string {
  const other = currentLang === 'fr' ? 'en' : 'fr';
  return pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), `/${other}`);
}

export function getLocaleSlug(id: string): string {
  return id.split('/').slice(1).join('/');
}

export function getLocaleFromId(id: string): Lang {
  const segment = id.split('/')[0] as Lang;
  return langs.includes(segment) ? segment : defaultLang;
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}

export function checkTranslationParity<T extends { id: string; data: { translationKey: string } }>(
  entries: T[],
  collectionName: string,
): void {
  const byKey = new Map<string, string[]>();
  for (const e of entries) {
    const lang = e.id.split('/')[0];
    const key = e.data.translationKey;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(lang);
  }
  for (const [key, found] of byKey) {
    const missing = langs.filter((l) => !found.includes(l));
    if (missing.length > 0) {
      throw new Error(
        `[i18n] Missing translation for "${key}" in "${collectionName}". Missing locale(s): ${missing.join(', ')}.`,
      );
    }
  }
}
