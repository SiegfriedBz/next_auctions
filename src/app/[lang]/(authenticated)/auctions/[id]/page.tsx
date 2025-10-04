import { type FC, Suspense } from "react";
import { SkeletonAuctionDetails } from "@/app/_components/skeletons/skeleton-auction-details";
import type { Auction } from "@/core/domains/auction";
import { type LangParam, withI18n } from "@/i18n";
import { AuctionDetailsData } from "./auction-details-data";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  return (
    <div className="max-w-5xl flex flex-col gap-6 mx-auto pb-8">
      <Suspense fallback={<SkeletonAuctionDetails />}>
        <AuctionDetailsData {...props} />
      </Suspense>
    </div>
  );
};

export default withI18n(Page);
