// Wishlist Microservice (Port 5005)
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 5005;

// In-memory wishlist store (array of product objects or IDs)
let wishlist = [];

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
      service: 'wishlist-service',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/v1/wishlist - Get all wishlist items
  if (pathname === '/api/v1/wishlist' && req.method === 'GET') {
    return sendJSON(res, 200, {
      success: true,
      count: wishlist.length,
      wishlist
    });
  }

  // POST /api/v1/wishlist/toggle - Toggle item in wishlist
  if (pathname === '/api/v1/wishlist/toggle' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { productId, product } = body;
      const pId = Number(productId || (product && product.id));

      if (!pId) {
        return sendJSON(res, 400, { success: false, error: 'productId is required' });
      }

      const existingIndex = wishlist.findIndex(item => (typeof item === 'number' ? item === pId : item.id === pId));
      let action = '';

      if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        action = 'removed';
      } else {
        wishlist.push(product || { id: pId });
        action = 'added';
      }

      return sendJSON(res, 200, {
        success: true,
        action,
        count: wishlist.length,
        wishlist
      });
    } catch (err) {
      return sendJSON(res, 400, { success: false, error: 'Invalid JSON payload' });
    }
  }

  // DELETE /api/v1/wishlist/:productId - Remove item
  const deleteMatch = pathname.match(/^\/api\/v1\/wishlist\/(\d+)$/);
  if (deleteMatch && req.method === 'DELETE') {
    const pId = Number(deleteMatch[1]);
    wishlist = wishlist.filter(item => (typeof item === 'number' ? item !== pId : item.id !== pId));

    return sendJSON(res, 200, {
      success: true,
      message: `Product ${pId} removed from wishlist`,
      count: wishlist.length,
      wishlist
    });
  }

  return sendJSON(res, 404, { success: false, error: 'Endpoint not found in wishlist-service' });
});

server.listen(PORT, () => {
  console.log(`[Wishlist Service] running on http://localhost:${PORT}`);
});
