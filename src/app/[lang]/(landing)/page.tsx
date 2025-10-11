import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";
import { type FC, Suspense } from "react";
import { AuctionsStatsServer } from "@/app/_components/auctions/auctions-stats-server";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { searchParamsCache } from "@/app/[lang]/search.params";
import { Button } from "@/components/ui/button";
import { type LangParam, withI18n } from "@/i18n";
import { SkeletonTable } from "../../_components/skeletons/skeleton-table";
import { Hero } from "./_components/hero";
import { LandingAuctionsTableServer } from "./_components/landing-auctions-table-server";

type Params = LangParam;

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

const Page: FC<Props> = async (props) => {
  const { lang } = await props.params;
  searchParamsCache.parse(await props.searchParams);

  return (
    <main className="flex flex-col gap-4">
      <section className="w-full">
        <Hero />
      </section>

      <section className="w-full mt-8 mb-4 scroll-mt-8" id="stats">
        <Suspense fallback={<SkeletonAuctionsStats />}>
          <AuctionsStatsServer />
        </Suspense>
      </section>

      <section className="w-full container mx-auto mt-12 space-y-8 min-h-[88svh]">
        <Suspense fallback={<SkeletonTable />}>
          <LandingAuctionsTableServer />
        </Suspense>

        <div className="flex justify-center">
          <Button asChild size="lg" className="max-sm:w-full">
            <Link href={`/${lang}/auctions`}>
              <Trans>Browse Auctions</Trans>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default withI18n(Page);
