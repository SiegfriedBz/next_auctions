import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"p">;

export const TypographyP: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <p
      {...rest}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
};
