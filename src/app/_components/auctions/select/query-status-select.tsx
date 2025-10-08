"use client";

import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { type FC, useCallback } from "react";
import { filterParsers } from "@/app/[lang]/search.params";
import { Button } from "@/components/ui/button";
import type { AuctionStatus } from "@/core/domains/auction";
import { STATUS_OPTIONS } from "../../../constants";
import { SelectFor } from "../../select-for";

export const QueryStatusSelect: FC = () => {
  const [status, setStatus] = useQueryState("status", filterParsers.status);

  const onReset = useCallback(() => {
    setStatus(null); // removes from URL
  }, [setStatus]);

  return (
    <div className="flex gap-x-2 max-w-64 justify-between items-center">
      <SelectFor<AuctionStatus>
        className="min-w-44 w-fit"
        options={STATUS_OPTIONS}
        value={status ?? undefined}
        onChange={setStatus}
        placeholder={msg`Select a status`}
        key={status}
      />
      <Button
        onClick={onReset}
        disabled={!status}
        size={"sm"}
        variant={"ghost"}
        className="flex justify-center items-center cursor-pointer"
      >
        <XIcon />
      </Button>
    </div>
  );
};
