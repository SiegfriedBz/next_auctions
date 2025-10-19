import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h4">;

export const TypographyH4: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <h4
      {...rest}
      className={cn(
        "scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
};
