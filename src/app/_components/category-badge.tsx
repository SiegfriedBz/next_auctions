import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/domain/auction";
import { CategoryToMessage } from "./category-to-message";

type Props = {
  category: Category;
};

export const CategoryBadge: FC<Props> = (props) => {
  const { category } = props;
  const { i18n } = useLingui();

  return (
    <Badge>
      {i18n._(CategoryToMessage.get(category) as MessageDescriptor)}
    </Badge>
  );
};
