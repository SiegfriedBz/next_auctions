import type { SearchParams } from "nuqs/server";
import { type FC, Suspense } from "react";
import { AuctionsStatsServer } from "@/app/_components/auctions/auctions-stats-server";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { SkeletonTable } from "@/app/_components/skeletons/skeleton-table";
import { searchParamsCache } from "@/app/[lang]/search.params";
import { type LangParam, withI18n } from "@/i18n";
import { AuctionsTableServer } from "../_components/auctions-table-server";

type Params = LangParam;

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

const Page: FC<Props> = async (props) => {
  searchParamsCache.parse(await props.searchParams);

  return (
    <div className="w-full container mx-auto space-y-12 py-4">
      <section className="w-full">
        <Suspense fallback={<SkeletonAuctionsStats isMyAuctionsPage />}>
          <AuctionsStatsServer isMyAuctionsPage />
        </Suspense>
      </section>

      <section className="w-full">
        <Suspense fallback={<SkeletonTable />}>
          <AuctionsTableServer isMyAuctionsPage />
        </Suspense>
      </section>
    </div>
  );
};

export default withI18n(Page);
