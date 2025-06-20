// Load environment variables from .env
require('dotenv').config();

// Patch global.fetch if not already defined
if (typeof fetch === 'undefined') {
  global.fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
}

// Dynamically import and run the dubhe CLI
(async () => {
  await import('./node_modules/@0xobelisk/sui-cli/dist/dubhe.js');
})();
