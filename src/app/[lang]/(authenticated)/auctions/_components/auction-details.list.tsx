import { Trans } from "@lingui/react/macro";
import {
  CalendarCheck2Icon,
  CalendarClockIcon,
  CoinsIcon,
  GemIcon,
} from "lucide-react";
import type { FC } from "react";
import { FormatCurrency } from "@/app/_components/format-currency";
import { FormatDate } from "@/app/_components/format-date";
import type { AuctionDetails } from "@/core/domains/auction";

type Props = { auction: AuctionDetails };

export const AuctionDetailsList: FC<Props> = (props) => {
  const { auction } = props;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <GemIcon className="size-4 text-muted-foreground" />
        <span className="font-medium">
          <Trans>Starting Price</Trans>:
        </span>
        <FormatCurrency value={auction.startingPrice} />
      </div>

      <div className="flex items-center gap-2">
        <CoinsIcon className="size-4 text-amber-500" />
        <span className="font-medium">
          <Trans>Highest Bid</Trans>:
        </span>
        <span className="text-lg font-bold text-primary">
          <FormatCurrency value={auction.highestBid ?? null} />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <CalendarCheck2Icon className="size-4 text-muted-foreground" />
        <span className="font-medium">
          <Trans>Started</Trans>:
        </span>
        <FormatDate value={(auction.startedAt || auction.createdAt) ?? null} />
      </div>

      <div className="flex items-center gap-2">
        <CalendarClockIcon className="size-4 text-muted-foreground" />
        <span className="font-medium">
          {auction.endAt && auction.endAt.getTime() < Date.now() ? (
            <Trans>Ended</Trans>
          ) : (
            <Trans>Ends</Trans>
          )}
        </span>
        <FormatDate value={auction.endAt ?? null} />
      </div>
    </div>
  );
};
