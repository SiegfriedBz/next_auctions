alter table "public"."users" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_user_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.role <> OLD.role AND OLD.role <> 'ADMIN' THEN
    RAISE EXCEPTION 'Cannot change role';
  END IF;
  RETURN NEW;
END;
$function$
;

create policy "Admins can delete any account"
on "public"."users"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


create policy "Admins can update any account"
on "public"."users"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


create policy "Admins can view all accounts"
on "public"."users"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users u
  WHERE ((u.role = 'ADMIN'::user_role) AND (u.id = auth.uid())))));


create policy "Users can create an account"
on "public"."users"
as permissive
for insert
to public
with check ((id = auth.uid()));


create policy "Users can delete their own account"
on "public"."users"
as permissive
for delete
to public
using ((id = auth.uid()));


create policy "Users can update their own account"
on "public"."users"
as permissive
for update
to public
using ((id = auth.uid()))
with check ((id = auth.uid()));


create policy "Users can view their own account"
on "public"."users"
as permissive
for select
to public
using ((id = auth.uid()));


CREATE TRIGGER user_update_trigger BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION enforce_user_update();


