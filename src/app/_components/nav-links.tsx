import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { HammerIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import { UnderNavLink } from "./under-nav-link";

type NavLink = { href: string; label: MessageDescriptor; icon: LucideIcon };

const NAV_LINKS: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/auctions`,
    label: msg`Auctions`,
    icon: HammerIcon,
  },
  {
    href: `/${lang}/auctions/new`,
    label: msg`Create Auction`,
    icon: HammerIcon,
  },
];

export const NavLinks: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <ul className="flex space-x-4">
      {NAV_LINKS(lang).map(({ href, label, icon: Icon }) => (
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
  );
};
