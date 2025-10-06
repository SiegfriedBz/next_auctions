import { Trans } from "@lingui/react/macro";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonUppyDashboard = () => {
  return (
    <CardContent className="flex max-[476px]:flex-col [476px]:flex-row gap-4 [476px]:gap-6 items-center justify-center md:-mt-4">
      <Skeleton className="w-64 h-32 rounded-lg flex justify-center items-center">
        <Trans>Loading uploader...</Trans>
      </Skeleton>
      <Skeleton className="w-32 h-32 rounded-lg" />
    </CardContent>
  );
};
