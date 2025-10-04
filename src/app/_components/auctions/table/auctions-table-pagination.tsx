"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuctionsTable } from "./hooks/use-auctions-table";

type Props = ComponentProps<"div">;

export const AuctionsTablePagination: FC<Props> = (props) => {
  const { className, ...rest } = props;

  const {
    getState,
    previousPage,
    nextPage,
    getCanPreviousPage,
    getCanNextPage,
  } = useAuctionsTable();

  const onPreviousPage = () => previousPage();
  const onNextPage = () => nextPage();

  const canPreviousPage = getCanPreviousPage();
  const canNextPage = getCanNextPage();

  const currentPage = getState().pagination.pageIndex + 1;

  return (
    <div
      {...rest}
      className={cn(
        "mx-auto flex items-center gap-1 justify-center",
        className,
      )}
    >
      <Button
        onClick={onPreviousPage}
        disabled={!canPreviousPage}
        variant={"outline"}
        className={cn({
          "cursor-pointer": canPreviousPage,
        })}
      >
        <ChevronLeftIcon />
      </Button>

      <Badge variant="outline" className="mx-4 rounded-full text-lg">
        {currentPage}
      </Badge>

      <Button
        onClick={onNextPage}
        disabled={!canNextPage}
        variant={"outline"}
        className={cn("", {
          "cursor-pointer": canNextPage,
        })}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
