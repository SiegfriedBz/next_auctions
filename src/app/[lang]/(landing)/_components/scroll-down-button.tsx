"use client";

import { CircleArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { type FC, useEffect, useState } from "react";
import type { LangParam } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = LangParam;

export const ScrollDownButton: FC<Props> = (props) => {
  const { lang } = props;

  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link
      href={`/${lang}#stats`}
      className={cn(
        "mb-1 flex animate-bounce opacity-75 transition-opacity duration-200 cursor-pointer",
        {
          "opacity-0 pointer-events-none": !isVisible,
        },
      )}
    >
      <CircleArrowDownIcon size={24} />
    </Link>
  );
};
