import { Trans } from "@lingui/react/macro";
import { BookUserIcon } from "lucide-react";
import type { FC } from "react";
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
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-x-2">
            <BookUserIcon className="size-5" />
            <Trans>Last name *</Trans>
          </Label>
          <Skeleton className="w-full h-14 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <SkeletonButton className="max-sm:w-full flex justify-center items-center sm:justify-self-end sm:mr-5">
          <Trans>Update my profile</Trans>
        </SkeletonButton>
      </div>
    </div>
  );
};
