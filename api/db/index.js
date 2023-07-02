const { Client } = require('pg');
const init = require('./init');

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'learndocker',
  password: 'changeme',
  port: 5432,
});

client.connect(async (err) => {
  if (err) throw err;
  console.log('Database connected!');
});

init(client);

module.exports = client;
