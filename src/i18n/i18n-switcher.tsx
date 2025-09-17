"use client";

import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = {
  en: msg`English`,
  de: msg`Deutsch`,
  fr: msg`Français`,
} as const;

export function I18nSwitcher() {
  const router = useRouter();
  const { i18n, t } = useLingui();
  const pathname = usePathname();

  const locale = useMemo(() => pathname?.split("/")[1], [pathname]);

  const languages = useMemo(() => {
    return Object.entries(LANGUAGES);
  }, []);

  const onChange = useCallback(
    (locale: string) => {
      const pathNameWithoutLocale = pathname?.split("/")?.slice(2) ?? [];
      const newPath = `/${locale}/${pathNameWithoutLocale.join("/")}`;

      router.push(newPath);
    },
    [router, pathname],
  );

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t`Choose a language`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            <Trans>Language</Trans>
          </SelectLabel>
          {languages.map(([key, lang]) => (
            <SelectItem key={key} value={key}>
              {i18n._(lang)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
