import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Item = {
  title: MessageDescriptor;
  icon: LucideIcon;
};

type Props = {
  items: Item[];
  isMe?: boolean;
  className?: string;
};

export const SkeletonStats: FC<Props> = (props) => {
  const { items, isMe = false, className } = props;

  const { i18n } = useLingui();

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        {
          "lg:grid-cols-3": !isMe,
        },
        className,
      )}
    >
      {items.map((item) => {
        const { title, icon } = item;
        const Icon = icon;

        return (
          <Card key={i18n._(title)}>
            <CardContent className="flex-1 flex items-center justify-between gap-4">
              <div>
                <CardTitle>
                  <Skeleton className="h-8 w-12 mb-1 rounded-lg" />
                </CardTitle>
                {i18n._(title)}
              </div>
              <Icon size={42} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
