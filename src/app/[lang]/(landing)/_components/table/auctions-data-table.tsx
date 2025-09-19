import { type Auction, Category } from "@/domain/auction";
import { AuctionsTable } from "./auctions-table";

async function getMockData(): Promise<Auction[]> {
  return [
    {
      id: "123456",
      ownerId: "user-01",
      title: "title 01",
      description: "description 01",
      images: [],
      category: Category.ART,
      startingPrice: 100,
      currentBid: 200,
      endDate: new Date("2025-10-12"),
    },
    {
      id: "1234567",
      ownerId: "user-02",
      title: "title 02",
      description: "description 02",
      images: [{ url: "https://github.com/shadcn.png" }],
      category: Category.ELECTRONICS,
      startingPrice: 1000,
      currentBid: 2000,
      endDate: new Date("2025-11-12"),
    },
    {
      id: "12345678",
      ownerId: "user-02",
      title: "title 02",
      description: "description 02",
      images: [{ url: "https://github.com/shadcn.png" }],
      category: Category.ELECTRONICS,
      startingPrice: 1000,
      endDate: new Date("2025-11-12"),
    },
  ];
}

export const AuctionsDataTable = async () => {
  const data = await getMockData();
  await new Promise((res) => setTimeout(res, 1_000));

  return <AuctionsTable data={data} count={data.length} />;
};
