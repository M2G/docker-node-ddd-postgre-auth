-- Creation of user table
CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  PRIMARY KEY (id)
);