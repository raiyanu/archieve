import { createProxyMiddleware } from 'http-proxy-middleware';
// const { createProxyMiddleware } = require('http-proxy-middleware');

const backendServer = 'http://localhost:6969'; // Replace with your backend server URL

const backendProxy = createProxyMiddleware('/api', {
  target: backendServer,
  changeOrigin: true,
});

module.exports = function (app) {
  app.use(backendProxy);
};
