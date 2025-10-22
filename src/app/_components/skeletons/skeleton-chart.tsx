import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "../typography/h2";
import { SkeletonH4 } from "./skeleton-h4";

type Props = {
  title: string;
};
export const SkeletonChart: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TypographyH2>{title}</TypographyH2>
        </CardTitle>

        <CardDescription>
          <SkeletonH4 />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full min-h-[32svh] sm:min-h-[54svh] lg:min-h-[76svh]" />
      </CardContent>
    </Card>
  );
};
