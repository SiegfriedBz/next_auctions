import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC, Suspense } from "react";
import { AuctionsStatsData } from "@/app/_components/auctions/auctions-stats-data";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { UserAvatar } from "@/app/_components/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/core/instances/users";
import type { LangParam } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

export const ProfileData: FC<Props> = async (props) => {
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
            <Trans>User profile card</Trans>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid lg:grid-cols-2 gap-4 items-center">
          <UserAvatar
            user={me}
            className="gap-x-4"
            avatarClassName="-ms-3 size-24 sm:size-26 md:size-32 rounded-md"
          />

          <Suspense fallback={<SkeletonAuctionsStats isMe />}>
            <AuctionsStatsData
              isMe
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
