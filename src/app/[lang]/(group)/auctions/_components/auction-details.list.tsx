import { Trans } from "@lingui/react/macro";
import {
  CalendarCheck2Icon,
  CalendarClockIcon,
  CircleOffIcon,
  CoinsIcon,
  GemIcon,
} from "lucide-react";
import type { FC } from "react";
import { Countdown } from "@/app/_components/auctions/count-down";
import { FormatCurrency } from "@/app/_components/format-currency";
import { FormatDate } from "@/app/_components/format-date";
import { TypographyH4 } from "@/app/_components/typography/h4";
import { TypographyH5 } from "@/app/_components/typography/h5";
import {
  type AuctionDetails,
  AuctionStatusSchema,
} from "@/core/domains/auction";

type Props = { auction: AuctionDetails };

export const AuctionDetailsList: FC<Props> = (props) => {
  const { auction } = props;

  const isClosed = auction.status === AuctionStatusSchema.enum.CLOSED;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <GemIcon className="size-4 text-muted-foreground" />
        <TypographyH4 className="whitespace-nowrap">
          <Trans>Starting Price</Trans>:
        </TypographyH4>
        <TypographyH5>
          <FormatCurrency value={auction.startingPrice} />
        </TypographyH5>
      </div>

      <div className="flex items-center gap-2">
        <CoinsIcon className="size-4 text-amber-500" />
        <TypographyH4 className="whitespace-nowrap">
          <Trans>Highest Bid</Trans>:
        </TypographyH4>
        <TypographyH5>
          <FormatCurrency value={auction.highestBid ?? null} />
        </TypographyH5>
      </div>

      <div className="flex items-center gap-2">
        <CalendarCheck2Icon className="size-4 text-muted-foreground" />
        <TypographyH4 className="whitespace-nowrap">
          <Trans>Started</Trans>:
        </TypographyH4>
        <TypographyH5>
          <FormatDate value={auction.startedAt ?? null} />
        </TypographyH5>
      </div>

      {!isClosed && (
        <div className="flex flex-wrap items-center gap-2">
          <CalendarClockIcon className="size-4 text-muted-foreground" />
          {auction.endAt && auction.endAt.getTime() < Date.now() ? (
            <>
              <TypographyH4>
                <Trans>Ended</Trans>:{" "}
              </TypographyH4>
              <TypographyH5>
                <FormatDate value={auction.endAt ?? null} />
              </TypographyH5>
            </>
          ) : (
            <>
              <TypographyH4 className="whitespace-nowrap">
                <Trans>Ends in</Trans>:{" "}
              </TypographyH4>
              <TypographyH5>
                {auction.endAt ? (
                  <Countdown endDate={auction.endAt} />
                ) : (
                  <CircleOffIcon size={16} className="text-muted-foreground" />
                )}
              </TypographyH5>
            </>
          )}
        </div>
      )}
    </div>
  );
};
