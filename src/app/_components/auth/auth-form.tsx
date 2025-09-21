import type { FC } from "react";
import { LoginForm } from "./log-in-form";
import { SignUpForm } from "./sign-up-form";

type Props = {
  isLogin: boolean;
  onCloseSideSheet: () => void;
};

export const AuthForm: FC<Props> = (props) => {
  const { isLogin, onCloseSideSheet } = props;

  return isLogin ? (
    <LoginForm onCloseSideSheet={onCloseSideSheet} />
  ) : (
    <SignUpForm onCloseSideSheet={onCloseSideSheet} />
  );
};
