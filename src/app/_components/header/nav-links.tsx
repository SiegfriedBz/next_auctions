"use client";

import {
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  useCallback,
  useState,
} from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { User } from "@/core/domains/user";
import { AuctionsMenu } from "./auctions-menu";
import { SettingsMenu } from "./settings-menu";
import { UserMenu } from "./user-menu";

type Props = ComponentProps<typeof NavigationMenu> & {
  user: User | null;
};

export const NavLinks: FC<PropsWithChildren<Props>> = (props) => {
  const { user, children } = props;

  const [menuValue, setMenuValue] = useState<string | undefined>(undefined);

  // to prevent closing NavigationMenu on open ThemeToggleButton dropdown
  const onCloseMenu = useCallback(() => {
    setMenuValue(undefined);
  }, []);

  return (
    <NavigationMenu
      {...props}
      viewport={true}
      value={menuValue}
      onValueChange={setMenuValue}
    >
      <NavigationMenuList className="flex items-center gap-x-6">
        {/* auctions menu */}
        <AuctionsMenu />

        {/* general settings menu */}
        <SettingsMenu onCloseMenu={onCloseMenu}>{children}</SettingsMenu>

        {/* user menu */}
        {user && <UserMenu user={user} />}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
