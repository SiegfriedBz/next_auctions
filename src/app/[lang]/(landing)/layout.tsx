// src/app/[lang]/(landing)/layout.tsx
import type { FC, PropsWithChildren } from "react";
import { type LangParam, withI18n } from "@/i18n";

type Props = {
  params: Promise<LangParam>;
};

const LandingLayout: FC<PropsWithChildren<Props>> = async ({ children }) => {
  return (
    <div className="relative min-h-screen p-4 sm:p-16">
      <div>{children}</div>
      {/* Full-page gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
    </div>
  );
};

export default withI18n(LandingLayout);
