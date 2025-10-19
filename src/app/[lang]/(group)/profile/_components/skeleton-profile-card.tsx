import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import { SkeletonAuctionsStats } from "@/app/_components/skeletons/skeleton-auctions-stats";
import { SkeletonAvatar } from "@/app/_components/skeletons/skeleton-avatar";
import { SkeletonButton } from "@/app/_components/skeletons/skeleton-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SkeletonProfileCard: FC = () => {
  return (
    <>
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>
            <Trans>User profile card</Trans>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid lg:grid-cols-2 gap-4 items-center">
          <SkeletonAvatar className="size-24 sm:size-26 md:size-32 rounded-md" />

          <SkeletonAuctionsStats
            isMyAuctionsPage
            className="grid md:grid-cols-2 items-center"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex sm:justify-end h-8">
          <SkeletonButton className="h-8 w-full sm:min-w-32 sm:max-w-fit flex justify-center items-center">
            <Trans>Edit my profile</Trans>
          </SkeletonButton>
        </CardContent>
      </Card>
    </>
  );
};
