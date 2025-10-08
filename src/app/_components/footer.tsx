import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex gap-[24px] flex-wrap items-center justify-center">
      <span>© {new Date().getFullYear()} GavL</span>
    </footer>
  );
};
