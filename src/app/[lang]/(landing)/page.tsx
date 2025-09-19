import { type FC, Suspense } from "react";
import { type LangParam, withI18n } from "@/i18n";
import { SkeletonTable } from "../../_components/skeleton-table";
import { Hero } from "./_components/hero";
import { LandingDataStats } from "./_components/landing-data-stats";
import { LandingStatsSuspense } from "./_components/landing-stats-suspense";
import { AuctionsDataTable } from "./_components/table/auctions-data-table";

type Props = {
  params: Promise<LangParam>;
};

const Page: FC<Props> = async (_props) => {
  return (
    <main className="flex flex-col gap-4">
      <section className="h-[calc(100dvh-6rem)]">
        <Hero />
      </section>

      <section className="w-full">
        <LandingStatsSuspense>
          <LandingDataStats />
        </LandingStatsSuspense>
      </section>

      <section className="w-full container mx-auto py-10">
        <Suspense fallback={<SkeletonTable />}>
          <AuctionsDataTable />
        </Suspense>
      </section>
    </main>
  );
};

export default withI18n(Page);
