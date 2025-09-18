import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import type { User } from "@/domain/user";
import { AuthButton } from "./auth/auth-button";
import { NavLinks } from "./nav-links";
import { ThemeToggleButton } from "./theme-toggle-button";
import { UserMenu } from "./user-menu";

const MOCK_USER: User = {
  id: "user-01",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@gmail.com",
  avatarUrl: "https://github.com/shadcn.png",
};

export const Header: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <header className="flex justify-between items-center p-4">
      <Link href={`/${lang}/`}>LOGO</Link>
      <div className="flex justify-between items-center space-x-8">
        <nav>
          <NavLinks />
        </nav>
        <ThemeToggleButton />
        {MOCK_USER ? <UserMenu user={MOCK_USER} /> : <AuthButton />}
      </div>
    </header>
  );
};
