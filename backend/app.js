import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import db from './db.cjs';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  // try {
  //   const result = await db.query('SELECT * FROM meals');
  //   const meals = result.rows;
  //   res.json(meals);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});


app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items === []) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer.zip === null ||
    orderData.customer.zip.trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  // const calculateTotalPrice = (items) => {
  //   return items.reduce((total, item) => {
  //     return total + parseFloat(item.price) * item.quantity;
  //   }, 0).toFixed(2);
  // };
  
  // const totalPrice = calculateTotalPrice(orderData.items);

  // const query = `
  //   INSERT INTO orders (name, email, meals, total)
  //   VALUES ($1, $2, $3, $4)
  // `;
  // const foodItems = orderData.items.map((item) => {
  //   return item.id;
  // })

  // const values = [orderData.customer.name, orderData.customer.email, foodItems, totalPrice];

  // await db.query(query, values);

  // res.status(201).json({ message: 'Meal added successfully' });
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });

});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
