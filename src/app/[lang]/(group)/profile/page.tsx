import { type FC, Suspense } from "react";
import { type LangParam, withI18n } from "@/i18n";
import { ProfileServer } from "./_components/profile-server";
import { SkeletonProfileCard } from "./_components/skeleton-profile-card";

type Params = LangParam;

type Props = {
  params: Promise<Params>;
};

const Page: FC<Props> = async (props) => {
  return (
    <div className="container sm:max-w-5xl mx-auto py-4 space-y-6">
      <Suspense fallback={<SkeletonProfileCard />}>
        <ProfileServer {...props} />
      </Suspense>
    </div>
  );
};

export default withI18n(Page);
