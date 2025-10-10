import type { SearchParams } from "nuqs/server";
import { type FC, Suspense } from "react";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { SkeletonTable } from "@/app/_components/skeletons/skeleton-table";
import { searchParamsCache } from "@/app/[lang]/search.params";
import { type LangParam, withI18n } from "@/i18n";
import { AuctionsStatsData } from "../../../_components/auctions/auctions-stats-data";
import { AuctionsTableData } from "./_components/auctions-table-data";

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
        <Suspense fallback={<SkeletonAuctionsStats />}>
          <AuctionsStatsData />
        </Suspense>
      </section>

      <section className="w-full container mx-auto mt-12 space-y-8 min-h-[88svh]">
        <Suspense fallback={<SkeletonTable />}>
          <AuctionsTableData />
        </Suspense>
      </section>
    </div>
  );
};

export default withI18n(Page);
