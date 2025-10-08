import { Trans } from "@lingui/react/macro";
import { ListFilterIcon } from "lucide-react";
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
import { QueryCategorySelect } from "../select/query-category-select";
import { QueryStatusSelect } from "../select/query-status-select";

export const AuctionsTableFilter: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <ListFilterIcon size={16} className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <Trans>Filter auctions</Trans>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 grid w-fit gap-2 grid-cols-1 sm:grid-cols-2">
        <DropdownMenuItem asChild>
          <QueryCategorySelect />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <QueryStatusSelect />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
