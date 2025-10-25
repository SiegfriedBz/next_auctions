import { Trans } from "@lingui/react/macro";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonUppyDashboard = () => {
  return (
    <CardContent className="flex flex-col items-center justify-center">
      <Skeleton className="w-56 h-32 rounded-lg flex flex-col justify-start items-center">
        <div className="inline-block mt-6">
          <Trans>Drop files here or</Trans>
        </div>
        <div className="inline-block">
          <Trans>browse files</Trans>
        </div>
      </Skeleton>
      <Skeleton className="rounded-lg flex justify-center items-center size-48 md:size-72 mx-auto mt-4 sm:mt-8" />
    </CardContent>
  );
};
