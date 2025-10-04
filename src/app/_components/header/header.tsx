import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { users } from "@/core/instances/users";
import { I18nSwitcher } from "@/i18n";
import { AuthButton } from "../auth/auth-button";
import { NavLinks } from "./nav-links";

export const Header: FC = async () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const user = await users().me();

  return (
    <header className="flex justify-between items-center p-4 h-24">
      <Link href={`/${lang}/`}>LOGOLOGO</Link>

      {!user && <AuthButton />}

      <NavLinks user={user}>
        <I18nSwitcher className="pointer-events-auto h-full text-sm leading-none font-medium flex flex-row justify-center items-center" />
      </NavLinks>
    </header>
  );
};
