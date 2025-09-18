import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { HammerIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

type NavLink = { href: string; label: MessageDescriptor; icon: LucideIcon };

const NAV_LINKS: NavLink[] = [
  {
    href: "/auctions",
    label: msg`Auctions`,
    icon: HammerIcon,
  },
  {
    href: "/auctions/new",
    label: msg`Create Auction`,
    icon: HammerIcon,
  },
];
export const NavLinks: FC = () => {
  const { i18n } = useLingui();

  return NAV_LINKS.map((link) => {
    const { href, label, icon } = link;
    const Icon = icon;

    return (
      <li key={href}>
        <Link href={href} className="flex space-x-2 items-center">
          <Icon />
          <span>{i18n._(label)}</span>
        </Link>
      </li>
    );
  });
};
