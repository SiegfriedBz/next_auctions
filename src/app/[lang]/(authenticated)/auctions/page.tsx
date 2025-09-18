import type { FC } from "react";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

const Page: FC<Props> = async (_props) => {
  return <span>Auctions Page</span>;
};

export default withI18n(Page);
