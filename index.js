const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// 目标代理地址，修改这里
const targetUrl = "https://img.remit.ee";

// 全局反代
app.use('/', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  ws: true // 支持 websocket
}));

app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});