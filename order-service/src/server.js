const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// In-memory Order Database (or connected to Redis / PostgreSQL)
const orders = [
  {
    id: 'ORD-1001',
    userId: 'usr-admin-1',
    items: [
      { id: 'prod-1', name: 'Cloud Kubernetes Cluster Node', price: 199.99, quantity: 1 }
    ],
    totalAmount: 199.99,
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

// Healthcheck Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'order-service',
    timestamp: new Date().toISOString(),
    totalOrders: orders.length,
    uptime: process.uptime()
  });
});

// Create Order Endpoint
app.post('/orders', (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: userId || 'guest-user',
      items,
      totalAmount: totalAmount || items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
      shippingAddress: shippingAddress || '100 DevOps Way, Microservices Cloud',
      status: 'PROCESSING',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    // Simulate async payment & fulfillment dispatch
    setTimeout(() => {
      newOrder.status = 'CONFIRMED';
    }, 5000);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error processing order', error: error.message });
  }
});

// Get All Orders
app.get('/orders', (req, res) => {
  res.status(200).json({ total: orders.length, orders });
});

// Get User Orders
app.get('/orders/user/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.status(200).json({ total: userOrders.length, orders: userOrders });
});

// Get Specific Order
app.get('/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ message: `Order '${req.params.id}' not found` });
  }
  res.status(200).json({ order });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[ORDER-SERVICE] Listening on port ${PORT}`);
});
