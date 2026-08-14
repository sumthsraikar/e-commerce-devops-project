// Search & Autocomplete Microservice (Port 5002)
const http = require('http');
const url = require('url');
const { PRODUCTS_DATA } = require('./data');

const PORT = process.env.PORT || 5002;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
      service: 'search-service',
      port: PORT,
      status: 'UP',
      endpoints: [
        '/health',
        '/api/v1/search?q=iphone',
        '/api/v1/search/suggestions?q=app'
      ]
    });
  }

  // Health check
  if (pathname === '/health' && req.method === 'GET') {
    return sendJSON(res, 200, {
      status: 'UP',
      service: 'search-service',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  }

  // GET /api/v1/search - Full-text search
  if (pathname === '/api/v1/search' && req.method === 'GET') {
    const q = (query.q || '').trim().toLowerCase();
    if (!q) {
      return sendJSON(res, 200, {
        success: true,
        query: '',
        total: PRODUCTS_DATA.length,
        results: PRODUCTS_DATA
      });
    }

    const keywords = q.split(/\s+/).filter(Boolean);
    const results = PRODUCTS_DATA.filter(p => {
      const targetStr = `${p.title} ${p.brand} ${p.category} ${p.specs ? p.specs.join(' ') : ''}`.toLowerCase();
      return keywords.every(kw => targetStr.includes(kw));
    });

    return sendJSON(res, 200, {
      success: true,
      query: q,
      total: results.length,
      results
    });
  }

  // GET /api/v1/search/suggestions - Auto-complete search suggestions
  if (pathname === '/api/v1/search/suggestions' && req.method === 'GET') {
    const q = (query.q || '').trim().toLowerCase();
    if (!q) {
      return sendJSON(res, 200, { success: true, suggestions: [] });
    }

    const suggestionsSet = new Set();
    PRODUCTS_DATA.forEach(p => {
      if (p.title.toLowerCase().includes(q)) {
        suggestionsSet.add(p.title);
      }
      if (p.brand.toLowerCase().includes(q)) {
        suggestionsSet.add(p.brand);
      }
      if (p.category.toLowerCase().includes(q)) {
        suggestionsSet.add(p.category);
      }
    });

    const suggestions = Array.from(suggestionsSet).slice(0, 6);
    return sendJSON(res, 200, {
      success: true,
      query: q,
      suggestions
    });
  }

  // Default 404
  return sendJSON(res, 404, { success: false, error: 'Endpoint not found in search-service' });
});

server.listen(PORT, () => {
  console.log(`[Search Service] running on http://localhost:${PORT}`);
});
