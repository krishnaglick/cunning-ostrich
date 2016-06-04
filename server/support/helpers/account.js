
'use strict';

const bcrypt = require('bcrypt');

exports.register = async function({email, password}) {
  if(!email)
    throw 'No email provided!';
  if(!password)
    throw 'No password provided!';

  password = await this.helpers.hashPassword(password);
  return this.helpers.createUser({email, password});
};

const {saltRounds} = require('../../local/password');

exports.hashPassword = async function(password) {
  return new this.bluebird.Promise((res, rej) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err) return rej(err);
      res(hash);
    });
  });
};

exports.createUser = async function({email, password}) {
  return this.db.query(`
    INSERT INTO users
    VALUES (
      \${email},
      \${password}
    );
  `, {email, password});
};

exports.changePassword = async function({email, password, newPassword}) {
  let validPassword = await this.helpers.decryptPassword({email, password});
  if(validPassword) {
    newPassword = await this.helpers.hashPassword(newPassword);
    return await (async () => {
      return this.db.query(`
        UPDATE users
        SET password = \${newPassword}
        WHERE email = \${email};
      `, {email, newPassword});
    });
  }
  else
    throw 'Invalid Password!';
};

exports.decryptPassword = async function({email, password}) {
  let user = await this.helpers.getUser({email, password});
  if(!user.length)
    throw 'No user exists for this email!';
  user = user[0];
  return new this.bluebird.Promise((res, rej) => {
    bcrypt.compare(password, user.password, function(err, result) {
      if(err) return rej(err);
      res(result); //result is a bool
    });
  });
};

exports.getUser = async function(email) {
  return this.db.query(`
    SELECT *
    FROM users
    WHERE email = \${email}
  `, {email});
};
