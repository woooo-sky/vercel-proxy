const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// 目标图床接口域名
const target = "https://img.remit.ee";

// 全局开启跨域，放行所有预检请求
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: "*",
  credentials: false
}));

// 单独处理 OPTIONS 预检请求，直接返回200
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// 全局反向代理
app.use('/', createProxyMiddleware({
  target: target,
  changeOrigin: true,
  ws: false,
  // 强制携带源站校验头
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('Origin', 'https://img.remit.ee');
    proxyReq.setHeader('Referer', 'https://img.remit.ee/');
  }
}));

app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
