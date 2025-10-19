import { Trans } from "@lingui/react/macro";
import { redirect } from "next/navigation";
import { type FC, Suspense } from "react";
import { SkeletonAuctionForm } from "@/app/_components/skeletons/skeleton-auction-form";
import { TypographyH2 } from "@/app/_components/typography/h2";
import { TypographyLead } from "@/app/_components/typography/lead";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Auction } from "@/core/domains/auction";
import { users } from "@/core/instances/users";
import { type LangParam, withI18n } from "@/i18n";
import { UpdateAuctionFormServer } from "./_components/update-auction-form-server";

type Props = {
  params: Promise<Pick<Auction, "id">> & Promise<LangParam>;
};

const Page: FC<Props> = async (props) => {
  const { id, lang } = await props.params;

  const me = await users().me();
  if (!me) {
    redirect(`/${lang}`);
  }

  return (
    <div className="max-w-5xl flex flex-col gap-4 mx-auto pb-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <TypographyH2>
              <Trans>Update your auction</Trans>
            </TypographyH2>
          </CardTitle>
          <CardDescription>
            <TypographyLead>
              <Trans>Fill the form below to update your auction</Trans>
            </TypographyLead>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<SkeletonAuctionForm />}>
            <UpdateAuctionFormServer auctionId={id} meId={me.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default withI18n(Page);
