alter table "public"."users" add column "created_at" timestamp without time zone not null default now();

alter table "public"."users" add column "updated_at" timestamp without time zone not null default now();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE TRIGGER trigger_update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();


