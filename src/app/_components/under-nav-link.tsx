"use client";

import { usePathname } from "next/navigation";
import { type FC, useMemo } from "react";

type Props = {
  href: string;
};

export const UnderNavLink: FC<Props> = (props) => {
  const { href } = props;

  const path = usePathname();

  const isActive = useMemo(() => path?.startsWith(href), [path, href]);

  if (!isActive) return null;

  return (
    <div className="h-0.25 w-full dark:bg-gray-100 bg-primary rounded-full self-center" />
  );
};
