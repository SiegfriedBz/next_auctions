import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { users } from "@/core/instances/users";
import { AuthButton } from "./auth/auth-button";
import { NavLinks } from "./nav-links";
import { ThemeToggleButton } from "./theme-toggle-button";
import { UserMenu } from "./user-menu";

export const Header: FC = async () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const user = await users().me();

  return (
    <header className="flex justify-between items-center p-4">
      <Link href={`/${lang}/`}>LOGOLOGO</Link>

      <nav>
        <NavLinks />
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <div className="flex justify-between items-center space-x-8">
          {user ? <UserMenu user={user} /> : <AuthButton />}
        </div>
      </div>
    </header>
  );
};
