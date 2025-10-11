import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { NavLinks } from "./nav-links";

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center h-28 sm:h-32 md:h-38 px-4 sm:px-16">
      <Logo />
      <NavLinks />
    </header>
  );
};

const Logo: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <Link href={`/${lang}/`} className="flex flex-col">
      <span className="font-extrabold text-2xl sm:text-3xl tracking-widest">
        GavL
      </span>
      <span className="max-[374px]:max-w-24 text-xs md:text-base text-muted-foreground mt-1 font-medium tracking-wide">
        Track Auctions Effortlessly
      </span>
    </Link>
  );
};
