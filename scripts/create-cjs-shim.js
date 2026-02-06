const fs = require('fs');
const path = require('path');

const shimContent = `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./hyphen-components.cjs.production.min.js')
} else {
  module.exports = require('./hyphen-components.cjs.development.js')
}
`;

const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.js');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(indexPath, shimContent);
console.log('Created dist/index.js CJS shim');
