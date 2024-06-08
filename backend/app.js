const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const data = require('./data.json');
const menu = data.menu;
let orders = data.orders;

// using CORS to establish connection between both servers
app.use(cors());
app.use(express.json());

app.get('/api/menu', (req, res) => {
  res.json(menu);
});

// Creating order by using POST method
app.post('/api/cart', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    date: new Date(),
    items: req.body.items,
    total: req.body.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
  orders.push(newOrder);
  res.status(201).json({ message: 'order placed successfully' });
});

// caling orders from JSON file
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// deleting orders from past orders
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const initialOrderCount = orders.length;
  orders = orders.filter(order => order.id !== parseInt(id));
  
  if (orders.length === initialOrderCount) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  res.status(200).json({ message: 'Order deleted successfully' });
});

// exceptions for wrong api call
app.use((req, res) => {
  res.status(404).send('404 Page Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
