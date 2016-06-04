
'use strict';

//Run me with 'node migrate.js TARGET_FOLDER (up || down)'

let promise = require('bluebird');
let fs = promise.promisifyAll(require('fs'));
let glob = require('globby');
let _ = require('lodash');
let pgp = require('pg-promise')({promiseLib: promise});

//See: http://stackoverflow.com/a/4351548/4783455
let migrationsFolder = process.argv[2]; //'migrations' or 'databases'
let migrationMode = process.argv[3]; //Should be up or down
if(!migrationsFolder)
  return console.log('Please provide a folder!');
if(!migrationMode)
  return console.log('Please choose a migration direction!');

/**
 * This function will pull all files in a target folder (defaults to same folder as script)
 * where the file name end in '-down.sql' and execute them in reverse lexicographical order by name.
 * The file will be checked if they have been executed already. The default check is against
 * a table named "migration".
 */
exports.migrate = function(config, db) {
  // pull list of migration files into memory
  let migrations = glob.sync(`${migrationsFolder}/*-${migrationMode}.sql`);

  if(migrations.length < 1) {
    throw new Error('No migrations to process.');
  }

  migrations = _.sortBy(migrations,function(n){ return n; });
  if(migrationMode === 'down') migrations = migrations.reverse();

  if(config.debugLevel < 1) console.log(migrations);

  // verify if there is a migration-tracking table, else create one
  // TODO: flexible storage options, such as different name for migration table, schema or maybe even file-based (careful with Git)?
  // TODO: hard-coded sql should be generated based on target system
  return db.oneOrNone('SELECT table_name FROM information_schema.tables WHERE table_name=\'migration\';')
    .then((data) => {
      // create migration log if none ready
      if(config.debugLevel < 1) console.log('then1: ', data);
      if(!data) {
        if(migrationMode === 'down')
          throw new Error('No migration log for down migration operation.');
        else if(migrationMode === 'up') {
          if(config.debugLevel < 3) console.log('created migration log table');
          // TODO: hard-coded sql should be generated based on target system
          return db.tx((transaction) => {
            // TODO: hard-coded sql should be generated based on target system
            return transaction.batch([
              transaction.none('CREATE TABLE IF NOT EXISTS migration(name TEXT PRIMARY KEY, run_date TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp);'),
              transaction.none('GRANT ALL ON TABLE migration TO public;')
            ]);
          });
        }
      }
      else {
        return null;
      }
    })
    .then(function(data) {
      // for each migration, pull the sql content of the file and return object with fileName and content
      if(config.debugLevel < 1) console.log('then2: ', data);
      return promise.map(migrations, function(fileName) {
        return fs.readFileAsync(fileName)
          .then((content) => {
            return { fileName: fileName, content: content.toString() };
          })
          .catch((err) => {
            err.fileName = fileName; // add fileName to error
            throw err;
          });
      });
    })
    .then(function(data) {
      // run each migration file; catch errors and scan for duplicate key errors to skip
      if(config.debugLevel < 1) console.log('then3: ', data);

      // TODO: In bluebird 3.0, the reduce() could be changed to an each(); see https://github.com/petkaantonov/bluebird/issues/788
      return promise.reduce(data, function(migrations, migration) {
        if(config.debugLevel < 1) console.log('migration: ', migration);

        return db.tx(function(transaction) {
          // TODO: hard-coded sql should be generated based on target system
          if(migrationMode === 'down') {
            return transaction.batch([
              transaction.none(migration.content),
              transaction.none('DELETE FROM migration WHERE name = $1;', migration.fileName.replace('-down.','-up.'))
            ]);
          }
          else if(migrationMode === 'up') {
            return transaction.batch([
              transaction.none('INSERT INTO migration(name) VALUES($1);', migration.fileName),
              transaction.none(migration.content)
            ]);
          }
        })
        .then(function(txResults) {
          if(config.debugLevel < 1) console.log('txResults then: ', txResults);
          migrations.push(`${migrationMode}: ${migration.fileName}`);
          return migrations;
        })
        .catch(function(txResults) {
          if(config.debugLevel < 1) console.log('txResults catch: ', txResults);

          if(migrationMode === 'down') {
            let errMsg = '';
            if (!txResults[0].success) {
              errMsg = errMsg + 'SQL Error: ' + migration.fileName + ' - ' + txResults[0].result.toString();
            }
            if (!txResults[1].success) {
              errMsg = (errMsg === '' ? errMsg : errMsg + '\n') + 'SQL Error: ' + migration.fileName + ' - ' + txResults[1].result.toString();
            }
            migrations.push(errMsg);
            return migrations;
          }
          else if(migrationMode === 'up') {
            if(!txResults[0].success && txResults[0].result.toString().indexOf('duplicate key value violates unique constraint') > 0) {
              migrations.push('Skipped: ' + migration.fileName); // skip/ignore
              return migrations;
            }

            var errMsg = '';
            if (!txResults[0].success) {
              errMsg = errMsg + 'SQL Error: ' + migration.fileName + ' - ' + txResults[0].result.toString();
            }
            if (!txResults[1].success) {
              errMsg = (errMsg === '' ? errMsg : errMsg + '\n') + 'SQL Error: ' + migration.fileName + ' - ' + txResults[1].result.toString();
            }
            migrations.push(errMsg);
            return migrations;
          }
        });
      }, []);
    })
    .catch(function(err) {
      if(config.debugLevel < 1) console.log('catch: ', err);
      return(err);
    });
};

// get JSON-based configuration; default to config.json in same folder
// TODO: manage config with nconf? pull config out into submodule? make sure to follow file > env > cli priority
// TODO: validate proper config data with something like joi?
let config = require('../config/postgres');
let db = pgp(config);

module.exports.migrate(config, db)
.then((results) => {
  console.log('results',results);
  // TODO: offer multiple different reporting mechanisms
  if(migrationMode === 'down') {
    db.query('TRUNCATE migration;')
    .then(() => {
      console.log('SUCCESS:');
      console.log(results.join ? results.join('\n') : results);
      process.exit(0);
    });
  }
  else {
    console.log('SUCCESS:');
    console.log(results.join ? results.join('\n') : results);
    process.exit(0);
  }
})
.catch((err) => {
  // if we reached this point, we had a serious and/or global error(s)
  console.log('ERROR:');
  console.log(err);
  process.exit(1);
});