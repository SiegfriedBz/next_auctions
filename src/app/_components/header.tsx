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
  return (
    <header className="flex justify-between items-center p-4">
      <span>LOGO</span>
      <div className="flex justify-between items-center space-x-8">
        <nav>
          <ul className="flex space-x-4">
            <NavLinks />
          </ul>
        </nav>
        <ThemeToggleButton />
        {MOCK_USER ? <UserMenu user={MOCK_USER} /> : <AuthButton />}
      </div>
    </header>
  );
};
