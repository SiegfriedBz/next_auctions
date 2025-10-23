"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Button>;

export const AuctionsCreateButton: FC<Props> = (props) => {
  const { disabled, ...rest } = props;
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  if (disabled) {
    return (
      <>
        <DisabledBtn {...rest} className="sm:hidden" />

        <span className="max-sm:hidden ">
          <Tooltip>
            <TooltipTrigger asChild>
              <DisabledBtn {...rest} />
            </TooltipTrigger>
            <TooltipContent>
              <Trans>Please log in to create auctions.</Trans>
            </TooltipContent>
          </Tooltip>
        </span>
      </>
    );
  }

  return (
    <Button {...rest} type="button" variant="outline">
      <Link href={`/${lang}/auctions/new`}>
        <Trans>Create Auction</Trans>
      </Link>
    </Button>
  );
};

const DisabledBtn: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <Button
      {...rest}
      type="button"
      variant="outline"
      className={cn(className, "text-muted-foreground cursor-not-allowed")}
      aria-disabled={true}
    >
      <Trans>Create Auction</Trans>
    </Button>
  );
};
