const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'n1xx1n',
  host: 'localhost',
  port: 5432,
  database: 'food-orders'
});

module.exports =  {
  query: (text, params) => pool.query(text, params)
};