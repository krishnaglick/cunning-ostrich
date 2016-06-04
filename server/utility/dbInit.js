
'use strict';

const child_process = require('./blueChild');

let pgInfo = require('../config/postgres');

let dbOwnerName = pgInfo.user;
let dbOwnerPassword = pgInfo.password;
let dbName = pgInfo.database;
let dbSuperuser = pgInfo.superuser || dbOwnerName;

let queryWrapper = (query) => {
  return child_process('psql', [
    `-U`,
    dbSuperuser,
    `-c`,
    query
  ]).catch(console.error);
};

queryWrapper(`
  CREATE USER ${dbOwnerName}
  WITH PASSWORD '${dbOwnerPassword}'
  VALID UNTIL 'infinity';
  ALTER USER ${dbOwnerName} WITH SUPERUSER CREATEDB CREATEROLE REPLICATION;
`).finally(() => queryWrapper(`
 CREATE DATABASE ${dbName}
 WITH OWNER=${dbOwnerName}
 ENCODING='UTF8';
`).finally(() => queryWrapper(`
  GRANT ALL PRIVILEGES
  ON DATABASE ${dbName}
  TO ${dbOwnerName};
`).finally(() => queryWrapper(`
  REVOKE ALL PRIVILEGES
  ON SCHEMA public
  FROM public;
`).finally(() => queryWrapper(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`)))));
