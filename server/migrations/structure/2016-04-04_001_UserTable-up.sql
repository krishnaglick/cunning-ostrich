
CREATE TABLE IF NOT EXISTS users (
  email               TEXT NOT NULL,
  password            TEXT NOT NULL,

  -- Keys
  CONSTRAINT users_pk PRIMARY KEY (email)
);
