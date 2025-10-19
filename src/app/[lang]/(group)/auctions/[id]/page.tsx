import { type FC, Suspense } from "react";
import { SkeletonAuctionDetails } from "@/app/_components/skeletons/skeleton-auction-details";
import type { Auction } from "@/core/domains/auction";
import { type LangParam, withI18n } from "@/i18n";
import { AuctionDetailsServer } from "../_components/auction-details-server";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  return (
    <div className="max-w-5xl flex flex-col gap-6 mx-auto pb-8">
      <Suspense fallback={<SkeletonAuctionDetails />}>
        <AuctionDetailsServer {...props} />
      </Suspense>
    </div>
  );
};

export default withI18n(Page);
