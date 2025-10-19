import { Trans } from "@lingui/react/macro";
import { NotebookTextIcon } from "lucide-react";
import type { FC } from "react";
import { TypographyH4 } from "@/app/_components/typography/h4";
import { TypographyP } from "@/app/_components/typography/p";
import { TypographySmall } from "@/app/_components/typography/small";

type Props = { description: string | null };

export const AuctionDescription: FC<Props> = (props) => {
  const { description } = props;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-2 -mb-2">
        <NotebookTextIcon className="size-5" />
        <TypographyH4>
          <Trans>Description</Trans>
        </TypographyH4>
      </div>
      {description ? (
        <TypographyP className="max-w-full h-12 sm:h-16 overflow-x-auto overflow-y-auto pr-2 scrollbar-thin">
          {description}
        </TypographyP>
      ) : (
        <TypographySmall className="italic">
          <Trans>No description provided.</Trans>
        </TypographySmall>
      )}
    </div>
  );
};
