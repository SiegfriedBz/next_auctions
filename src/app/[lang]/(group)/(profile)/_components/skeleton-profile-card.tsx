import { Trans } from "@lingui/react/macro";
import type { FC, PropsWithChildren } from "react";
import { SkeletonAvatar } from "@/app/_components/skeletons/skeleton-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SkeletonProfileCard: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <Card>
      <CardHeader className="sr-only">
        <CardTitle>
          <Trans>User profile card</Trans>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid lg:grid-cols-2 gap-4 items-center">
        <SkeletonAvatar className="size-24 sm:size-26 md:size-32 rounded-md" />
        {children}
      </CardContent>
    </Card>
  );
};
