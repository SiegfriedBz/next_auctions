"use client";

import type { Table as TanstackTable } from "@tanstack/react-table";
import { createContext, useContext } from "react";
import type { Auction } from "@/core/domains/auction";

export const AuctionsTableContext =
  createContext<TanstackTable<Auction> | null>(null);

export const useAuctionsTable = () => {
  const ctx = useContext(AuctionsTableContext);
  if (!ctx) {
    throw new Error("useAuctionsTable must be used within its provider");
  }
  return ctx;
};
