import { Trans } from "@lingui/react/macro";
import { ArrowDownUpIcon } from "lucide-react";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuerySortSelect } from "../select/query-sort-select";

export const AuctionsTableSort: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <ArrowDownUpIcon size={16} className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <Trans>Sort auctions</Trans>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <QuerySortSelect />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
