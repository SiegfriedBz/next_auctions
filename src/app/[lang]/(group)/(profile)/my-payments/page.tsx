import { useLingui } from "@lingui/react/macro";
import type { SearchParams } from "nuqs";
import { type FC, Suspense } from "react";
import { SkeletonChart } from "@/app/_components/skeletons/skeleton-chart";
import { SkeletonPaymentsStats } from "@/app/_components/skeletons/skeleton-payments-stats";
import { type LangParam, withI18n } from "@/i18n";
import { ProfileServer } from "../_components/profile-server";
import { SkeletonProfileCard } from "../_components/skeleton-profile-card";
import { PaymentsChartServer } from "./_components/payments-chart-server";
import { PaymentsStatsServer } from "./_components/payments-stats-server";
import { searchParamsCache } from "./search.params";

type Params = LangParam;

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

const Page: FC<Props> = async (props) => {
  searchParamsCache.parse(await props.searchParams);

  const { t } = useLingui();

  return (
    <div className="container sm:max-w-5xl mx-auto py-4 space-y-6">
      <Suspense
        fallback={
          <SkeletonProfileCard>
            <SkeletonPaymentsStats />
          </SkeletonProfileCard>
        }
      >
        <ProfileServer {...props}>
          <Suspense fallback={<SkeletonPaymentsStats />}>
            <PaymentsStatsServer className="grid md:grid-cols-2 items-center" />
          </Suspense>
        </ProfileServer>
      </Suspense>

      <Suspense
        fallback={
          <div className="flex flex-col gap-4 sm:gap-8">
            <SkeletonChart title={t`Payments you received`} />
            <SkeletonChart title={t`Payments you made`} />
          </div>
        }
      >
        <PaymentsChartServer />
      </Suspense>
    </div>
  );
};

export default withI18n(Page);
