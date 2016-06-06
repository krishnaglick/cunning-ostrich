
exports.getHouses = async function(email, id) {
  const queryMod = id ? `AND id = \${id};` : ';';
  return this.db.query(`
    SELECT *
    FROM houses
    WHERE email = \${email}${queryMod}
  `, {email, id});
};

exports.saveHouses = async function(email, { house, id }) {
  return this.db.query(`
    INSERT INTO houses (email, house${id ? ', id' : ''})
    VALUES (
      \${email},
      \${house}${id ? `,\${id}` : ''}
    )
    ON CONFLICT (id) DO UPDATE
    SET house = \${house};
  `, { email, id, house: JSON.stringify(house) });
};
