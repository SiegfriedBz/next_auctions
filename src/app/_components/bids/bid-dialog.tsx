"use client";

import { Trans } from "@lingui/react/macro";
import type { VariantProps } from "class-variance-authority";
import { type FC, type PropsWithChildren, useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, type buttonVariants } from "@/components/ui/button";
import type { Auction } from "@/core/domains/auction";
import { cn } from "@/lib/utils";
import { AuctionCategoryBadge } from "../auctions/auction-category-badge";
import { BidForm } from "./bid-form";

type AuctionForBidding = Pick<
  Auction,
  "id" | "title" | "category" | "highestBid"
>;

type Props = {
  auction: AuctionForBidding;
  handleCloseCaller?: () => void;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export const BidDialog: FC<PropsWithChildren<Props>> = (props) => {
  const {
    auction,
    handleCloseCaller = undefined,
    variant,
    className,
    children = <Trans>Bid</Trans>,
  } = props;

  const [open, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
    handleCloseCaller?.();
  }, [handleCloseCaller]);

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} className={cn("cursor-pointer", className)}>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans>Place your bid</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-y-1">
            {auction.title}
            <AuctionCategoryBadge
              category={auction.category}
              className="px-2 py-0.5 text-xs"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <BidForm auction={auction} handleCloseCaller={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
