"use client";

import { SettingsIcon } from "lucide-react";
import type { FC } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { I18nSwitcher } from "@/i18n/i18n-switcher";
import { cn } from "@/lib/utils";
import { navMenuItemClasses } from "../navigation-menu-classes";
import { ThemeToggleButton } from "../theme-toggle-button";

export const SettingsMenu: FC = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn("h-8 sm:h-10 cursor-pointer", navMenuItemClasses)}
      >
        <SettingsIcon
          size={20}
          className="size-8 sm:size-10 bg-transparent opacity-80 hover:opacity-100 transition-all duration-200"
        />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-44 sm:w-72 gap-2 grid-cols-1 sm:grid-cols-2">
          <li key="I18nSwitcher" className="flex justify-center items-center">
            <NavigationMenuLink asChild>
              <I18nSwitcher
                className={`
                  pointer-events-auto h-10 sm:h-12 text-sm leading-none font-medium 
                  flex flex-row justify-start items-center gap-x-2
                  px-2 py-6 rounded-md
                `}
              />
            </NavigationMenuLink>
          </li>
          <li key="ThemeToggleButton">
            <NavigationMenuLink asChild>
              <ThemeToggleButton
                className="pointer-events-auto h-10 sm:h-12 text-sm leading-none font-medium
                  flex flex-row justify-center items-center gap-x-2"
              />
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
