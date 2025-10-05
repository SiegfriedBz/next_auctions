import { Trans, useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Auction } from "@/core/domains/auction";
import { auctions } from "@/core/instances/auctions";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

const BreadCrumbSlot: FC<Props> = async (props) => {
  const { id, lang } = await props.params;

  const auction = await auctions().detailsById(id);
  const auctionName = auction?.title ?? null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hover:text-foreground">
          <Link href={`/${lang}/auctions`}>
            <Trans>Auctions</Trans>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem className="hover:text-foreground">
          <Link href={`/${lang}/auctions/${auction?.id}`}>
            <Trans>{auctionName ?? id}</Trans>
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

export default withI18n(BreadCrumbSlot);
