import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  HammerIcon,
  type LucideIcon,
  PlusIcon,
  ShieldHalfIcon,
  UserRoundCheckIcon,
  UserRoundIcon,
} from "lucide-react";

type NavLink = {
  href: string;
  title: MessageDescriptor;
  icon: LucideIcon;
};

export const getAuctionsNavLinks: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/auctions`,
    title: msg`Auctions`,
    icon: HammerIcon,
  },
  {
    href: `/${lang}/auctions/new`,
    title: msg`Create auction`,
    icon: PlusIcon,
  },
];

export const getUserNavLinks: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/profile`,
    title: msg`My Profile`,
    icon: UserRoundCheckIcon,
  },
  {
    href: `/${lang}/auctions/me`,
    title: msg`My Auctions`,
    icon: ShieldHalfIcon,
  },
];
