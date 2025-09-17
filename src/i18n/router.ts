import "server-only";

import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { I18nLocales } from "@/i18n";

const CatalogsMapper: Record<string, () => Promise<Messages>> = {
  en: async () => import("./messages/en").then((mod) => mod.messages),
  de: async () => import("./messages/de").then((mod) => mod.messages),
  fr: async () => import("./messages/fr").then((mod) => mod.messages),
  pseudo: async () => import("./messages/pseudo").then((mod) => mod.messages),
};

// optionally use a stricter union type
type SupportedLocales = string;

async function loadCatalog(locale: SupportedLocales): Promise<{
  [k: string]: Messages;
}> {
  const messages = await CatalogsMapper[locale]();

  return {
    [locale]: messages,
  };
}

const catalogs: Array<{ [k: string]: Messages }> = await Promise.all(
  I18nLocales.map(loadCatalog),
);

// transform array of catalogs into a single object
export const allMessages = catalogs.reduce((acc, oneCatalog) => {
  return { ...acc, ...oneCatalog };
}, {});

type AllI18nInstances = { [K in SupportedLocales]: I18n };

export const allI18nInstances: AllI18nInstances = I18nLocales.reduce(
  (acc: Partial<AllI18nInstances>, locale: string) => {
    const messages = allMessages[locale] ?? {};
    const i18n = setupI18n({
      locale,
      messages: { [locale]: messages },
    });
    return { ...acc, [locale]: i18n };
  },
  {} as Partial<AllI18nInstances>,
);

export const getI18nInstance = (locale: SupportedLocales): I18n => {
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`);
  }
  return allI18nInstances[locale] || allI18nInstances.eng;
};
