"use client";

import { Trans } from "@lingui/react/macro";
import { ArrowRightIcon } from "lucide-react";
import { type ComponentProps, type FC, useCallback, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AuthSheetContent } from "./auth-sheet-content";

type Props = Omit<ComponentProps<typeof Sheet>, "open" | "onOpenChange"> & {
  className?: string;
};

export const AuthButton: FC<Props> = (props) => {
  const { className, ...rest } = props;

  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen} {...rest}>
      <SheetTrigger className={cn("flex items-center gap-x-2", className)}>
        <ArrowRightIcon />
        <Trans>Login</Trans>
      </SheetTrigger>
      <AuthSheetContent onCloseSideSheet={onClose} />
    </Sheet>
  );
};
