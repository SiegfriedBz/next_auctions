"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { useAuctionsTable } from "./hooks/use-auctions-table";

type Props = ComponentProps<typeof ButtonGroup>;

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
    <ButtonGroup
      {...rest}
      className={cn("mx-auto flex items-center justify-center", className)}
    >
      <ButtonGroup>
        <Button
          variant="outline"
          size="sm"
          aria-label="Previous"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
          className={cn({
            "cursor-pointer": canPreviousPage,
          })}
        >
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline" size="sm" aria-label="page" asChild>
          <span className="text-lg sm:text-xl">{currentPage}</span>
        </Button>
        <Button
          size="sm"
          aria-label="Next"
          onClick={onNextPage}
          disabled={!canNextPage}
          variant={"outline"}
          className={cn("", {
            "cursor-pointer": canNextPage,
          })}
        >
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
};
