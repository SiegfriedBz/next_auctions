import { useLingui } from "@lingui/react/macro";
import { notFound, redirect } from "next/navigation";
import type { FC } from "react";
import { UpdateAuctionForm } from "@/app/[lang]/(group)/auctions/[id]/edit/_components/update-auction-form";
import type { AuctionDetails } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import { getForbiddenNextStatuses } from "@/lib/get-forbidden-next-statuses";

type Props = {
  auctionId: string;
  meId: string;
};

export const UpdateAuctionFormServer: FC<Props> = async (props) => {
  const { auctionId, meId } = props;

  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  const auction: AuctionDetails | null =
    await auctions().detailsById(auctionId);

  if (!auction) {
    return notFound();
  }

  const isMyAuction = auction.ownerId === meId;
  const isAuctionWithBid = auction.highestBid && auction.highestBid > 0;

  if (!isMyAuction) {
    redirect(`/${lang}`);
  }

  if (isAuctionWithBid) {
    redirect(`/${lang}/auctions/${auction.id}`);
  }

  const defaultValues = {
    id: auction.id,
    title: auction.title,
    description: auction.description,
    startingPrice: auction.startingPrice,
    category: auction.category,
    endAt: auction.endAt,
    status: auction.status,
    storageId: auction.storageId,
    images: auction.images,
  };

  const excludedNextStatus = getForbiddenNextStatuses({
    status: auction.status,
    highestBid: auction.highestBid,
  });

  return (
    <UpdateAuctionForm
      defaultValues={defaultValues}
      excludedStatuses={excludedNextStatus}
    />
  );
};
