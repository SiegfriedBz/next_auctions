import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

const BreacRumbSlot: FC<Props> = async (props) => {
  const { lang } = await props.params;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hover:text-foreground">
          <Link href={`/${lang}/profile`}>
            <Trans>My profile</Trans>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Trans>Edit</Trans>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default withI18n(BreacRumbSlot);
