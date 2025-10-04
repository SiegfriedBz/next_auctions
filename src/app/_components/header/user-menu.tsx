import { useLingui } from "@lingui/react/macro";
import { type FC, useMemo } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { User } from "@/core/domains/user";
import { LogOutButton } from "../auth/log-out-button";
import { UserAvatar } from "../user-avatar";
import { getUserNavLinks } from "./get-links";
import { NavListItem } from "./nav-list-item";
import { navMenuItemClasses } from "./navigation-menu-classes";

type Props = { user: User };

export const UserMenu: FC<Props> = (props) => {
  const { user } = props;

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const userNavLinks = useMemo(() => getUserNavLinks(lang), [lang]);

  return (
    <NavigationMenuItem className={navMenuItemClasses}>
      <NavigationMenuTrigger className={navMenuItemClasses}>
        <UserAvatar
          user={user}
          onlyAvatar
          className={navMenuItemClasses}
          avatarClassName="size-10 sm:size-12"
        />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-72 gap-2 grid-cols-2">
          {userNavLinks.map((c) => (
            <NavListItem
              key={i18n._(c.title)}
              title={i18n._(c.title)}
              icon={c.icon}
              href={c.href}
            />
          ))}

          <li>
            <NavigationMenuLink asChild>
              <LogOutButton className="h-12 text-sm leading-none font-medium flex flex-row justify-end items-center gap-x-2" />
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
