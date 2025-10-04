"use client";

import { Trans } from "@lingui/react/macro";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type FC, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeT = "dark" | "light" | "system";

type Props = {
  onCloseParent?: () => void;
  className?: string;
};

export const ThemeToggleButton: FC<Props> = (props) => {
  const { onCloseParent = undefined, className } = props;
  const { setTheme } = useTheme();

  const onToggleTo = useCallback(
    (to: ThemeT) => {
      setTheme(to);
      onCloseParent?.();
    },
    [setTheme, onCloseParent],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button
          variant="ghost"
          className="cursor-pointer w-full rounded-md flex items-center gap-x-2 px-2"
        >
          <span className="inline-flex relative w-10 h-10">
            <Sun className="absolute top-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
            <Moon className="absolute top-1/2 -translate-y-1/2  h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
          </span>
          <Trans>Toggle theme</Trans>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onToggleTo("light")}>
          <Trans>Light</Trans>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleTo("dark")}>
          <Trans>Dark</Trans>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleTo("system")}>
          <Trans>System</Trans>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
