
# Admin Guide — ANK Candle Co. (Demo)

This short guide explains where to edit content in this demo front-end project.

## Where data lives
All product and blog content is stored in `assets/js/data.js`. This file contains two arrays: `PRODUCTS` and `BLOGS` and a `STORE` object for site-wide strings/colors.

Example product entry (edit or add entries here):
```js
{
  id: "p1",
  name: "Lavender Fields Soy Candle",
  price: 18.00,
  sku: "ANK-CAN-001",
  description: "A calming lavender-scented soy candle.",
  options: { size: ["Small","Medium"] },
  metafields: { size_chart: "<table>...</table>", ingredients: "..." },
  featured: true
}
```

## Adding images
Images are in `assets/img/`. They are simple SVG placeholders in this demo. Replace them with your real JPEG/PNG files and update the `lookbook` paths in `data.js`.

## How to update text content
Edit `assets/js/data.js`. For example, to change the store name, edit the `STORE.name` value near the top of that file.

## How to run locally
1. Open the `ANK_front-end` folder in VS Code.
2. Recommended: Install the "Live Server" extension in VS Code and click "Go Live", or run a simple HTTP server from terminal:
   ```bash
   python -m http.server 8000
   ```
   Then open http://localhost:8000/ANK_front-end/index.html in your browser.
3. Don't open HTML files via `file://` in some browsers — some features (like loading JSON) may be blocked. The demo embeds data in JS to avoid this problem.

## Notes for mentors
- The project is intentionally simple and data-driven to show where content lives.
- For a real Shopify theme, metafields would be registered in Shopify admin and surfaced in Liquid templates.
