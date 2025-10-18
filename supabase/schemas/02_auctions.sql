-- ENUM TYPES
CREATE TYPE auction_status AS ENUM ('DRAFT', 'OPEN', 'CLOSED');
CREATE TYPE auction_category AS ENUM (
  'ELECTRONICS', 'FASHION', 'COLLECTIBLES', 'ART', 'MUSIC',
  'SPORTS', 'HOME', 'TOYS', 'AUTOMOTIVE'
);

-- AUCTIONS TABLE
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  storage_id UUID UNIQUE,-- used as pointer to images in Supabase storage
  owner_id UUID NOT NULL REFERENCES users(id),
  highest_bidder_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',  -- array of AuctionImage objects
  category auction_category NOT NULL DEFAULT 'MUSIC',
  status auction_status NOT NULL DEFAULT 'DRAFT',
  starting_price NUMERIC NOT NULL CHECK (starting_price > 0),
  highest_bid NUMERIC CHECK (highest_bid >= starting_price OR highest_bid IS NULL),
  started_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ CHECK (end_at > started_at OR started_at IS NULL),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE FUNCTION before_update_auction()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent opening without end_at
  IF NEW.status = 'OPEN' THEN
    IF NEW.end_at IS NULL THEN
      RAISE EXCEPTION 'Cannot open auction without end_at';
    END IF;

    -- If moving from DRAFT → OPEN, set started_at
    IF OLD.status = 'DRAFT' THEN
      NEW.started_at := NOW();
    END IF;
  END IF;

  -- Always update updated_at timestamp
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER BEFORE UPDATE
CREATE TRIGGER trigger_before_update_auction
BEFORE UPDATE ON auctions
FOR EACH ROW
EXECUTE FUNCTION before_update_auction();