import express from "express";

const app = express();

// Allow Shopify to embed your app inside Admin
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://admin.shopify.com https://*.myshopify.com;"
  );
  next();
});

console.log("✅ Shopify iframe embedding enabled");
