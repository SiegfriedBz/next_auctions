import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import type { AuctionCategory } from "@/core/domains/auction";
import { cn } from "@/lib/utils";
import {
  AuctionCategoryClassNames,
  AuctionCategoryToMessage,
} from "./message/auction-category-to-message";

type Props = {
  category: AuctionCategory;
  className?: string;
};

export const AuctionCategoryBadge: FC<Props> = (props) => {
  const {
    category,
    className = "px-3 py-1 font-bold text-md text-foreground",
  } = props;
  const { i18n } = useLingui();

  return (
    <Badge className={cn(AuctionCategoryClassNames[category], className)}>
      {i18n._(AuctionCategoryToMessage[category] as MessageDescriptor)}
    </Badge>
  );
};
