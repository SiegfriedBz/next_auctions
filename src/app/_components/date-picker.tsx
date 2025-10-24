"use client";

import { msg } from "@lingui/core/macro";
import { ChevronDownIcon } from "lucide-react";
import { type FC, useEffect, useMemo, useState } from "react";
import type { Matcher } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AuctionStatusSchema } from "@/core/domains/auction";
import { cn } from "@/lib/utils";
import { TOMORROW } from "../constants";
import { FormatDate } from "./format-date";

type Props = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  disabledBefore?: Date;
  disabledAfter?: Date;
  className?: string;
};

export const DayPicker: FC<Props> = (props) => {
  const { value, onChange, disabledBefore, disabledAfter, className } = props;
  const [open, setOpen] = useState(false);

  const disabled = useMemo(() => {
    return {
      ...(disabledBefore ? { before: disabledBefore } : {}),
      ...(disabledAfter ? { after: disabledAfter } : {}),
    };
  }, [disabledBefore, disabledAfter]);

  const form = useFormContext();
  const status = form.watch("status");

  useEffect(() => {
    if (status === AuctionStatusSchema.enum.DRAFT) {
      onChange(undefined);
    } else if (status === AuctionStatusSchema.enum.OPEN && !value) {
      onChange(TOMORROW);
    }
  }, [status, value, onChange]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            <FormatDate value={value ?? null} label={msg`Select date`} />
            <ChevronDownIcon className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            disabled={
              (Object.keys(disabled).length ? disabled : undefined) as
                | Matcher
                | Matcher[]
                | undefined
            }
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
