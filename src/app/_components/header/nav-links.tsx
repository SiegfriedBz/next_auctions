import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { users } from "@/core/instances/users";
import { AuthButton } from "../auth/auth-button";
import { AuctionsMenu } from "./auctions-menu/auctions-menu";
import { NotificationsMenu } from "./notifications-menu/notifications-menu";
import { SettingsMenu } from "./settings-menu/settings-menu";
import { UserMenu } from "./user-menu/user-menu";

export const NavLinks: FC = async () => {
  const me = await users().me();

  return (
    <div className="flex flex-row items-center gap-x-2 sm:gap-x-4 md:gap-x-6 h-full">
      {!me && (
        <Button asChild variant={"outline"}>
          <AuthButton className="h-8 sm:h-10 cursor-pointer text-sm leading-none font-medium flex flex-row justify-center items-center gap-x-2" />
        </Button>
      )}

      <NavigationMenu viewport={true}>
        <NavigationMenuList className="flex items-center gap-x-2 sm:gap-x-4 md:gap-x-6">
          <AuctionsMenu me={me}></AuctionsMenu>
          <SettingsMenu />
          {me && (
            <>
              <UserMenu me={me} />
              <NotificationsMenu me={me} />
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
