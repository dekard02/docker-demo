const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const app = express();

app.use(morgan('short'));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/todos', async (req, res) => {
  const result = await db.query('select * from todo');
  res.status(200).json({
    status: 'success',
    todos: result.rows,
  });
});

app.post('/todos', async (req, res) => {
  const { content } = req.body;

  const result = await db.query(
    `insert into todo (content) values ('${content}') returning *`
  );

  res.status(200).json({
    status: 'success',
    todo: result.rows[0],
  });
});

app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const result = await db.query(
    `update todo set content = '${content}' where id = ${id}`
  );

  res.status(200).json({
    status: 'success',
    todo: result.rows[0],
  });
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;

  db.query(`delete from todo where id = ${id}`)
    .then(() => {
      res.status(204).json(null);
    })
    .catch((err) => {
      res.status(500).json({
        status: 'errror',
      });
    });
});

app.listen('8000', () => {
  console.log('server running on port 8000');
});
