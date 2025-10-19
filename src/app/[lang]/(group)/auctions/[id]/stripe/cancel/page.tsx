import type { FC } from "react";
import { type LangParam, withI18n } from "@/i18n";
import { StripeServer } from "../_components/stripe-server";
import { CancelHeaderCard } from "./_components/cancel-header";

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
      renderProp={({ auction }) => <CancelHeaderCard auction={auction} />}
    />
  );
};

export default withI18n(Page);
