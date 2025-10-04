import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  HammerIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

type NavLink = {
  href: string;
  title: MessageDescriptor;
  description: MessageDescriptor;
  icon: LucideIcon;
};

const AUCTIONS_NAV_LINKS: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/auctions`,
    title: msg`Liste`,
    icon: HammerIcon,
    description: msg`A set of layered sections of content—known as tab panels—that are displayed one at a time.`,
  },
  {
    href: `/${lang}/auctions/new`,
    title: msg`Create`,
    icon: HammerIcon,
    description: msg`A set of layered sections of content—known as tab panels—that are displayed one at a time.`,
  },
];

const PROFILE_NAV_LINKS: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/profile`,
    title: msg`My Profile`,
    icon: HammerIcon,
    description: msg`A set of layered sections of content—known as tab panels—that are displayed one at a time.`,
  },
  {
    href: `/${lang}/auctions/mine`,
    title: msg`My Auctions`,
    icon: HammerIcon,
    description: msg`A set of layered sections of content—known as tab panels—that are displayed one at a time.`,
  },
  {
    href: `/${lang}/settings`,
    title: msg`My Settings`,
    icon: HammerIcon,
    description: msg`A set of layered sections of content—known as tab panels—that are displayed one at a time.`,
  },
];

export const NavLinks: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Trans>Auctions</Trans>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {AUCTIONS_NAV_LINKS(lang).map((c) => (
                <ListItem
                  key={i18n._(c.title)}
                  title={i18n._(c.title)}
                  href={c.href}
                >
                  {i18n._(c.description)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Trans>Settings</Trans>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {PROFILE_NAV_LINKS(lang).map((c) => (
                <ListItem
                  key={i18n._(c.title)}
                  title={i18n._(c.title)}
                  href={c.href}
                >
                  {i18n._(c.description)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

{
  /* 
<ul className="flex space-x-4">
      {AUCTIONS_NAV_LINKS(lang).map(({ href, label, icon: Icon }) => (
        <li
          key={href}
          className="flex flex-col items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        >
          <Link href={href} className="flex h-10 space-x-2 items-center">
            <Icon />
            <span>{i18n._(label)}</span>
          </Link>
          <UnderNavLink href={href} />
        </li>
      ))}
    </ul>
*/
}
