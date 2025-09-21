create type user_role as enum ('ADMIN', 'USER');

create table users (
  id uuid not null references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  avatar_url text,
  role user_role not null default 'USER',
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_users_updated_at
before update on users
for each row
execute function update_updated_at();

alter table users enable row level security;

-- role user
create policy "Users can create an account"
on users
for insert
with check (
  id = auth.uid()
);

create policy "Users can view their own account"
on users
for select
using (
  id = auth.uid()
);

create policy "Users can update their own account"
on users
for update
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);

-- only admin can change role
CREATE FUNCTION enforce_user_update() RETURNS trigger AS $$
BEGIN
  IF NEW.role <> OLD.role AND OLD.role <> 'ADMIN' THEN
    RAISE EXCEPTION 'Cannot change role';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_update_trigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_user_update();

create policy "Users can delete their own account"
on users
for delete
using (
  id = auth.uid()
);

-- role admin
create policy "Admins can view all accounts"
on users
for select
using (
  exists(
      select 1 from users u 
        where u.role = 'ADMIN'
        and u.id = auth.uid()
    )
);

create policy "Admins can update any account"
on users
for update
using (
  exists(
      select 1 from users u 
      where u.role = 'ADMIN'
      and u.id = auth.uid()
    )
);

create policy "Admins can delete any account"
on users
for delete
using (
  exists(
    select 1 from users u
    where u.role = 'ADMIN'
    and u.id = auth.uid()
  )
);