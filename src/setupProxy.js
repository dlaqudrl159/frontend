// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8050',
      changeOrigin: true,
    })
  ),
  app.use(
    '/data',
    createProxyMiddleware({
      target: 'http://localhost:8050',
      changeOrigin: true,
    })
  ),
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:8050',
      changeOrigin: true,
    })
  );
};