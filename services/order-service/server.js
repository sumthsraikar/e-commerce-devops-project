// Orders & Checkout Microservice (Port 5004)
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 5004;

// In-memory orders store
let orders = [
  {
    orderId: "ODR-98231024",
    orderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Delivered",
    paymentMethod: "UPI / PhonePe",
    shippingAddress: "B-402, Sunset Heights, Bangalore, Karnataka - 560100",
    totalAmount: 127990,
    items: [
      {
        id: 1,
        productId: 1,
        title: "Apple iPhone 15 Pro (128 GB) - Natural Titanium",
        price: 127990,
        qty: 1,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80"
      }
    ],
    deliveryDate: new Date(Date.now() - 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
  }
];

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendJSON(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/health' && req.method === 'GET') {
    return sendJSON(res, 200, {
      status: 'UP',
      service: 'order-service',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/v1/orders - List all orders
  if (pathname === '/api/v1/orders' && req.method === 'GET') {
    return sendJSON(res, 200, {
      success: true,
      total: orders.length,
      orders
    });
  }

  // POST /api/v1/orders - Place a new order
  if (pathname === '/api/v1/orders' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { items = [], totalAmount, shippingAddress, paymentMethod } = body;

      if (!items || items.length === 0) {
        return sendJSON(res, 400, { success: false, error: 'Cannot place order with empty items' });
      }

      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
      const deliveryEst = new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const newOrder = {
        orderId: `ODR-${randomDigits}`,
        orderDate: new Date().toISOString(),
        status: 'Confirmed',
        paymentMethod: paymentMethod || 'Cash on Delivery',
        shippingAddress: shippingAddress || 'Default Customer Address, Bangalore',
        totalAmount: Number(totalAmount) || items.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0),
        items,
        deliveryDate: `Estimated by ${deliveryEst}`
      };

      orders.unshift(newOrder); // Newest order on top

      return sendJSON(res, 201, {
        success: true,
        message: 'Order placed successfully!',
        order: newOrder
      });
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: 'Invalid JSON payload' });
    }
  }

  // GET /api/v1/orders/:id - Get order details
  const getMatch = pathname.match(/^\/api\/v1\/orders\/([A-Za-z0-9-]+)$/);
  if (getMatch && req.method === 'GET') {
    const orderId = getMatch[1];
    const order = orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
    if (!order) {
      return sendJSON(res, 404, { success: false, error: 'Order not found' });
    }
    return sendJSON(res, 200, { success: true, order });
  }

  // DELETE /api/v1/orders/:id/cancel - Cancel order
  const cancelMatch = pathname.match(/^\/api\/v1\/orders\/([A-Za-z0-9-]+)\/cancel$/);
  if (cancelMatch && (req.method === 'DELETE' || req.method === 'POST')) {
    const orderId = cancelMatch[1];
    const order = orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());
    if (!order) {
      return sendJSON(res, 404, { success: false, error: 'Order not found' });
    }
    order.status = 'Cancelled';
    return sendJSON(res, 200, {
      success: true,
      message: `Order ${orderId} has been cancelled`,
      order
    });
  }

  return sendJSON(res, 404, { success: false, error: 'Endpoint not found in order-service' });
});

server.listen(PORT, () => {
  console.log(`[Order Service] running on http://localhost:${PORT}`);
});
