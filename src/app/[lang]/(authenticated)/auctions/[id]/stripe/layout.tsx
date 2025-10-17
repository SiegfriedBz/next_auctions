import { type FC, type PropsWithChildren, Suspense } from "react";
import { SkeletonAuctionDetails } from "@/app/_components/skeletons/skeleton-auction-details";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

const Layout: FC<PropsWithChildren<Props>> = async (props) => {
  const { children } = props;

  return (
    <div className="max-w-5xl flex flex-col gap-6 mx-auto pb-8">
      <Suspense fallback={<SkeletonAuctionDetails />}>{children}</Suspense>
    </div>
  );
};

export default withI18n(Layout);
