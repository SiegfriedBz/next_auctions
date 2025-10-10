"use client";

import { CircleArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { type FC, useCallback, useState } from "react";
import type { LangParam } from "@/i18n";
import { cn } from "@/lib/utils";

type Props = LangParam;

export const ScrollDownButton: FC<Props> = (props) => {
  const { lang } = props;

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const onHide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <Link
      onClick={onHide}
      href={`/${lang}#stats`}
      className={cn("mb-1 flex animate-bounce opacity-75 cursor-pointer", {
        "opacity-0 pointer-events-none": !isVisible,
      })}
    >
      <CircleArrowDownIcon size={24} />
    </Link>
  );
};
