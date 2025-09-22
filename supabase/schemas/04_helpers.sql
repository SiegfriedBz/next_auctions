CREATE FUNCTION is_admin(user_id uuid)
RETURNS boolean
SECURITY DEFINER SET search_path = public
LANGUAGE sql
AS $$
    SELECT role = 'ADMIN'
    FROM users
    WHERE id = user_id;
$$;