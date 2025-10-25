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
import { SkeletonCarousel } from "@/app/_components/skeletons/skeleton-carousel";
import { SkeletonTitle } from "@/app/_components/skeletons/skeleton-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH4 } from "../typography/h4";
import { SkeletonH5 } from "./skeleton-h5";

export const SkeletonAuctionDetails: FC = () => {
  return (
    <>
      <AuctionHeaderCardSkeleton />

      <Card className="text-muted-foreground">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <SkeletonCarousel />
          </div>

          <div className="flex flex-col gap-6 sm:py-2">
            <AuctionDescriptionSkeleton />
            <Separator className="mb-6" />
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
          <div className="flex flex-col gap-2 max-sm:gap-4 w-full">
            <SkeletonTitle className="w-44" />

            <div className="flex gap-x-4 items-center">
              <SkeletonBadge className="bg-amber-400 my-1" />
              <div className="sm:hidden">
                <SkeletonBadge className="bg-blue-400" />
              </div>
            </div>

            <div className="mt-2">
              <SkeletonAvatar />
            </div>

            <Separator className="sm:hidden mb-2 w-full" />
            <div className="sm:hidden flex items-center gap-2 text-lg font-medium">
              <CoinsIcon className="size-4 text-amber-500" />
              <TypographyH4 className="whitespace-nowrap">
                <Trans>Highest Bid</Trans>:
              </TypographyH4>
              <SkeletonH5 className="w-24" />
            </div>
            <SkeletonH5 className="sm:hidden w-54" />
          </div>

          <div className="max-sm:hidden flex flex-col justify-between items-end h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <CoinsIcon className="size-5 text-amber-500" />
                <TypographyH4 className="whitespace-nowrap">
                  <Trans>Highest Bid</Trans>:
                </TypographyH4>
                <SkeletonH5 className="w-24" />
              </div>
              <SkeletonH5 className="w-full" />
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
      <TypographyH4>
        <Trans>Description</Trans>
      </TypographyH4>
    </div>
    <div className="space-y-3 h-16 sm:h-22">
      <SkeletonH5 className="w-[92%]" />
      <SkeletonH5 className="w-[64%]" />
    </div>
  </div>
);

const AuctionDetailsListSkeleton: FC = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <GemIcon className="size-4 text-muted-foreground" />
      <TypographyH4 className="whitespace-nowrap">
        <Trans>Starting Price</Trans>:
      </TypographyH4>
      <SkeletonH5 className="sm:w-22 md:w-26" />
    </div>

    <div className="flex items-center gap-2">
      <CoinsIcon className="size-4 text-amber-500" />
      <TypographyH4 className="whitespace-nowrap">
        <Trans>Highest Bid</Trans>:
      </TypographyH4>
      <SkeletonH5 className="w-22 sm:w-26 md:w-30" />
    </div>

    <div className="flex items-center gap-2">
      <CalendarCheck2Icon className="size-4 text-muted-foreground" />
      <TypographyH4 className="whitespace-nowrap">
        <Trans>Started</Trans>:
      </TypographyH4>
      <SkeletonH5 className="w-29 sm:w-34 md:w-38" />
    </div>

    <div className="flex items-center gap-2">
      <CalendarClockIcon className="size-4 text-muted-foreground" />
      <TypographyH4 className="whitespace-nowrap">
        <Trans>Ends</Trans>:
      </TypographyH4>
      <SkeletonH5 className="w-34 sm:w-39 md:w-43" />
    </div>
  </div>
);

const AuctionActionsSkeleton: FC = () => {
  return (
    <div className="w-full mt-auto">
      <SkeletonBadge className="w-54 max-sm:mx-auto sm:ml-auto" />
    </div>
  );
};
