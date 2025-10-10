import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex py-8 gap-[24px] flex-wrap items-center justify-center">
      <span>© {new Date().getFullYear()} GavL</span>
    </footer>
  );
};
