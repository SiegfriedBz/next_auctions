import { Trans } from "@lingui/react/macro";
import {
  CalendarCheck2Icon,
  CalendarClockIcon,
  CoinsIcon,
  GemIcon,
  NotebookTextIcon,
  TrophyIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { FC } from "react";
import { AuctionCarousel } from "@/app/_components/auctions/auction-carousel";
import { AuctionCategoryBadge } from "@/app/_components/auctions/auction-category-badge";
import { AuctionStatusBadge } from "@/app/_components/auctions/auction-status-badge";
import { BidDialog } from "@/app/_components/bids/bid-dialog";
import { FormatCurrency } from "@/app/_components/format-currency";
import { FormatDate } from "@/app/_components/format-date";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type Auction,
  type AuctionDetails,
  AuctionStatusSchema,
} from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

export const AuctionDetailsServer: FC<Props> = async (props) => {
  const { id, lang } = await props.params;

  const [me, auction] = await Promise.all([
    users().me(),
    auctions().detailsById(id),
  ]);

  if (!me) {
    redirect(`/${lang}`);
  }

  if (!auction) {
    return notFound();
  }

  const meIsHighestBidder = me.id === auction.highestBidderId;

  return (
    <>
      <AuctionHeaderCard
        auction={auction}
        meIsHighestBidder={meIsHighestBidder}
      />

      <Card>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <AuctionCarousel urls={auction.images} />
          </div>

          <div className="flex flex-col space-y-6">
            <AuctionDescription description={auction.description} />
            <AuctionDetailsList auction={auction} />
            <AuctionActions auction={auction} me={me} lang={lang} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// ---------- AuctionHeaderCard ----------
type AuctionHeaderCardProps = {
  auction: AuctionDetails;
  meIsHighestBidder: boolean;
};
const AuctionHeaderCard: FC<AuctionHeaderCardProps> = (props) => {
  const {
    auction: { title, category, owner, highestBid, status },
    meIsHighestBidder = false,
  } = props;

  return (
    <Card>
      <CardHeader>
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
                  <Trans>Current Bid</Trans>
                </span>

                <span className="font-bold text-primary">
                  <FormatCurrency value={highestBid ?? null} />
                </span>
              </div>

              {meIsHighestBidder && (
                <div className="flex items-center gap-2">
                  <TrophyIcon className="size-4 text-amber-500" />
                  <Trans>You are the Highest Bidder</Trans>
                </div>
              )}
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <CoinsIcon className="size-5 text-amber-500" />
                <span className="whitespace-nowrap">
                  <Trans>Current Bid</Trans>:
                </span>

                <span className="font-bold text-primary">
                  <FormatCurrency value={highestBid ?? null} />
                </span>
              </div>
              {meIsHighestBidder && (
                <div className="flex items-center gap-2">
                  <TrophyIcon className="size-4 text-amber-500" />
                  <Trans>You are the Highest Bidder</Trans>
                </div>
              )}
            </div>
            <AuctionStatusBadge status={status} />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

// ---------- AuctionDescription ----------
const AuctionDescription: FC<{ description: string | null }> = ({
  description,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-x-2">
      <NotebookTextIcon className="size-5" />
      <Trans>Description</Trans>
    </div>
    {description ? (
      <p className="max-w-full h-16 sm:h-20 overflow-x-auto overflow-y-auto text-sm leading-relaxed text-muted-foreground pr-2 scrollbar-thin">
        {description}
      </p>
    ) : (
      <p className="italic text-muted-foreground">
        <Trans>No description provided.</Trans>
      </p>
    )}
  </div>
);

// ---------- AuctionDetailsList ----------
const AuctionDetailsList: FC<{ auction: AuctionDetails }> = ({ auction }) => (
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
        <Trans>Current Bid</Trans>:
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
        <Trans>Ends</Trans>:
      </span>
      <FormatDate value={auction.endAt ?? null} />
    </div>
  </div>
);

// ---------- AuctionActions ----------
const AuctionActions: FC<{
  auction: AuctionDetails;
  me: { id: string };
  lang: string;
}> = ({ auction, me, lang }) => {
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
            <Button asChild variant="outline">
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
