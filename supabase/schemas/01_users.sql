-- ENUM TYPES
CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

-- USERS TABLE
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TRIGGER FUNCTION TO UPDATE updated_at AUTOMATICALLY
CREATE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER BEFORE UPDATE
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();

-- ENABLE RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ROLE USER POLICIES
-- 1. USERS CAN CREATE AN ACCOUNT
CREATE POLICY "users_can_create_account"
ON users
FOR INSERT
WITH CHECK (
  id = auth.uid()
);

-- 2. USERS CAN VIEW THEIR OWN ACCOUNT
CREATE POLICY "users_can_view_own_account"
ON users
FOR SELECT
USING (
  id = auth.uid()
);

-- 3. USERS CAN UPDATE THEIR OWN ACCOUNT
CREATE POLICY "users_can_update_own_account"
ON users
FOR UPDATE
USING (
  id = auth.uid()
)
WITH CHECK (
  id = auth.uid()
);

-- 4. USERS CAN DELETE THEIR OWN ACCOUNT
CREATE POLICY "users_can_delete_own_account"
ON users
FOR DELETE
USING (
  id = auth.uid()
);

-- ROLE ADMIN POLICIES
-- 1. ADMINS CAN VIEW ALL ACCOUNTS
CREATE POLICY "admins_can_view_all_accounts"
ON users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users u 
    WHERE u.role = 'ADMIN'
      AND u.id = auth.uid()
  )
);

-- 2. ADMINS CAN UPDATE ANY ACCOUNT
CREATE POLICY "admins_can_update_any_account"
ON users
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users u 
    WHERE u.role = 'ADMIN'
      AND u.id = auth.uid()
  )
);

-- 3. ADMINS CAN DELETE ANY ACCOUNT
CREATE POLICY "admins_can_delete_any_account"
ON users
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.role = 'ADMIN'
      AND u.id = auth.uid()
  )
);

-- ENFORCE THAT ONLY ADMIN CAN CHANGE ROLES
CREATE FUNCTION enforce_user_role_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role <> OLD.role AND OLD.role <> 'ADMIN' THEN
    RAISE EXCEPTION 'Cannot change role';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enforce_user_role_update
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_user_role_update();

-- Note: Some cross-table policies affecting users (e.g., preventing deletion if they have active bids)
-- are defined in 04_cross_policies.sql