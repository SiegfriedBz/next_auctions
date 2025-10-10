import { Trans, useLingui } from "@lingui/react/macro";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AuctionsTableFilter } from "./auctions-table-filter";
import { AuctionsTableSort } from "./auctions-table-sort";

type Props = ComponentProps<"div"> & {
  filteredCount: number;
  canCreate?: boolean;
};

export const AuctionsTableToolbar: FC<Props> = (props) => {
  const { filteredCount, canCreate = false, className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "relative flex w-fit items-center gap-x-6 border px-4 py-2 mb-6 rounded-md",
        className,
      )}
    >
      <AuctionsTableFilter />
      <AuctionsTableSort />
      {canCreate && <CreateAuctionButton />}
      <Badge
        className="absolute -right-5.5 -top-4.5 sm:-right-6 sm:-top-5 sm:text-sm"
        variant={"secondary"}
      >
        {filteredCount}
      </Badge>
    </div>
  );
};

const CreateAuctionButton: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href={`/${lang}/auctions/new`}>
          <CirclePlusIcon size={16} className="cursor-pointer" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <Trans>Create auction</Trans>
      </TooltipContent>
    </Tooltip>
  );
};
