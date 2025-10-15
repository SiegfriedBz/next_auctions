alter table "public"."auctions" drop constraint "auctions_check";

alter table "public"."auctions" drop column "current_bid";

alter table "public"."auctions" add column "highest_bid" numeric;

alter table "public"."auctions" add column "highest_bidder_id" uuid;

alter table "public"."auctions" add constraint "auctions_highest_bidder_id_fkey" FOREIGN KEY (highest_bidder_id) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."auctions" validate constraint "auctions_highest_bidder_id_fkey";

alter table "public"."auctions" add constraint "auctions_check" CHECK (((highest_bid >= starting_price) OR (highest_bid IS NULL))) not valid;

alter table "public"."auctions" validate constraint "auctions_check";


