import { Trans } from "@lingui/react/macro";
import {
  CalendarClockIcon,
  ClipboardCheckIcon,
  FileTextIcon,
  GemIcon,
  NotebookTextIcon,
} from "lucide-react";
import type { FC } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonButton } from "./skeleton-button";

export const SkeletonAuctionForm: FC = () => {
  return (
    <div className="text-muted-foreground">
      <div className="space-y-8">
        <div className="grid gap-2">
          <Label className="flex items-center gap-x-2">
            <FileTextIcon className="size-5" />
            <Trans>Title *</Trans>
          </Label>
          <Skeleton className="w-full h-10 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-x-2">
            <NotebookTextIcon className="size-5" />
            <Trans>Description *</Trans>
          </Label>
          <Skeleton className="w-full h-14 rounded-lg" />
          <Skeleton className="w-54 h-6 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="grid gap-2">
            <Label className="flex items-center gap-x-2">
              <GemIcon className="size-5" />
              <Trans>Starting Price *</Trans>
            </Label>
            <Skeleton className="@sm:max-w-2/3 @max-sm:w-full h-8 rounded-lg" />
            <Skeleton className="w-54 h-6 rounded-lg" />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-x-2">
              <ClipboardCheckIcon className="size-5" />
              <Trans>Category *</Trans>
            </Label>
            <Skeleton className="@sm:max-w-2/3 @max-sm:w-full h-8 rounded-lg" />
            <Skeleton className="w-54 h-6 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="grid gap-2">
            <Label className="flex items-center gap-x-2">
              <ClipboardCheckIcon className="size-5 text-muted-foreground" />
              <Trans>Status</Trans>
            </Label>
            <Skeleton className="@sm:max-w-1/2 @max-sm:w-full h-8 rounded-lg" />
            <Skeleton className="w-54 h-6 rounded-lg" />
          </div>

          <div className="grid gap-2">
            <Label className="flex items-center gap-x-2 text-muted-foreground">
              <CalendarClockIcon className="size-5 text-muted-foreground" />
              <Trans>End at</Trans>
            </Label>
            <Skeleton className="@sm:max-w-1/2 @max-sm:w-full h-8 rounded-lg" />
            <Skeleton className="w-54 h-6 rounded-lg" />
          </div>
        </div>

        <SkeletonButton className="max-sm:w-full flex justify-center items-center sm:justify-self-end sm:mr-5">
          <Trans>Update auction</Trans>
        </SkeletonButton>
      </div>
    </div>
  );
};
