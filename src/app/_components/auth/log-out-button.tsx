"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowRightIcon } from "lucide-react";
import { type ComponentProps, type FC, useCallback } from "react";
import { toast } from "sonner";
import { logout } from "@/actions/auth/log-out";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Button>;

export const LogOutButton: FC<Props> = (props) => {
  const { className, ...rest } = props;

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
      {...rest}
      variant="ghost"
      onClick={handleLogOut}
      className={cn(
        "group rounded-xl w-full flex items-center gap-x-2 cursor-pointer",
        className,
      )}
    >
      <Trans>Log out</Trans>
      <ArrowRightIcon
        size={16}
        className="opacity-50 group-hover:opacity-100 group-hover:font-extrabold transition-all duration-200"
      />
    </Button>
  );
};
