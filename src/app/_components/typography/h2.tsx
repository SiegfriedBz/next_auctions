import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h2">;

export const TypographyH2: FC<PropsWithChildren<Props>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <h2
      {...rest}
      className={cn(
        "scroll-m-20 border-b pb-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
};
