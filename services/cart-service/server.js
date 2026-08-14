// Shopping Cart Microservice (Port 5003)
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 5003;

// In-memory cart store
let cartItems = [];

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

function calculateCartTotals() {
  const itemCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp || item.price) * (item.qty || 1), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price) * (item.qty || 1), 0);
  const totalDiscount = totalMrp - totalPrice;

  return {
    items: cartItems,
    itemCount,
    totalMrp,
    totalPrice,
    totalDiscount,
    deliveryCharge: totalPrice > 500 || totalPrice === 0 ? 0 : 40
  };
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
      service: 'cart-service',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/v1/cart - Get current cart with calculated totals
  if (pathname === '/api/v1/cart' && req.method === 'GET') {
    return sendJSON(res, 200, {
      success: true,
      cart: calculateCartTotals()
    });
  }

  // POST /api/v1/cart/items - Add or increment item in cart
  if (pathname === '/api/v1/cart/items' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { productId, title, price, mrp, image, quantity = 1 } = body;

      if (!productId) {
        return sendJSON(res, 400, { success: false, error: 'productId is required' });
      }

      const existingIndex = cartItems.findIndex(i => i.id === Number(productId) || i.productId === Number(productId));
      if (existingIndex > -1) {
        cartItems[existingIndex].qty = (cartItems[existingIndex].qty || 1) + Number(quantity);
      } else {
        cartItems.push({
          id: Number(productId),
          productId: Number(productId),
          title: title || `Product #${productId}`,
          price: Number(price) || 0,
          mrp: Number(mrp) || Number(price) || 0,
          image: image || '',
          qty: Number(quantity)
        });
      }

      return sendJSON(res, 200, {
        success: true,
        message: 'Item added to cart',
        cart: calculateCartTotals()
      });
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: 'Invalid JSON payload' });
    }
  }

  // PUT /api/v1/cart/items/:id - Update item quantity
  const updateMatch = pathname.match(/^\/api\/v1\/cart\/items\/(\d+)$/);
  if (updateMatch && (req.method === 'PUT' || req.method === 'PATCH')) {
    try {
      const productId = Number(updateMatch[1]);
      const body = await parseBody(req);
      const { quantity } = body;

      const item = cartItems.find(i => i.id === productId || i.productId === productId);
      if (!item) {
        return sendJSON(res, 404, { success: false, error: 'Item not found in cart' });
      }

      if (Number(quantity) <= 0) {
        cartItems = cartItems.filter(i => i.id !== productId && i.productId !== productId);
      } else {
        item.qty = Number(quantity);
      }

      return sendJSON(res, 200, {
        success: true,
        message: 'Cart item updated',
        cart: calculateCartTotals()
      });
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: 'Invalid JSON payload' });
    }
  }

  // DELETE /api/v1/cart/items/:id - Remove item
  const deleteMatch = pathname.match(/^\/api\/v1\/cart\/items\/(\d+)$/);
  if (deleteMatch && req.method === 'DELETE') {
    const productId = Number(deleteMatch[1]);
    const prevLength = cartItems.length;
    cartItems = cartItems.filter(i => i.id !== productId && i.productId !== productId);

    if (cartItems.length === prevLength) {
      return sendJSON(res, 404, { success: false, error: 'Item not found in cart' });
    }

    return sendJSON(res, 200, {
      success: true,
      message: 'Item removed from cart',
      cart: calculateCartTotals()
    });
  }

  // DELETE /api/v1/cart/clear - Clear all items
  if (pathname === '/api/v1/cart/clear' && req.method === 'DELETE') {
    cartItems = [];
    return sendJSON(res, 200, {
      success: true,
      message: 'Cart cleared successfully',
      cart: calculateCartTotals()
    });
  }

  return sendJSON(res, 404, { success: false, error: 'Endpoint not found in cart-service' });
});

server.listen(PORT, () => {
  console.log(`[Cart Service] running on http://localhost:${PORT}`);
});
