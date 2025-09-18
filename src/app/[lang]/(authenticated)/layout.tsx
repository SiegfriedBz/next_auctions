import type { FC, PropsWithChildren } from "react";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
  breadcrumbs: React.ReactNode;
};

const Layout: FC<PropsWithChildren<Props>> = async (props) => {
  const { children, breadcrumbs } = props;

  return (
    <div className="grid grid-[auto_1fr] min-h-full gap-4 p-6">
      <header>{breadcrumbs}</header>
      <section> {children}</section>
    </div>
  );
};

export default withI18n(Layout);
