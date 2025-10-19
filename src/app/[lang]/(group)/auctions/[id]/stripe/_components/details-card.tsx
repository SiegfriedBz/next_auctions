import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { AuctionCarousel } from "@/app/_components/auctions/auction-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AuctionDetails } from "@/core/domains/auction";
import type { LangParam } from "@/i18n";
import { AuctionDescription } from "../../../_components/auction-description";
import { AuctionDetailsList } from "../../../_components/auction-details.list";

type DetailsCardProps = {
  auction: AuctionDetails;
} & LangParam;

export const DetailsCard: FC<DetailsCardProps> = (props) => {
  const { auction, lang } = props;

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <AuctionCarousel urls={auction.images} />
        </div>

        <div className="flex flex-col space-y-6">
          <AuctionDescription description={auction.description} />
          <AuctionDetailsList auction={auction} />

          <div className="flex justify-end">
            <Button asChild>
              <Link href={`/${lang}/auctions`}>
                <Trans>Back to auctions</Trans>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
