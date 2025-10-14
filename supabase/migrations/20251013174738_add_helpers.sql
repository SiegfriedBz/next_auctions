set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    SELECT role = 'ADMIN'
    FROM users
    WHERE id = user_id;
$function$
;


