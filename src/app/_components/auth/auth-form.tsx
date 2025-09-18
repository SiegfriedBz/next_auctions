import type { FC } from "react";

type Props = {
  isLogin: boolean;
};

export const AuthForm: FC<Props> = (props) => {
  const { isLogin } = props;

  if (isLogin) return <span>email password LoginForm - Log in</span>;

  return <span>name email password SignupForm - Create Account</span>;
};
