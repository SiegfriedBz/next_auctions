import { Trans } from "@lingui/react/macro";
import { BookUserIcon, SquareUserRoundIcon } from "lucide-react";
import type { FC } from "react";
import { SkeletonUppyDashboard } from "@/app/_components/uppy/skeleton-uppy-dashboard";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonButton } from "../../../../../_components/skeletons/skeleton-button";

export const SkeletonProfileForm: FC = () => {
  return (
    <div className="text-muted-foreground">
      <div className="space-y-8">
        <div className="grid gap-2">
          <Label className="flex items-center gap-x-2">
            <BookUserIcon className="size-5" />
            <Trans>First name *</Trans>
          </Label>
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-x-2">
            <BookUserIcon className="size-5" />
            <Trans>Last name *</Trans>
          </Label>
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <Card>
          <CardHeader>
            <Label className="flex items-center gap-x-2">
              <SquareUserRoundIcon className="size-5" />
              <Trans>Upload your avatar</Trans>
            </Label>
          </CardHeader>
          <SkeletonUppyDashboard />
        </Card>

        <SkeletonButton className="max-sm:w-full flex justify-center items-center sm:justify-self-end sm:mr-5 pr-3">
          <Trans>Update my profile</Trans>
        </SkeletonButton>
      </div>
    </div>
  );
};
