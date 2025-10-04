"use client";

import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { usePathname, useRouter } from "next/navigation";
import { type FC, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LANGUAGES = {
  en: msg`English`,
  de: msg`Deutsch`,
  fr: msg`Français`,
} as const;

type Props = {
  className?: string;
};

export const I18nSwitcher: FC<Props> = (props) => {
  const { className } = props;

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
      <SelectTrigger className={cn("w-full", className)}>
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
};
