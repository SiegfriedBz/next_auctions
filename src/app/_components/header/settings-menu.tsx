import { SettingsIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navMenuItemClasses } from "./navigation-menu-classes";
import { ThemeToggleButton } from "./theme-toggle-button";

type Props = { onCloseMenu: () => void };

export const SettingsMenu: FC<PropsWithChildren<Props>> = (props) => {
  const { onCloseMenu, children } = props;

  return (
    <NavigationMenuItem className={navMenuItemClasses}>
      <NavigationMenuTrigger className={navMenuItemClasses}>
        <SettingsIcon size={24} className="size-9" />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-72 gap-2 grid-cols-2">
          <li className="flex justify-center items-center">
            <NavigationMenuLink asChild>
              {/* <I18nSwitcher /> */}
              {children}
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              {/* to prevent closing NavigationMenu on open ThemeToggleButton dropdown */}
              <ThemeToggleButton
                onCloseParent={onCloseMenu}
                className="pointer-events-auto h-12 text-sm leading-none font-medium flex flex-row justify-center items-center gap-x-2"
              />
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
