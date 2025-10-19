"use client";

import {
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
  isBefore,
} from "date-fns";
import { type FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  endDate?: Date;
  className?: string;
};

export const Countdown: FC<Props> = (props) => {
  const { endDate, className } = props;

  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!endDate) return;

    const interval = setInterval(() => {
      const now = new Date();

      if (isBefore(endDate, now)) {
        setTimeLeft("Auction ended");
        clearInterval(interval);
        return;
      }

      const seconds = differenceInSeconds(endDate, now);
      const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

      setTimeLeft(
        formatDuration(duration, {
          format: ["days", "hours", "minutes", "seconds"],
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!endDate) return null;

  return <span className={cn("font-bold", className)}>{timeLeft}</span>;
};
