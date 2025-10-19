import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h3">;

export const TypographyH3: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <h3
      {...rest}
      className={cn(
        "scroll-m-20 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
};
