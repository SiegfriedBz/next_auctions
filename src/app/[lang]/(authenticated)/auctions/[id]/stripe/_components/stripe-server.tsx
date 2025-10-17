import { redirect } from "next/navigation";
import type { FC } from "react";
import type { AuctionDetails } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";
import { DetailsCard } from "./details-card";

type Params = {
  id: string;
} & LangParam;

type SearchParams = { sessionId: string };

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
} & {
  renderProp: ({
    auction,
    sessionId,
  }: {
    auction: AuctionDetails;
    sessionId: string;
  }) => React.ReactNode;
};

export const StripeServer: FC<Props> = async (props) => {
  const { params, searchParams, renderProp } = props;
  const { id: auctionId, lang } = await params;
  const { sessionId } = await searchParams;

  if (!sessionId) {
    redirect(`/${lang}/auctions/${auctionId}`);
  }

  const [me, auction] = await Promise.all([
    users().me(),
    auctions().detailsById(auctionId),
  ]);

  if (!me) redirect(`/${lang}`);
  if (!auction) redirect(`/${lang}/auctions`);

  return (
    <>
      {renderProp({ auction, sessionId })}
      <DetailsCard auction={auction} lang={lang} />
    </>
  );
};
