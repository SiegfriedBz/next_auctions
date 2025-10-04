"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { type FC, useCallback } from "react";
import { toast } from "sonner";
import { logout } from "@/actions/auth/log-out";
import { Button } from "@/components/ui/button";

export const LogOutButton: FC = () => {
  const { t } = useLingui();

  const handleLogOut = useCallback(async () => {
    try {
      const result = await logout();

      if (result.success) {
        toast.success(t`You logged out successfully`);
      } else {
        throw new Error(result.message);
      }
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
