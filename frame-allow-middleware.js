// frame-allow-middleware.js
export function allowShopifyEmbedding(app) {
  app.use((req, res, next) => {
    // Remove restrictive headers
    res.removeHeader("X-Frame-Options");

    // Allow Shopify Admin and .myshopify.com to embed the app
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors https://admin.shopify.com https://*.myshopify.com;"
    );

    next();
  });
}
