
'use strict';

let bluebird = require('bluebird');
let child_process = require('child_process');

module.exports = (mainArg, subArgs) => {
  return new bluebird.Promise((res, rej) => {
    child_process.execFile(mainArg, subArgs, (err) => {
      if(err) return rej(err);
      res();
    });
  });
};
