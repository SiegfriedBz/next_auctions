-- ENUM TYPES
CREATE TYPE auction_status AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'CANCELLED');
CREATE TYPE auction_category AS ENUM (
  'ELECTRONICS', 'FASHION', 'COLLECTIBLES', 'ART', 'MUSIC',
  'SPORTS', 'HOME', 'TOYS', 'AUTOMOTIVE'
);

-- AUCTIONS TABLE
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  owner_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',  -- array of AuctionImage objects
  category auction_category NOT NULL DEFAULT 'MUSIC',
  status auction_status NOT NULL DEFAULT 'DRAFT',
  starting_price NUMERIC NOT NULL CHECK (starting_price > 0),
  current_bid NUMERIC CHECK (current_bid >= starting_price OR current_bid IS NULL),
  started_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ CHECK (end_at > started_at OR started_at IS NULL),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TRIGGER FUNCTION BEFORE UPDATE AUCTIONS
CREATE FUNCTION before_update_auction()
RETURNS TRIGGER AS $$
BEGIN
  -- ENFORCE end_at EXISTS BEFORE OPENING
  IF NEW.status = 'OPEN' THEN
    IF NEW.end_at IS NULL THEN
      RAISE EXCEPTION 'Cannot open auction without end_at';
    END IF;
    -- SET started_at WHEN OPENING
    IF OLD.status = 'DRAFT' THEN
      NEW.started_at := NOW();
    END IF;
  END IF;

  -- ALWAYS UPDATE updated_at
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- TRIGGER BEFORE UPDATE
CREATE TRIGGER trigger_before_update_auction
BEFORE UPDATE ON auctions
FOR EACH ROW
EXECUTE FUNCTION before_update_auction();