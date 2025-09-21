"use client";

import { Trans } from "@lingui/react/macro";
import { type FC, useCallback, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AuthSheetContent } from "./auth-sheet-content";

export const AuthButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Trans>Login</Trans>
      </SheetTrigger>
      <AuthSheetContent onCloseSideSheet={onClose} />
    </Sheet>
  );
};
