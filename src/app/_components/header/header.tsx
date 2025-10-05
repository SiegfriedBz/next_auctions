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
    <header className="flex justify-between items-center h-20 sm:h-32 px-4 sm:px-8 md:px-16">
      <Link href={`/${lang}/`}>LOGOLOGO</Link>

      <div className="flex flex-row items-center gap-x-6 h-full">
        {!user && (
          <Button asChild variant={"outline"}>
            <AuthButton className="h-10 sm:h-12 cursor-pointer text-sm leading-none font-medium flex flex-row justify-center items-center gap-x-2" />
          </Button>
        )}

        <NavLinks user={user}>
          <I18nSwitcher className="pointer-events-auto h-full text-sm leading-none font-medium flex flex-row justify-center items-center" />
        </NavLinks>
      </div>
    </header>
  );
};
