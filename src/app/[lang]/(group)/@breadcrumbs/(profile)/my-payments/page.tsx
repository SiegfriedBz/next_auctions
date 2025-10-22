import { Trans } from "@lingui/react/macro";
import type { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

const BreacRumbSlot: FC<Props> = async (_props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Trans>My payments</Trans>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default withI18n(BreacRumbSlot);
