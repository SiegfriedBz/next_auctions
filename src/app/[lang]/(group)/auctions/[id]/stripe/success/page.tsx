import type { FC } from "react";
import { type LangParam, withI18n } from "@/i18n";
import { StripeServer } from "../_components/stripe-server";
import { SuccessHeaderCard } from "./_components/success-header";

type Params = {
  id: string;
} & LangParam;

type SearchParams = { sessionId: string };

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

const Page: FC<Props> = async (props) => {
  return (
    <StripeServer
      {...props}
      renderProp={({ auction, sessionId }) => (
        <SuccessHeaderCard auction={auction} stripeSessionId={sessionId} />
      )}
    />
  );
};

export default withI18n(Page);
