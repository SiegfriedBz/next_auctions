"use client";

import { msg } from "@lingui/core/macro";
import { XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { type FC, useCallback } from "react";
import { filterParsers } from "@/app/[lang]/search.params";
import { CATEGORY_OPTIONS } from "@/app/constants";
import { Button } from "@/components/ui/button";
import type { AuctionCategory } from "@/core/domains/auction";
import { SelectFor } from "../../select-for";

export const QueryCategorySelect: FC = () => {
  const [category, setCategory] = useQueryState(
    "category",
    filterParsers.category,
  );

  const onReset = useCallback(() => {
    setCategory(null); // removes from URL
  }, [setCategory]);

  return (
    <div className="flex gap-x-2 max-w-64 justify-between items-center">
      <SelectFor<AuctionCategory>
        className="min-w-44 w-fit"
        options={CATEGORY_OPTIONS}
        value={category ?? undefined}
        onChange={setCategory}
        placeholder={msg`Select a category`}
        key={category}
      />
      <Button
        onClick={onReset}
        disabled={!category}
        size={"sm"}
        variant={"ghost"}
        className="flex justify-center items-center cursor-pointer"
      >
        <XIcon />
      </Button>
    </div>
  );
};
