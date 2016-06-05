
exports.getHouses = async function(email) {
  return this.db.query(`
    SELECT *
    FROM houses
    WHERE email = \${email};
  `, {email});
};
