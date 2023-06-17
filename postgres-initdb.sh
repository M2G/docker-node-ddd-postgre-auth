#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  DROP DATABASE IF EXISTS "test_db";
  CREATE DATABASE "test_db";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  DROP DATABASE IF EXISTS "test_db_test";
  CREATE DATABASE "test_db_test";
EOSQL
