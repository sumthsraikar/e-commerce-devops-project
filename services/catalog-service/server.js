// Catalog & Products Microservice (Port 5001)
const http = require('http');
const url = require('url');
const { PRODUCTS_DATA } = require('./data');

const PORT = process.env.PORT || 5001;

// In-memory catalog state
let products = [...PRODUCTS_DATA];

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

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Root Info
  if (pathname === '/' && req.method === 'GET') {
    return sendJSON(res, 200, {
      service: 'catalog-service',
      port: PORT,
      status: 'UP',
      endpoints: [
        '/health',
        '/api/v1/products',
        '/api/v1/products/1',
        '/api/v1/categories',
        '/api/v1/brands'
      ]
    });
  }

  // Health check endpoint
  if (pathname === '/health' && req.method === 'GET') {
    return sendJSON(res, 200, {
      status: 'UP',
      service: 'catalog-service',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/v1/categories - List unique categories with counts
  if (pathname === '/api/v1/categories' && req.method === 'GET') {
    const categoriesMap = {};
    products.forEach(p => {
      categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
    });
    const categories = Object.keys(categoriesMap).map(name => ({
      name,
      count: categoriesMap[name]
    }));
    return sendJSON(res, 200, { success: true, count: categories.length, categories });
  }

  // GET /api/v1/brands - List unique brands
  if (pathname === '/api/v1/brands' && req.method === 'GET') {
    const brands = [...new Set(products.map(p => p.brand))].sort();
    return sendJSON(res, 200, { success: true, count: brands.length, brands });
  }

  // GET /api/v1/products - Filter, sort, and list products
  if (pathname === '/api/v1/products' && req.method === 'GET') {
    let result = [...products];

    // Filter: category
    if (query.category && query.category.toLowerCase() !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
    }

    // Filter: brands (comma separated)
    if (query.brands) {
      const brandList = query.brands.split(',').map(b => b.trim().toLowerCase());
      result = result.filter(p => brandList.includes(p.brand.toLowerCase()));
    }

    // Filter: maxPrice
    if (query.maxPrice) {
      const max = Number(query.maxPrice);
      if (!isNaN(max)) {
        result = result.filter(p => p.price <= max);
      }
    }

    // Filter: minPrice
    if (query.minPrice) {
      const min = Number(query.minPrice);
      if (!isNaN(min)) {
        result = result.filter(p => p.price >= min);
      }
    }

    // Filter: minRating
    if (query.minRating) {
      const rating = Number(query.minRating);
      if (!isNaN(rating)) {
        result = result.filter(p => p.rating >= rating);
      }
    }

    // Filter: assured
    if (query.assured === 'true') {
      result = result.filter(p => p.assured === true);
    }

    // Sort
    if (query.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (query.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (query.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (query.sortBy === 'discount') {
      result.sort((a, b) => ((b.mrp - b.price) / b.mrp) - ((a.mrp - a.price) / a.mrp));
    }

    return sendJSON(res, 200, {
      success: true,
      total: result.length,
      products: result
    });
  }

  // GET /api/v1/products/:id - Single product details
  const productMatch = pathname.match(/^\/api\/v1\/products\/(\d+)$/);
  if (productMatch && req.method === 'GET') {
    const id = parseInt(productMatch[1], 10);
    const product = products.find(p => p.id === id);
    if (!product) {
      return sendJSON(res, 404, { success: false, error: 'Product not found' });
    }
    return sendJSON(res, 200, { success: true, product });
  }

  // Default 404
  return sendJSON(res, 404, { success: false, error: 'Endpoint not found in catalog-service' });
});

server.listen(PORT, () => {
  console.log(`[Catalog Service] running on http://localhost:${PORT}`);
});
