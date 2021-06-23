-- Creation of user table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username varchar(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
