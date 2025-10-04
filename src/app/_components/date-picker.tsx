"use client";

import { msg } from "@lingui/core/macro";
import { ChevronDownIcon } from "lucide-react";
import { type FC, useMemo, useState } from "react";
import type { DateBefore, Matcher } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
