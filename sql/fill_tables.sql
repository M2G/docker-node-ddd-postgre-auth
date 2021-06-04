-- Set params
SET SESSION my.number_of_users = '1';

-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;

CREATE FUNCTION random_text(INTEGER)
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT UPPER(
    SUBSTRING(
      (SELECT string_agg(md5(random()::TEXT), '')
       FROM generate_series(
           1,
           CEIL($1 / 32.)::INTEGER)
       ), 1, $1) );
$$;

-- Filling of users
INSERT INTO users
SELECT id
	, concat('User ', id)
  , random_text(10)
  , crypt('password', gen_salt('bf'))
FROM GENERATE_SERIES(1, current_setting('my.number_of_users')::INT) AS id;
