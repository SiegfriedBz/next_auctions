import type { User } from "./user";

export enum Category {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  COLLECTIBLES = "Collectibles",
  ART = "Art",
  MUSIC = "Music",
  SPORTS = "Sports",
  HOME = "Home",
  TOYS = "Toys",
  AUTOMOTIVE = "Automotive",
}

export type AuctionImage = {
  url: string; // public URL from Supabase Storage
  name?: string;
  uploadedAt?: Date;
};

export type Auction = {
  id: string;
  ownerId: User["id"];
  title: string;
  description: string;
  images: AuctionImage[];
  category: Category;
  startingPrice: number;
  currentBid?: number;
  endDate: Date;
  startedAt?: Date;
  updatedAt?: Date;
};
