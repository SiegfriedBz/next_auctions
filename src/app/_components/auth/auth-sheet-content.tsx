"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { MoveRightIcon } from "lucide-react";
import { type FC, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AuthForm } from "./auth-form";

export const AuthSheetContent: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const { t } = useLingui();

  const handleSwitchForm = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>
          {isLogin ? (
            <Trans>Welcome back!</Trans>
          ) : (
            <Trans>Create your account.</Trans>
          )}
        </SheetTitle>

        <SheetDescription>
          {isLogin ? (
            <Trans>Enter your email and password to access.</Trans>
          ) : (
            <Trans>Fill in your details to create a new account.</Trans>
          )}
        </SheetDescription>
      </SheetHeader>

      <div
        className="flex flex-col gap-1.5 p-4 animate-fade-in"
        key={isLogin.toString()}
      >
        <AuthForm isLogin={isLogin} />

        <Separator />

        <div className="flex items-center justify-start gap-x-2">
          <div className="flex items-center gap-x-2">
            {isLogin ? (
              <Trans>Don't have an account? </Trans>
            ) : (
              <Trans>Already have an account?</Trans>
            )}
            <MoveRightIcon size={16} />
          </div>

          <Button
            onClick={handleSwitchForm}
            variant={"secondary"}
            size={"sm"}
            aria-label={t`Switch login/signup forms`}
          >
            {isLogin ? <Trans>Sign Up</Trans> : <Trans>Login</Trans>}
          </Button>
        </div>
      </div>
    </SheetContent>
  );
};
