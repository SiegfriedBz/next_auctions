import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { type FC, Suspense } from "react";
import { AuctionsStatsServer } from "@/app/_components/auctions/auctions-stats-server";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type LangParam, withI18n } from "@/i18n";
import { ProfileServer } from "../_components/profile-server";
import { SkeletonProfileCard } from "../_components/skeleton-profile-card";

type Params = LangParam;

type Props = {
  params: Promise<Params>;
};

const Page: FC<Props> = async (props) => {
  const { lang } = await props.params;

  return (
    <div className="container sm:max-w-5xl mx-auto py-4 space-y-6">
      <Suspense
        fallback={
          <SkeletonProfileCard>
            <SkeletonAuctionsStats className="grid md:grid-cols-2 items-center" />
          </SkeletonProfileCard>
        }
      >
        <ProfileServer {...props}>
          <Suspense fallback={<SkeletonAuctionsStats />}>
            <AuctionsStatsServer className="grid md:grid-cols-2 items-center" />
          </Suspense>
        </ProfileServer>
      </Suspense>

      <ActionsCard lang={lang} />
    </div>
  );
};

export default withI18n(Page);

const ActionsCard: FC<LangParam> = (props) => {
  const { lang } = props;

  return (
    <Card>
      <CardContent className="flex max-sm:flex-col-reverse max-sm:gap-4 sm:justify-between">
        <div className="flex max-sm:flex-col gap-4">
          <Button asChild className="w-full sm:w-fit" variant={"secondary"}>
            <Link href={`/${lang}/my-payments`}>
              <Trans>My payments</Trans>
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-fit" variant={"secondary"}>
            <Link href={`/${lang}/auctions/me`}>
              <Trans>My Auctions</Trans>
            </Link>
          </Button>
        </div>

        <Button asChild className="w-full sm:w-fit">
          <Link href={`/${lang}/profile/edit`}>
            <Trans>Edit my profile</Trans>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
