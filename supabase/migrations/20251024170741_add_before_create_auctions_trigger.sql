set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.before_insert_auction()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- If created directly with OPEN status, set started_at to now
  IF NEW.status = 'OPEN' THEN
    NEW.started_at := NOW();
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER trigger_before_insert_auction BEFORE INSERT ON public.auctions FOR EACH ROW EXECUTE FUNCTION before_insert_auction();


