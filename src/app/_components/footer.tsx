import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <footer className="flex py-8 gap-[24px] flex-wrap items-center justify-center">
      <span>© {new Date().getFullYear()}</span>

      <Link href={`/${lang}/`} scroll>
        <span className="tracking-wide">
          GavL | Track Auctions Effortlessly
        </span>
      </Link>
    </footer>
  );
};
