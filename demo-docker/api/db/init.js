module.exports = async (client) => {
  await client.query('DROP TABLE IF EXISTS todo ');
  await client.query(
    'CREATE TABLE IF NOT EXISTS todo (id SERIAL PRIMARY KEY, content VARCHAR)'
  );
  const promises = [
    client.query(`INSERT INTO todo (content) VALUES ('Learn Docker');`),
    client.query(`INSERT INTO todo (content) VALUES ('Learn something new');`),
  ];
  await Promise.all(promises);
};
