import { useLingui } from "@lingui/react/macro";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { LinkPreview } from "@/components/ui/link-preview";

const ADMIN_LINK = process.env.ADMIN_LINK ?? "https://github.com/SiegfriedBz";

export const Footer: FC = () => {
  const { i18n } = useLingui();
  const { locale: lang } = i18n;

  return (
    <footer className="flex py-8 gap-4 flex-wrap items-center justify-center text-sm">
      <span>© {new Date().getFullYear()}</span>

      <Link href={`/${lang}/`} scroll>
        <span className="tracking-wide">
          GavL | Track Auctions Effortlessly
        </span>
      </Link>

      <LinkPreview url={ADMIN_LINK}>
        <span className="inline-flex gap-x-2 items-center text-sm whitespace-nowrap">
          Made with <HeartIcon className="text-red-400 size-4" /> by Siegfried
        </span>
      </LinkPreview>
    </footer>
  );
};
