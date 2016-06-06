
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS houses (
  id        UUID DEFAULT uuid_generate_v1mc(),

  email     TEXT NOT NULL,
  house     JSONB NOT NULL,

  -- Keys
  CONSTRAINT houses_pk PRIMARY KEY (id),
  -- Foreign Keys
  CONSTRAINT houses_users_fk FOREIGN KEY (email)
    REFERENCES users (email)
);
