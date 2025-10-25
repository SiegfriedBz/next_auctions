import { Trans } from "@lingui/react/macro";
import {
  CalendarClockIcon,
  CoinsIcon,
  HourglassIcon,
  TrophyIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { AuctionCarousel } from "@/app/_components/auctions/auction-carousel";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import { BidDialog } from "@/app/_components/bids/bid-dialog";
import { FormatCurrency } from "@/app/_components/format-currency";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyH4 } from "@/app/_components/typography/h4";
import { TypographyH5 } from "@/app/_components/typography/h5";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type Auction,
  type AuctionDetails,
  type AuctionStatus,
  AuctionStatusSchema,
} from "@/core/domains/auction";
import type { User } from "@/core/domains/user";
import { auctions } from "@/core/instances/auctions";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";
import { AuctionDescription } from "./auction-description";
import { AuctionDetailsList } from "./auction-details.list";
import { InitiatePaymentButton } from "./initiate-payment.button";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

export const AuctionDetailsServer: FC<Props> = async (props) => {
  const { id, lang } = await props.params;

  await new Promise((res) => setTimeout(res, 5_000));

  const [me, auction] = await Promise.all([
    users().me(),
    auctions().detailsById(id),
  ]);

  if (!auction) {
    return notFound();
  }

  const meIsHighestBidder = me?.id === auction.highestBidderId;

  return (
    <>
      <AuctionHeaderCard
        auction={auction}
        meIsHighestBidder={meIsHighestBidder}
        lang={lang}
      />

      <AuctionDetailsCard me={me} auction={auction} lang={lang} />
    </>
  );
};

// ---------- AuctionHeaderCard ----------
type AuctionHeaderCardProps = {
  auction: AuctionDetails;
  meIsHighestBidder: boolean;
} & LangParam;
const AuctionHeaderCard: FC<AuctionHeaderCardProps> = (props) => {
  const {
    auction: {
      id: auctionId,
      title,
      category,
      owner,
      highestBid,
      status,
      paidAt,
      endAt,
    },
    meIsHighestBidder = false,
    lang,
  } = props;

  const isPaid = paidAt != null;

  return (
    <Card>
      <CardHeader>
        {isPaid}
        <CardTitle className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-2 max-sm:gap-4 flex-1 min-w-0">
            <TypographyH2 className="border-0 capitalize truncate max-w-64 lg:max-w-[564px]">
              {title}
            </TypographyH2>
            <div className="flex gap-x-4 items-center">
              <AuctionCategoryBadge category={category} />
              <div className="sm:hidden">
                <AuctionStatusBadge status={status} />
              </div>
            </div>

            <div className="-ms-3 mt-2">
              {owner && <UserAvatar user={owner} />}
            </div>

            <Separator className="sm:hidden mb-2" />
            <div className="sm:hidden flex flex-col gap-4 text-lg font-medium">
              <HighestBidAndStatus
                auctionId={auctionId}
                status={status}
                isPaid={isPaid}
                highestBid={highestBid}
                meIsHighestBidder={meIsHighestBidder}
                endAt={endAt}
                lang={lang}
              />
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            <div className="flex flex-col gap-4">
              <HighestBidAndStatus
                auctionId={auctionId}
                status={status}
                isPaid={isPaid}
                highestBid={highestBid}
                meIsHighestBidder={meIsHighestBidder}
                endAt={endAt}
                lang={lang}
              />
            </div>
            <AuctionStatusBadge status={status} />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

// ---------- HighestBidAndStatus ----------
type HighestBidAndStatusProps = {
  auctionId: string;
  status: AuctionStatus;
  isPaid: boolean;
  highestBid: number | undefined;
  meIsHighestBidder: boolean;
  endAt: Date | undefined;
} & LangParam;

const HighestBidAndStatus: FC<HighestBidAndStatusProps> = (props) => {
  const {
    auctionId,
    status,
    isPaid,
    highestBid,
    meIsHighestBidder,
    endAt,
    lang,
  } = props;

  const isClosed = status === AuctionStatusSchema.enum.CLOSED;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <CoinsIcon className="size-4 text-amber-500" />
        <TypographyH4 className="whitespace-nowrap">
          <Trans>Highest Bid</Trans>:
        </TypographyH4>
        <TypographyH5>
          <FormatCurrency value={highestBid ?? null} />
        </TypographyH5>
      </div>

      <UserAuctionStatus
        meIsHighestBidder={meIsHighestBidder}
        isPaid={isPaid}
        isClosed={isClosed}
        endAt={endAt}
        auctionId={auctionId}
        lang={lang}
      />
    </>
  );
};

// ---------- AuctionDetailsCard ----------
type AuctionDetailsCardProps = {
  me: User | null;
  auction: AuctionDetails;
} & LangParam;

const AuctionDetailsCard: FC<AuctionDetailsCardProps> = (props) => {
  const { me, auction, lang } = props;

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:py-2">
        <div className="flex justify-center items-center">
          <AuctionCarousel urls={auction.images} />
        </div>

        <div className="flex flex-col space-y-4">
          <AuctionDescription description={auction.description} />
          <Separator className="mb-6" />
          <AuctionDetailsList auction={auction} />

          {me ? (
            <AuctionActions auction={auction} me={me} lang={lang} />
          ) : (
            <div className="flex max-sm:justify-center items-center w-full sm:w-fit sm:ml-auto mt-auto gap-x-2">
              <Badge
                variant="secondary"
                className="px-2 py-0.5 sm:px-3 sm:py-1 font-bold text-foreground text-sm sm:text-base"
              >
                <Trans>Log in to access more features.</Trans>
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ---------- UserAuctionStatus ----------
type UserAuctionStatusProps = {
  auctionId: string;
  isPaid: boolean;
  isClosed: boolean;
  meIsHighestBidder: boolean;
  endAt: Date | undefined;
  lang: string;
};

const UserAuctionStatus: FC<UserAuctionStatusProps> = (props) => {
  const { auctionId, isPaid, isClosed, meIsHighestBidder, endAt, lang } = props;

  const hasEnded = endAt && endAt < new Date();

  if (meIsHighestBidder) {
    return (
      <div className="flex items-center gap-2">
        <TrophyIcon className="size-4 text-amber-500" />
        {isPaid ? (
          <TypographyH5>
            <Trans>You won and paid for this auction.</Trans>
          </TypographyH5>
        ) : isClosed ? (
          <InitiatePaymentButton auctionId={auctionId} lang={lang} />
        ) : (
          <TypographyH5>
            <Trans>You're currently the highest bidder!</Trans>
          </TypographyH5>
        )}
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="flex items-center gap-2">
        <CalendarClockIcon className="size-4" />
        <TypographyH5>
          <Trans>This auction has been won and paid for.</Trans>
        </TypographyH5>
      </div>
    );
  }

  if (isClosed || hasEnded) {
    return (
      <div className="flex items-center gap-2">
        <CalendarClockIcon className="size-4" />
        <TypographyH5>
          <Trans>This auction has ended.</Trans>
        </TypographyH5>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <HourglassIcon className="size-4" />
      <TypographyH5>
        <Trans>This auction is ongoing.</Trans>
      </TypographyH5>
    </div>
  );
};

// ---------- AuctionActions ----------
type AuctionActionsProps = {
  auction: AuctionDetails;
  me: { id: string };
  lang: string;
};

const AuctionActions: FC<AuctionActionsProps> = (props) => {
  const { auction, me, lang } = props;

  const isMyAuction = auction.ownerId === me.id;
  const isOpenedAuction = auction.status === AuctionStatusSchema.enum.OPEN;
  const isClosedAuction = auction.status === AuctionStatusSchema.enum.CLOSED;
  const isAuctionWithBid = auction.highestBid && auction.highestBid > 0;

  return (
    <div className="flex w-fit ml-auto mt-auto">
      {isMyAuction ? (
        <div className="flex items-center gap-x-2">
          <Badge
            variant="secondary"
            className="px-2 py-0.5 sm:px-3 sm:py-1 font-bold text-foreground text-sm sm:text-base"
          >
            <Trans>This is your auction</Trans>
          </Badge>
          {!isAuctionWithBid && !isClosedAuction && (
            <Button asChild>
              <Link href={`/${lang}/auctions/${auction.id}/edit`}>
                <Trans>Edit</Trans>
              </Link>
            </Button>
          )}
        </div>
      ) : isOpenedAuction ? (
        <BidDialog auction={auction} />
      ) : (
        <AuctionStatusBadge status={auction.status} />
      )}
    </div>
  );
};
