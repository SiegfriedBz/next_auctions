import type { FC, PropsWithChildren } from "react";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
  breadcrumbs: React.ReactNode;
};

const Layout: FC<PropsWithChildren<Props>> = async (props) => {
  const { breadcrumbs, children } = props;

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-16 gap-4 sm:gap-8">
      <header>{breadcrumbs}</header>
      <section className="">{children}</section>
    </div>
  );
};

export default withI18n(Layout);
