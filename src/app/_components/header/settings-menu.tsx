import { SettingsIcon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navMenuItemClasses } from "./navigation-menu-classes";
import { ThemeToggleButton } from "./theme-toggle-button";

type Props = { onCloseMenu: () => void };

export const SettingsMenu: FC<PropsWithChildren<Props>> = (props) => {
  const { onCloseMenu, children } = props;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn("h-8 sm:h-10", navMenuItemClasses)}>
        <SettingsIcon
          size={20}
          className="size-8 sm:size-10 bg-transparent opacity-80 hover:opacity-100 transition-all duration-200"
        />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-44 sm:w-72 gap-2 grid-cols-1 sm:grid-cols-2">
          <li className="flex justify-center items-center">
            <NavigationMenuLink asChild>
              {/* I18nSwitcher */}
              {children}
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              {/* to prevent closing NavigationMenu on open ThemeToggleButton dropdown */}
              <ThemeToggleButton
                onCloseParent={onCloseMenu}
                className="pointer-events-auto h-10 sm:h-12 text-sm leading-none font-medium flex flex-row justify-center items-center gap-x-2"
              />
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
