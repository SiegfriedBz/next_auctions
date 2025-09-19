// import { PickaxeIcon } from "lucide-react";

import { Trans, useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

export const Hero: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          <Trans>Discover, Bid & Win Unique Auctions</Trans>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          <Trans>
            Join our community-driven platform to find exclusive deals and
            one-of-a-kind items.
          </Trans>
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Link href={`/${lang}/auctions`}>
              <Trans>Browse Auctions</Trans>
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href={`/${lang}/auctions/new`}>
              <Trans>Create Auction</Trans>
            </Link>
          </Button>
        </div>
      </div>

      {/* Optional subtle gradient background */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" /> */}
    </section>
  );
};
