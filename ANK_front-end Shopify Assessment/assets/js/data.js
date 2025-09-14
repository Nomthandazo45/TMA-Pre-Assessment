
/* i put product data in JS (instead of fetching JSON like i wa advide by a friend),
  because many browsers block fetch() from file://. So this keeps the project simple for me.
*/

const STORE = {
  name: "Warm Blazes Co.",
  tagline: "Hand-poured artisanal soy candles",
  primaryColor: "#765bff",
  accentColor: " hsl(315, 50%, 53%)"
};

const PRODUCTS = [
  {
    id: "p1",
    name: "Lavender Fields Candle",
    price: 90.99,
    sku: "Warm-B-001",
    description: "A calming lavender-scented soy candle. Notes of fresh lavender and vanilla.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Lavender"] },
    metafields: {
      size_chart: "<table><tr><th>Size</th><th>Burn time</th></tr><tr><td>Small</td><td>20-30 hrs</td></tr><tr><td>Medium</td><td>40-50 hrs</td></tr><tr><td>Large</td><td>80-90 hrs</td></tr></table>",
      ingredients: "100% soy wax, cotton wick, natural essential oils.",
      lookbook: ["assets/img/p1.jpg"]
    },
    featured: true
  },
  {
    id: "p2",
    name: "Vanilla Bean Glow Candle",
    price: 67.50,
    sku: "Warm-B-002",
    description: "Warm vanilla with sweet caramel notes — a cozy classic.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Vanilla"] },
    metafields: {
      size_chart: "<p>Medium: approx 40 hrs burn time.</p>",
      ingredients: "Soy wax, vanilla fragrance, cotton wick.",
      lookbook: ["assets/img/p2.jpg"]
    },
    featured: true
  },
  {
    id: "p3",
    name: "Citrus Grove Candle",
    price: 75.00,
    sku: "Warm-B-003",
    description: "Bright citrus top notes for an energizing, fresh scent.",
    options: { size:["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Citrus"] },
    metafields: { size_chart: "", ingredients: "Soy wax, fragrance oils", 
      lookbook: ["assets/img/p3.jpg"] },
    featured: true
  },
  {
    id: "p4",
    name: "Eucalyptus Breeze Candle",
    price: 99.99,
    sku: "Warm-B-004",
    description: "Cool eucalyptus and mint blend for a refreshing home aroma.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Eucalyptus"] },
    metafields: { size_chart: "", ingredients: "Soy wax, mint & eucalyptus oils", 
      lookbook: ["assets/img/p4.jpg"] },
    featured: false
  },
  {
    id: "p5",
    name: "Rose Petal Candle",
    price: 88.00,
    sku: "Warm-B-005",
    description: "Soft floral rose with a romantic finish.",
    options: { size:["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Rose"] },
    metafields: { size_chart: "", ingredients: "Soy wax, rose fragrance", 
      lookbook: ["assets/img/p5.jpg"] },
    featured: false
  },
  {
    id: "p6",
    name: "Sandalwood & Amber",
    price: 45.00,
    sku: "Warm-B-006",
    description: "Deep woodsy scent with amber warmth.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Sandalwood"] },
    metafields: { size_chart: "", ingredients: "Soy wax, sandalwood oil", 
      lookbook: ["assets/img/p6.jpg"] },
    featured: false
  },
  {
    id: "p7",
    name: "Sea Salt & Driftwood",
    price: 50.99,
    sku: "Warm-B-007",
    description: "Oceanic freshness with a woody base.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Sea Salt"] },
    metafields: { size_chart: "", ingredients: "Soy wax, marine fragrance", 
      lookbook: ["assets/img/p7.jpg"] },
    featured: false
  },
  {
    id: "p8",
    name: "Cocoa & Coffee Blend",
    price: 49.99,
    sku: "Warm-B-008",
    description: "Rich notes of cocoa and dark roast coffee combined.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Cocoa"] },
    metafields: { size_chart: "", ingredients: "Soy wax, coffee & cocoa fragrance", 
      lookbook: ["assets/img/p8.jpg"] },
    featured: false
  },
  {
    id: "p9",
    name: "Fresh Linen Candle",
    price: 92.99,
    sku: "Warm-B-009",
    description: "Crisp clean linen scent, great for bedrooms and bathrooms.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Linen"] },
    metafields: { size_chart: "", ingredients: "Soy wax, linen fragrance", 
      lookbook: ["assets/img/p9.jpg"] },
    featured: false
  },
  {
    id: "p10",
    name: "Spiced Orange Candle",
    price: 79.99,
    sku: "Warm-B-010",
    description: "Warm orange zest with festive spices.",
    options: { size: ["Small (150g)", "Medium (300g)", "Large (600g)"], scent: ["Orange"] },
    metafields: { size_chart: "", ingredients: "Soy wax, orange & spice oils", 
      lookbook: ["assets/img/p10.jpg"] },
    featured: false
  }
];

const BLOGS = [
  {
    id: "b1",
    title: "How to Care for Your Soy Candle",
    excerpt: "Simple tips to increase burn time and keep your candle looking and smelling great.",
    content: "<p>Trim the wick, burn for 2-3 hours per session, and keep away from drafts.</p>",
  featured_image: "assets/img/blogs.webp",
    author: "Annah Khumalo",
    related_products: ["p1","p2"]
  },
  {
    id: "b2",
    title: "Behind the Brand: Why We Choose Soy",
    excerpt: "A short explanation of why soy wax is a sustainable choice.",
    content: "<p>Soy wax is renewable and burns cleaner than many paraffin blends. In this shop we use natural fragrances...</p>",
  featured_image: "assets/img/blogs.webp",
    author: "Annah Khumalo",
    related_products: ["p3"]
  }
];
