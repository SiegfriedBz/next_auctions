"use client";

import { Trans } from "@lingui/react/macro";
import { type FC, useCallback } from "react";
import { Button } from "@/components/ui/button";

export const LogOutButton: FC = () => {
  const handleLogOut = useCallback(() => {
    throw new Error("Implement LOG OUT");
  }, []);

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
