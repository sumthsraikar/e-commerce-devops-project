// Flipkart Microservices API Gateway (Port 8000)
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8000;

const CATALOG_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:5001';
const SEARCH_URL = process.env.SEARCH_SERVICE_URL || 'http://localhost:5002';
const CART_URL = process.env.CART_SERVICE_URL || 'http://localhost:5003';
const ORDER_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5004';
const WISHLIST_URL = process.env.WISHLIST_SERVICE_URL || 'http://localhost:5005';

// Service Routing Table
const SERVICE_ROUTES = [
  { prefix: '/api/v1/products', target: CATALOG_URL, serviceName: 'catalog-service' },
  { prefix: '/api/v1/categories', target: CATALOG_URL, serviceName: 'catalog-service' },
  { prefix: '/api/v1/brands', target: CATALOG_URL, serviceName: 'catalog-service' },
  { prefix: '/api/v1/search', target: SEARCH_URL, serviceName: 'search-service' },
  { prefix: '/api/v1/cart', target: CART_URL, serviceName: 'cart-service' },
  { prefix: '/api/v1/orders', target: ORDER_URL, serviceName: 'order-service' },
  { prefix: '/api/v1/wishlist', target: WISHLIST_URL, serviceName: 'wishlist-service' }
];

const SERVICES_HEALTH_LIST = [
  { name: 'catalog-service', url: `${CATALOG_URL}/health` },
  { name: 'search-service', url: `${SEARCH_URL}/health` },
  { name: 'cart-service', url: `${CART_URL}/health` },
  { name: 'order-service', url: `${ORDER_URL}/health` },
  { name: 'wishlist-service', url: `${WISHLIST_URL}/health` }
];

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

function sendJSON(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Forward HTTP request to target microservice
function proxyRequest(req, res, targetBaseUrl) {
  const targetUrlObj = new URL(req.url, targetBaseUrl);

  const options = {
    hostname: targetUrlObj.hostname,
    port: targetUrlObj.port,
    path: targetUrlObj.pathname + targetUrlObj.search,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${targetUrlObj.hostname}:${targetUrlObj.port}`,
      'x-forwarded-for': req.socket.remoteAddress || '127.0.0.1',
      'x-gateway': 'flipkart-api-gateway'
    }
  };

  const proxyReq = http.request(options, proxyRes => {
    setCorsHeaders(res);
    // Copy headers from downstream service
    Object.keys(proxyRes.headers).forEach(headerKey => {
      if (headerKey.toLowerCase() !== 'access-control-allow-origin') {
        res.setHeader(headerKey, proxyRes.headers[headerKey]);
      }
    });

    res.writeHead(proxyRes.statusCode);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', err => {
    console.error(`[Gateway Error] Proxy failure to ${targetBaseUrl}:`, err.message);
    sendJSON(res, 503, {
      success: false,
      error: 'Service Unavailable',
      message: `Downstream service at ${targetBaseUrl} is unreachable. Ensure the service is running.`,
      details: err.message
    });
  });

  req.pipe(proxyReq);
}

// Ping downstream health endpoint
function checkServiceHealth(service) {
  return new Promise(resolve => {
    const parsed = new URL(service.url);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname,
        method: 'GET',
        timeout: 2000
      },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ name: service.name, status: res.statusCode === 200 ? 'UP' : 'DOWN', details: JSON.parse(data) });
          } catch {
            resolve({ name: service.name, status: res.statusCode === 200 ? 'UP' : 'DOWN' });
          }
        });
      }
    );

    req.on('error', () => {
      resolve({ name: service.name, status: 'DOWN', error: 'Connection refused' });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ name: service.name, status: 'DOWN', error: 'Timeout' });
    });
    req.end();
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

  // Aggregated Health Check across all microservices
  if (pathname === '/health' && req.method === 'GET') {
    const checks = await Promise.all(SERVICES_HEALTH_LIST.map(checkServiceHealth));
    const allUp = checks.every(c => c.status === 'UP');

    return sendJSON(res, allUp ? 200 : 207, {
      gateway: 'UP',
      port: PORT,
      timestamp: new Date().toISOString(),
      allServicesOperational: allUp,
      services: checks
    });
  }

  // Find matching microservice route
  const matchedRoute = SERVICE_ROUTES.find(route => pathname.startsWith(route.prefix));
  if (matchedRoute) {
    return proxyRequest(req, res, matchedRoute.target);
  }

  // Root / Info
  if (pathname === '/' && req.method === 'GET') {
    return sendJSON(res, 200, {
      message: 'Flipkart E-Commerce Microservices API Gateway',
      version: '1.0.0',
      routes: SERVICE_ROUTES.map(r => ({ route: r.prefix, service: r.serviceName, target: r.target })),
      healthCheck: '/health'
    });
  }

  // 404
  return sendJSON(res, 404, {
    success: false,
    error: 'Route not registered in API Gateway',
    path: pathname
  });
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 [API Gateway] running on http://localhost:${PORT}`);
  console.log(`📌 Routes registered:`);
  SERVICE_ROUTES.forEach(r => console.log(`   ${r.prefix} -> ${r.target} (${r.serviceName})`));
  console.log(`=================================================`);
});
