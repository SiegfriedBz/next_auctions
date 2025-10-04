import type { Locale } from "@lingui/core";

type Params = {
  value: Date | null;
  locale: Locale;
};

export const formatDate = (params: Params) => {
  const { value, locale } = params;

  if (value == null) return null;

  return new Intl.DateTimeFormat(locale).format(value);
};
