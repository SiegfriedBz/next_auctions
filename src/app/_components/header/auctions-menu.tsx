import { useLingui } from "@lingui/react/macro";
import { Grid3x3Icon } from "lucide-react";
import { type FC, useMemo } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { getAuctionsNavLinks } from "./get-nav-links";
import { NavListItem } from "./nav-list-item";
import { navMenuItemClasses } from "./navigation-menu-classes";

export const AuctionsMenu: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const auctionsNavLinks = useMemo(() => getAuctionsNavLinks(lang), [lang]);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn("h-8 sm:h-10 cursor-pointer", navMenuItemClasses)}
      >
        <Grid3x3Icon
          size={20}
          className="size-8 sm:size-10 bg-transparent opacity-80 hover:opacity-100 transition-all duration-200"
        />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-44 sm:w-72 gap-2 grid-cols-1 sm:grid-cols-2">
          {auctionsNavLinks.map((c) => {
            return (
              <NavListItem
                key={i18n._(c.title)}
                title={i18n._(c.title)}
                icon={c.icon}
                href={c.href}
              />
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
