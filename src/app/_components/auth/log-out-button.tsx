"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { type FC, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { logout } from "./actions/log-out";

export const LogOutButton: FC = () => {
  const { t } = useLingui();

  const handleLogOut = useCallback(async () => {
    try {
      await logout();
      toast.success(t`You logged out successfully`);
    } catch (error) {
      console.log(error);
      toast.error(t`Something went wrong, please try again later.`);
    }
  }, [t]);

  return (
    <Button
      variant="ghost"
      onClick={handleLogOut}
      className="rounded-xl w-full"
    >
      <Trans>Log out</Trans>
    </Button>
  );
};
