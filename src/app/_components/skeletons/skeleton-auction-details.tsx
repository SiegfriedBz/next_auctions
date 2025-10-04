import { Trans } from "@lingui/react/macro";
import {
  CalendarCheck2Icon,
  CalendarClockIcon,
  CoinsIcon,
  GemIcon,
  NotebookTextIcon,
} from "lucide-react";
import type { FC } from "react";
import { SkeletonAvatar } from "@/app/_components/skeletons/skeleton-avatar";
import { SkeletonBadge } from "@/app/_components/skeletons/skeleton-badge";
import { SkeletonButton } from "@/app/_components/skeletons/skeleton-button";
import { SkeletonCarousel } from "@/app/_components/skeletons/skeleton-carousel";
import { SkeletonDescription } from "@/app/_components/skeletons/skeleton-description";
import { SkeletonH4 } from "@/app/_components/skeletons/skeleton-h4";
import { SkeletonTitle } from "@/app/_components/skeletons/skeleton-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SkeletonAuctionDetails: FC = () => {
  return (
    <>
      <AuctionHeaderCardSkeleton />

      <Card className="text-muted-foreground">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center max-sm:my-1">
            <SkeletonCarousel />
          </div>

          <div className="flex flex-col space-y-6">
            <AuctionDescriptionSkeleton />
            <AuctionDetailsListSkeleton />
            <AuctionActionsSkeleton />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const AuctionHeaderCardSkeleton: FC = () => {
  return (
    <Card className="text-muted-foreground">
      <CardHeader>
        <CardTitle className="flex justify-between items-start h-full">
          <div className="flex flex-col gap-2 max-sm:gap-4">
            <SkeletonTitle />

            <div className="flex gap-x-4 items-center">
              <SkeletonBadge className="bg-amber-400 my-1" />
              <div className="sm:hidden">
                <SkeletonBadge className="bg-blue-400" />
              </div>
            </div>

            <div className="mt-2">
              <SkeletonAvatar />
            </div>

            <div className="sm:hidden flex items-center gap-2 text-lg font-medium">
              <CoinsIcon className="size-4 text-amber-500" />
              <Trans>Current Bid</Trans>:
              <span className="font-bold text-primary">
                <SkeletonH4 />
              </span>
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            <div className="flex items-center gap-2 text-lg font-medium">
              <CoinsIcon className="size-5 text-amber-500" />
              <Trans>Current Bid</Trans>:
              <span className="font-bold text-primary">
                <SkeletonH4 />
              </span>
            </div>
            <SkeletonBadge className="bg-blue-400" />
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const AuctionDescriptionSkeleton: FC = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-x-2">
      <NotebookTextIcon className="size-5" />
      <Trans>Description</Trans>
    </div>
    <div className="space-y-2 h-16 sm:h-22">
      <SkeletonDescription className="w-full h-4" />
      <SkeletonDescription className="w-3/4 h-4" />
      <SkeletonDescription className="w-1/2 h-4" />
    </div>
  </div>
);

const AuctionDetailsListSkeleton: FC = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <GemIcon className="size-4 text-muted-foreground" />
      <span className="font-medium">
        <Trans>Starting Price</Trans>:
      </span>
      <SkeletonH4 />
    </div>

    <div className="flex items-center gap-2">
      <CoinsIcon className="size-4 text-amber-500" />
      <span className="text-lg font-medium">
        <Trans>Current Bid</Trans>:
      </span>
      <span className="text-xl font-bold text-primary">
        <SkeletonH4 />
      </span>
    </div>

    <div className="flex items-center gap-2">
      <CalendarCheck2Icon className="size-4 text-muted-foreground" />
      <span className="font-medium">
        <Trans>Started</Trans>:
      </span>
      <SkeletonH4 />
    </div>

    <div className="flex items-center gap-2">
      <CalendarClockIcon className="size-4 text-muted-foreground" />
      <span className="font-medium">
        <Trans>Ends</Trans>:
      </span>
      <SkeletonH4 />
    </div>
  </div>
);

const AuctionActionsSkeleton: FC = () => {
  return (
    <div className="flex w-fit ml-auto mt-auto">
      <SkeletonButton />
    </div>
  );
};
