"use client";

import type { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { useQueryStates } from "nuqs";
import { useCallback, useMemo } from "react";
import { paginationParsers } from "@/app/[lang]/search.params";

export const usePagination = () => {
  const [query, setQuery] = useQueryStates({
    page: paginationParsers.pageIndex,
    size: paginationParsers.pageSize,
  });

  // shape expected by TanStack
  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex: query.page,
      pageSize: query.size,
    }),
    [query.page, query.size],
  );

  // TanStack will call this when user clicks next/previous
  const onPaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      const current: PaginationState = {
        pageIndex: query.page,
        pageSize: query.size,
      };

      // resolve next state from updater
      const next =
        typeof updater === "function" ? updater(current) : (updater ?? current);

      // guard if no change
      if (
        next.pageIndex === current.pageIndex &&
        next.pageSize === current.pageSize
      ) {
        return;
      }

      // else, write to URL
      setQuery({
        page: next.pageIndex,
        size: next.pageSize,
      });
    },
    [query.page, query.size, setQuery],
  );

  return { pagination, onPaginationChange };
};
