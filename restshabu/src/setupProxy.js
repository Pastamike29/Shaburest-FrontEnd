const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/0', // Prefix to match for the proxy
    createProxyMiddleware({
      target: 'http://localhost:2929', // Your server URL
      changeOrigin: true,
    })
  );
};