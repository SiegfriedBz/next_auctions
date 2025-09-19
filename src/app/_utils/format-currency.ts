import type { Locale } from "@lingui/core";

enum Currency {
  EUR = "EUR",
  USD = "USD",
}

type Params = {
  value: number | null;
  locale: Locale;
};

export const formatCurrency = (params: Params) => {
  const { value, locale } = params;

  if (value == null) return null;

  const currency =
    locale === "fr" || locale === "de" ? Currency.EUR : Currency.USD;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
