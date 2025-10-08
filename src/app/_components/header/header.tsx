import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { users } from "@/core/instances/users";
import { I18nSwitcher } from "@/i18n";
import { AuthButton } from "../auth/auth-button";
import { NavLinks } from "./nav-links";

export const Header: FC = async () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const user = await users().me();

  return (
    <header className="flex justify-between items-center h-28 sm:h-32 md:h-38 px-4 sm:px-16">
      <Link href={`/${lang}/`} className="flex flex-col">
        <span className="font-extrabold text-2xl sm:text-3xl tracking-widest">
          GavL
        </span>
        <span className="text-sm md:text-base text-muted-foreground mt-1 font-medium tracking-wide">
          Track Auctions Effortlessly
        </span>
      </Link>

      <div className="flex flex-row items-center gap-x-2 sm:gap-x-4 md:gap-x-6 h-full">
        {!user && (
          <Button asChild variant={"outline"}>
            <AuthButton className="h-8 sm:h-10 cursor-pointer text-sm leading-none font-medium flex flex-row justify-center items-center gap-x-2" />
          </Button>
        )}

        <NavLinks user={user}>
          <I18nSwitcher
            className={`
              pointer-events-auto h-10 sm:h-12 text-sm leading-none font-medium 
              flex flex-row justify-start items-center gap-x-2
              px-2 py-6 rounded-md
            `}
          />
        </NavLinks>
      </div>
    </header>
  );
};
