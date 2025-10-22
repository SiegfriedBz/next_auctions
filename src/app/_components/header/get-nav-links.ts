import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import {
  CircleDollarSignIcon,
  CirclePlusIcon,
  GavelIcon,
  type LucideIcon,
  ShieldHalfIcon,
  UserRoundCheckIcon,
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
    icon: GavelIcon,
  },
  {
    href: `/${lang}/auctions/new`,
    title: msg`Create auction`,
    icon: CirclePlusIcon,
  },
];

export const getUserNavLinks: (lang: string) => NavLink[] = (lang) => [
  {
    href: `/${lang}/profile`,
    title: msg`My Profile`,
    icon: UserRoundCheckIcon,
  },
  {
    href: `/${lang}/my-payments`,
    title: msg`My payments`,
    icon: CircleDollarSignIcon,
  },
  {
    href: `/${lang}/auctions/me`,
    title: msg`My Auctions`,
    icon: ShieldHalfIcon,
  },
];
