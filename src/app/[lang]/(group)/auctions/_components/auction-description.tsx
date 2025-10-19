import { Trans } from "@lingui/react/macro";
import { NotebookTextIcon } from "lucide-react";
import type { FC } from "react";

type Props = { description: string | null };

export const AuctionDescription: FC<Props> = (props) => {
  const { description } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-x-2">
        <NotebookTextIcon className="size-5" />
        <Trans>Description</Trans>
      </div>
      {description ? (
        <p className="max-w-full h-16 sm:h-20 overflow-x-auto overflow-y-auto text-sm leading-relaxed text-muted-foreground pr-2 scrollbar-thin">
          {description}
        </p>
      ) : (
        <p className="italic text-muted-foreground">
          <Trans>No description provided.</Trans>
        </p>
      )}
    </div>
  );
};
