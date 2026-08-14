// Flipkart Microservices Orchestrator (Starts all services and gateway)
const { spawn } = require('child_process');
const path = require('path');

const SERVICES = [
  { name: 'CATALOG ', color: '\x1b[36m', file: path.join(__dirname, 'services', 'catalog-service', 'server.js') },
  { name: 'SEARCH  ', color: '\x1b[35m', file: path.join(__dirname, 'services', 'search-service', 'server.js') },
  { name: 'CART    ', color: '\x1b[33m', file: path.join(__dirname, 'services', 'cart-service', 'server.js') },
  { name: 'ORDER   ', color: '\x1b[32m', file: path.join(__dirname, 'services', 'order-service', 'server.js') },
  { name: 'WISHLIST', color: '\x1b[34m', file: path.join(__dirname, 'services', 'wishlist-service', 'server.js') },
  { name: 'GATEWAY ', color: '\x1b[31m', file: path.join(__dirname, 'gateway', 'server.js') }
];

const processes = [];

console.log('\x1b[1m\x1b[32m%s\x1b[0m', '=======================================================');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', '  Starting Flipkart Microservices Ecosystem');
console.log('\x1b[1m\x1b[32m%s\x1b[0m', '=======================================================');

SERVICES.forEach(svc => {
  const child = spawn('node', [svc.file], {
    cwd: path.dirname(svc.file),
    env: { ...process.env, FORCE_COLOR: '1' }
  });

  child.stdout.on('data', data => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line) {
        console.log(`${svc.color}[${svc.name}]\x1b[0m ${line}`);
      }
    });
  });

  child.stderr.on('data', data => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line) {
        console.error(`${svc.color}[${svc.name} ERR]\x1b[0m ${line}`);
      }
    });
  });

  child.on('close', code => {
    console.log(`${svc.color}[${svc.name}]\x1b[0m Process exited with code ${code}`);
  });

  processes.push(child);
});

function cleanup() {
  console.log('\nShutting down all microservices...');
  processes.forEach(p => p.kill());
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
