import { Trans } from "@lingui/react/macro";
import { CoinsIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";
import { AuctionCarousel } from "@/app/_components/auctions/auction-carousel";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import { BidDialog } from "@/app/_components/bids/bid-dialog";
import { FormatCurrency } from "@/app/_components/format-currency";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Auction,
  type AuctionDetails,
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
    },
    meIsHighestBidder = false,
    lang,
  } = props;

  const isClosed = status === AuctionStatusSchema.enum.CLOSED;
  const isPaid = paidAt != null;

  return (
    <Card>
      <CardHeader>
        {isPaid}
        <CardTitle className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-2 max-sm:gap-4">
            <h2 className="text-2xl font-semibold">{title}</h2>

            <div className="flex gap-x-4 items-center">
              <AuctionCategoryBadge category={category} />
              <div className="sm:hidden">
                <AuctionStatusBadge status={status} />
              </div>
            </div>

            <div className="-ml-4 mt-2">
              {owner && <UserAvatar user={owner} />}
            </div>

            <div className="sm:hidden flex flex-col gap-4 text-lg font-medium">
              <div className="flex flex-wrap items-center gap-2">
                <CoinsIcon className="size-4 text-amber-500" />
                <span className="whitespace-nowrap">
                  <Trans>Highest Bid</Trans>
                </span>

                <span className="font-bold text-primary">
                  <FormatCurrency value={highestBid ?? null} />
                </span>
              </div>

              <UserAuctionStatus
                meIsHighestBidder={meIsHighestBidder}
                isPaid={isPaid}
                isClosed={isClosed}
                auctionId={auctionId}
                lang={lang}
              />
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <CoinsIcon className="size-5 text-amber-500" />
                <span className="whitespace-nowrap">
                  <Trans>Highest Bid</Trans>:
                </span>

                <span className="font-bold text-primary">
                  <FormatCurrency value={highestBid ?? null} />
                </span>
              </div>

              <UserAuctionStatus
                meIsHighestBidder={meIsHighestBidder}
                isPaid={isPaid}
                isClosed={isClosed}
                auctionId={auctionId}
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

// ---------- AuctionDetailsCard ----------
type AuctionDetailsCardProps = {
  me: User | null;
  auction: AuctionDetails;
} & LangParam;

const AuctionDetailsCard: FC<AuctionDetailsCardProps> = (props) => {
  const { me, auction, lang } = props;

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <AuctionCarousel urls={auction.images} />
        </div>

        <div className="flex flex-col space-y-6">
          <AuctionDescription description={auction.description} />
          <AuctionDetailsList auction={auction} />

          {me ? (
            <AuctionActions auction={auction} me={me} lang={lang} />
          ) : (
            <div className="flex max-sm:justify-center items-center w-full sm:w-fit sm:ml-auto mt-auto gap-x-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
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
  meIsHighestBidder: boolean;
  isPaid: boolean;
  isClosed: boolean;
  auctionId: string;
  lang: string;
};

const UserAuctionStatus: FC<UserAuctionStatusProps> = (props) => {
  const { meIsHighestBidder, isPaid, isClosed, auctionId, lang } = props;

  if (meIsHighestBidder) {
    return (
      <div className="flex items-center gap-2">
        <TrophyIcon className="size-4 text-amber-500" />
        {isPaid ? (
          <Trans>You won and paid for this auction.</Trans>
        ) : isClosed ? (
          <InitiatePaymentButton auctionId={auctionId} lang={lang} />
        ) : (
          <Trans>You're currently the highest bidder!</Trans>
        )}
      </div>
    );
  }

  if (isPaid) {
    return <Trans>This auction has been won and paid for.</Trans>;
  }

  if (isClosed) {
    return <Trans>This auction has ended.</Trans>;
  }

  return <Trans>This auction is ongoing.</Trans>;
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
  const isAuctionWithBid = auction.highestBid && auction.highestBid > 0;

  return (
    <div className="flex w-fit ml-auto mt-auto">
      {isMyAuction ? (
        <div className="flex items-center gap-x-2">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            <Trans>This is your auction</Trans>
          </Badge>
          {!isAuctionWithBid && (
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
