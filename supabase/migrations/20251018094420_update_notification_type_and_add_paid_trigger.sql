alter table "public"."notifications" alter column "type" drop default;

alter type "public"."notification_type" rename to "notification_type__old_version_to_be_dropped";

create type "public"."notification_type" as enum ('NEW_BID', 'NEW_AUCTION_WON', 'NEW_PAYMENT');

alter table "public"."notifications" alter column type type "public"."notification_type" using type::text::"public"."notification_type";

alter table "public"."notifications" alter column "type" set default 'NEW_BID'::notification_type;

drop type "public"."notification_type__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_auction_paid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    auction_owner UUID;
BEGIN
    IF  OLD.paid_at IS NULL
        AND NEW.paid_at IS NOT NULL
    THEN
        auction_owner := NEW.owner_id;

        INSERT INTO public.notifications (auction_id, recipient_id, type)
        VALUES (NEW.id, auction_owner, 'NEW_PAYMENT');

    END IF;
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER on_auction_is_paid AFTER UPDATE ON public.auctions FOR EACH ROW EXECUTE FUNCTION handle_auction_paid();


