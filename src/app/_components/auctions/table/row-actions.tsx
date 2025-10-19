"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { CoinsIcon, EyeIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { type FC, useCallback, useMemo, useState } from "react";
import { BidDialog } from "@/app/_components/bids/bid-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Auction, AuctionStatusSchema } from "@/core/domains/auction";

type Props = {
  meId?: string;
  auction: Auction;
};
export const RowAction: FC<Props> = (props) => {
  const { meId, auction } = props;

  const [open, setIsOpen] = useState<boolean>(false);

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const isMyAuction = useMemo(() => {
    return meId === auction.ownerId;
  }, [meId, auction]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isOpenedAuction = auction.status === AuctionStatusSchema.enum.OPEN;

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          onClick={(e) => e.stopPropagation()}
          className="relative h-8 w-8 p-0 z-50 rounded-full border-2 border-border cursor-pointer"
        >
          <span className="sr-only">
            <Trans>Open menu</Trans>
          </span>
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Button asChild variant="ghost" className="w-full cursor-pointer">
            <Link
              href={`/${lang}/auctions/${auction.id}`}
              className="flex items-center justify-between"
            >
              <EyeIcon className="size-4" />
              <Trans>View auction</Trans>
            </Link>
          </Button>
        </DropdownMenuItem>

        {!isMyAuction && isOpenedAuction && (
          <DropdownMenuItem asChild>
            <BidDialog
              auction={auction}
              handleCloseCaller={onClose}
              className="w-full flex items-center justify-between"
              variant={"ghost"}
            >
              <CoinsIcon className="size-4" />
              <Trans>Bid on auction</Trans>
            </BidDialog>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
