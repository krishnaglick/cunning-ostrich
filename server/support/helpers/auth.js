
'use strict';

const jwt = require('jsonwebtoken');

exports.validateToken = async function({email, token}) {
  return new this.bluebird.Promise((res, rej) => {
    jwt.verify(token, this.config.general.serverToken, (err, payload) => {
      if(err) return rej(err);
      if(payload.exp > Date.now())
        return rej(new Error('Token expired!'));
      if(payload.email === email)
        return res(true);
      else
        rej(new Error('Token/User Mismatch'));
    });
  });
};

exports.generateToken = function({email}) {
  return new this.bluebird.Promise((res) => {
    let payload = {
      email,
      entropy: Math.random() * Date.now() //kek
    };
    res(
      jwt.sign(payload, this.config.general.serverToken, { expiresIn: '2h' })
    );
  });
};

exports.login = async function({email, password}) {
  password = this.helpers.decryptPassword({email, password});
  return this.db.query(`
    SELECT EXISTS(
      SELECT 1
      FROM users
      WHERE email = \${email}
      AND password = \${password}
    );
  `, {email, password});
};
