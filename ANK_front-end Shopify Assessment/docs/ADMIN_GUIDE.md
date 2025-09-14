# Admin Guide — Warm Blazes Co. Front-End

This guide explains how to update and maintain the Warm Blazes Co. demo storefront project.

## Project Overview
This is a static HTML/CSS/JS project for a candle store. It features:
- Product catalog and product detail pages
- Add to cart and checkout (with order confirmation via EmailJS)
- Blog and blog post pages
- FAQ page
- Downloadable size guide (PDF)

## Where to Edit Data
All product and blog content is in `assets/js/data.js`:
- `PRODUCTS` array: All candle products (edit, add, or remove entries)
- `BLOGS` array: Blog posts
- `STORE` object: Store name, tagline, and colors

**Example product entry:**
```js
{
  id: "p1",
  name: "Lavender Fields Candle",
  price: 90.99,
  sku: "Warm-B-001",
  description: "A calming lavender-scented soy candle. Notes of fresh lavender and vanilla.",
  options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Lavender"] },
  metafields: {
    size_chart: "<table>...</table>",
    ingredients: "100% soy wax, cotton wick, natural essential oils.",
    lookbook: ["assets/img/p1.jpg"]
  },
  featured: true
}
```

## Images
All product and blog images are in `assets/img/` (JPG/WEBP). To update images:
- Replace the image files in `assets/img/`
- Update the `lookbook` or `featured_image` paths in `data.js` as needed

## Editing Text Content
Edit all product, blog, and store text in `assets/js/data.js`.
- To change the store name, update `STORE.name` at the top of the file.
- To change product descriptions, edit the `description` field for each product.

## Downloadable Size Guide
The downloadable size guide PDF is at `assets/TMA Assessment Downloadable Size Guide.pdf`.
- Linked from the product detail page as "Download Size Guide (PDF)".

## Running the Project Locally
1. Open the project folder in VS Code.
2. Recommended: Use the "Live Server" extension (right-click `index.html` → "Open with Live Server").
   - Or run a local server in terminal:
     ```powershell
     python -m http.server 8000
     ```
     Then open http://localhost:8000/index.html in your browser.
3. Do **not** open HTML files directly with `file://` — some features (like EmailJS) may not work.

## EmailJS Integration
Order confirmation emails are sent using EmailJS when a user completes checkout. The configuration is in `assets/js/main.js` (see `emailjs.send(...)`).

## Main Features & Files
- `index.html`: Home page (featured products, hero, signup)
- `products.html`: Product catalog
- `product.html`: Product detail (with add to cart, size guide, and PDF link)
- `checkout.html`: Cart and checkout form
- `blog.html`, `blog-post.html`: Blog list and single post
- `faq.html`: Frequently asked questions
- `assets/js/data.js`: All data (products, blogs, store info)
- `assets/js/main.js`: All site logic (cart, rendering, checkout, blog, etc.)
- `assets/css/style.css`: All site styles
- `assets/img/`: All images
- `assets/TMA Assessment Downloadable Size Guide.pdf`: Downloadable size guide

## Customization Notes
- To add new products, copy an existing entry in `PRODUCTS` and update fields.
- To add a blog post, copy an entry in `BLOGS`.
- To change site colors, edit `STORE.primaryColor` and `STORE.accentColor` in `data.js` and/or CSS variables in `assets/css/style.css`.

---
Handcrafted for Warm Blazes Co. — demo only, not a real Shopify theme.
