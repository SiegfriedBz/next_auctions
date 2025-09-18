import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AuthSheetContent } from "./auth-sheet-content";

export const AuthButton: FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Trans>Login</Trans>
      </SheetTrigger>
      <AuthSheetContent />
    </Sheet>
  );
};
