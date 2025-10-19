import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC, Suspense } from "react";
import { AuctionsStatsServer } from "@/app/_components/auctions/auctions-stats-server";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

export const ProfileServer: FC<Props> = async (props) => {
  const { lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}`);
  }

  return (
    <>
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>
            <TypographyH2>
              <Trans>User profile card</Trans>
            </TypographyH2>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid lg:grid-cols-2 gap-4 items-center">
          <UserAvatar
            user={me}
            className="gap-x-4"
            avatarClassName="-ms-3 size-24 sm:size-26 md:size-32 rounded-md"
          />

          <Suspense fallback={<SkeletonAuctionsStats isMyAuctionsPage />}>
            <AuctionsStatsServer
              isMyAuctionsPage
              className="grid md:grid-cols-2 items-center"
            />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex sm:justify-end">
          <Button asChild className="w-full sm:w-fit">
            <Link href={`/${lang}/profile/edit`}>
              <Trans>Edit my profile</Trans>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
