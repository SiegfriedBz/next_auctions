import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import type { AuctionStatus } from "@/core/domains/auction";
import { cn } from "@/lib/utils";
import {
  AuctionStatusClassNames,
  AuctionStatusToMessage,
} from "./message/auction-status-to-message";

type Props = {
  status: AuctionStatus;
  className?: string;
};

export const AuctionStatusBadge: FC<Props> = (props) => {
  const { status, className = "px-3 py-1 font-bold text-md text-foreground" } =
    props;
  const { i18n } = useLingui();

  return (
    <Badge className={cn(AuctionStatusClassNames[status], className)}>
      {i18n._(AuctionStatusToMessage[status] as MessageDescriptor)}
    </Badge>
  );
};
