import { Trans, useLingui } from "@lingui/react/macro";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { ScrollDownButton } from "./scroll-down-button";

export const Hero: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <section className="flex flex-col items-center justify-between text-center min-h-[calc(100svh-8rem)] sm:min-h-[calc(100svh-12rem)] md:min-h-[calc(100svh-13.5rem)]">
      <div className="h-full sm:max-w-3xl mx-auto my-auto space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          <Trans>Discover, Bid & Win Unique Auctions</Trans>
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground">
          <Trans>
            Join our community-driven platform to find exclusive deals and
            one-of-a-kind items.
          </Trans>
        </p>
        <div className="flex justify-center mt-8 gap-2 sm:gap-4">
          <Button>
            <Link href={`/${lang}/auctions`}>
              <Trans>Browse Auctions</Trans>
            </Link>
          </Button>
          <Button variant="outline">
            <Link href={`/${lang}/auctions/new`}>
              <Trans>Create Auction</Trans>
            </Link>
          </Button>
        </div>
      </div>

      {/* Optional subtle gradient background */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" /> */}

      <ScrollDownButton lang={lang} />
    </section>
  );
};
