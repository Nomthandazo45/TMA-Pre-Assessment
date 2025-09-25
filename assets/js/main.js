// Helper: simple selector
const $ = (sel) => document.querySelector(sel);

// Utility: format a number as currency (USD for demo)
function formatPrice(value) {
  return 'R' + value.toFixed(2);
}

// CART helpers (stored in localStorage so refresh keeps items)
const CART_KEY = 'ank_demo_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEls = document.querySelectorAll('#cart-count');
  const cart = getCart();
  let total = 0;
  cart.forEach(item => total += item.quantity);
  countEls.forEach(el => el.textContent = total);
}

// Add item to cart (basic): productId, quantity, option (object)
function addToCart(productId, quantity=1, option=null) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && JSON.stringify(i.option) === JSON.stringify(option));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity, option });
  }
  saveCart(cart);
  showAddedToCartMessage();
}

// Show a temporary 'Added to cart' message on screen
function showAddedToCartMessage() {
  let msg = document.getElementById('added-to-cart-msg');
  if (!msg) {
     msg = document.createElement('div');
     msg.id = 'added-to-cart-msg';
     msg.className = 'glow'; 
     msg.style.position = 'fixed';
     msg.style.top = '30px';
     msg.style.left = '50%';
     msg.style.transform = 'translateX(-50%)';
     msg.style.background = '#695656c9';
     msg.style.color = '#000000ff';
     msg.style.padding = '1rem 2rem';
     msg.style.borderRadius = '8px';
     msg.style.fontSize = '1.2rem';
     msg.style.zIndex = '9999';
     msg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
     document.body.appendChild(msg);
  }
  msg.textContent = 'Added to cart!';
  msg.style.display = 'block';
  setTimeout(() => {
    msg.style.display = 'none';
  }, 1800);
}

// Page-specific rendering: detect which page we are on
document.addEventListener('DOMContentLoaded', () => {
  // update footer year and cart count
  const year = (new Date()).getFullYear();
  const ys = document.querySelectorAll('[id^="current-year"]');
  ys.forEach(y => y.textContent = year);
  updateCartCount();

  const bodyId = document.body.id;

  if (bodyId === 'page-index') {
    renderFeatured();
    setupSignup();
  } else if (bodyId === 'page-products') {
    renderProductsGrid();
  } else if (bodyId === 'page-product') {
    renderProductPage();
  } else if (bodyId === 'page-checkout') {
    renderCartCheckout();
    setupCheckoutForm();
  } else if (bodyId === 'page-blog') {
    renderBlogList();
  } else if (bodyId === 'page-blog-post') {
    renderBlogPost();
  }
});

// Render featured products on index.html
function renderFeatured() {
  const container = $('#featured-grid');
  if (!container) return;
  // take products where featured is true (max 3)
  const featured = PRODUCTS.filter(p => p.featured).slice(0,3);
  featured.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-link">
        <img src="${p.metafields.lookbook[0]}" alt="${p.name}" />
  <h3 class="glow">${p.name}</h3>
        <p class="price">${formatPrice(p.price)}</p>
      </a>
    `;
    container.appendChild(card);
  });
}

// Render product grid on products.html
function renderProductsGrid() {
  const container = $('#products-grid');
  if (!container) return;
  PRODUCTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-link">
        <img src="${p.metafields.lookbook[0]}" alt="${p.name}" />
  <h3 class="glow">${p.name}</h3>
        <p class="price">${formatPrice(p.price)}</p>
      </a>
      <div class="card-actions">
        <button class="btn add-to-cart" data-id="${p.id}">Add to cart</button>
      </div>
    `;
    container.appendChild(card);
  });

// Signup will store emails in localStorage and send confirmation email via EmailJS
function setupSignup() {
  const form = $('#signup-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (!email) return;
    const key = 'ank_demo_emails';


  //  create template data object for your simplified template
    const templateParams = {
      to_email: email  // This tells EmailJS where to send the email
    };

    // Send confirmation email using EmailJS
    console.log('Sending email with params:', templateParams);

    emailjs.send('service_6pe9nuh', 'template_gphlz6c', templateParams, 'akiSK9OiNxva99E94')
    .then(function(response) {
      alert('Thank you for subscribing! Please check your email for confirmation.');
      form.reset();
    }, function(error) {
      alert('Sorry, there was a problem sending the confirmation email. Please try again.');
      form.reset();
    });
  });
}

  // Initialize EmailJS with my public key
  emailjs.init({
    publicKey: 'akiSK9OiNxva99E94'
  });
  
}

  // Attach click handlers for add-to-cart buttons. 
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      addToCart(id, 1, null);
    });
  });


// Render individual product page using query param ?id=
function renderProductPage() {
  const container = $('#product-container');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    container.innerHTML = '<p>Product ID not provided. Use products.html to browse.</p>';
    return;
  }
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    container.innerHTML = '<p>Product not found.</p>';
    return;
  }

  // Build HTML with metafields (size chart + ingredients) shown
  container.innerHTML = `
    <div class="prod-grid">
      <div class="prod-media">
        <img src="${product.metafields.lookbook[0]}" alt="${product.name}" />
      </div>
      <div class="prod-info">
        <h1>${product.name}</h1>
        <p class="sku">SKU: ${product.sku}</p>
        <p class="price">${formatPrice(product.price)}</p>
        <p>${product.description}</p>

        <form id="add-to-cart-form">
          <label for="qty">Quantity</label>
          <input id="qty" name="qty" type="number" value="1" min="1" />

          <!-- if sizes exist, show a select -->
          ${product.options && product.options.size ? `<label for="size">Size</label>
          <select id="size" name="size">
            ${product.options.size.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>` : ''}

          <button class="btn" type="submit">Add to cart</button>
        </form>

        <section class="meta-section">
          <h3>Ingredients</h3>
          ${product.metafields.ingredients
            ? Array.isArray(product.metafields.ingredients)
              ? `<ul class="rich-list">${product.metafields.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>`
              : `<ul class="rich-list">${product.metafields.ingredients.split(',').map(ing => `<li>${ing.trim()}</li>`).join('')}</ul>`
            : '<p>Information coming soon.</p>'}
        </section>

        <section class="meta-section">
          <h3>Candle Size Guide</h3>
          <div class="size-chart">
            <table style="margin: 0 auto; border-collapse: collapse; min-width: 220px;">
              <thead>
                <tr style="background:#f3e7d3; color:#6b4c2a;">
                  <th style="padding:8px 16px; border:1px solid #d2b48c;">Size</th>
                  <th style="padding:8px 16px; border:1px solid #d2b48c;">Burn Time</th>
                  <th style="padding:8px 16px; border:1px solid #d2b48c;">Recommended Room</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Small (120g)</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">~20 hours</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Bathroom, Office</td>
                </tr>
                <tr>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Medium (220g)</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">~35 hours</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Bedroom, Kitchen</td>
                </tr>
                <tr>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Large (350g)</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">~50 hours</td>
                  <td style="padding:8px 16px; border:1px solid #d2b48c;">Living Room, Lounge</td>
                </tr>
              </tbody>
            </table>
            <p style="text-align:center; margin-top:1rem; color:#6b4c2a;">Choose the right size for your space and enjoy the perfect ambiance!</p>
          </div>
        </section>
      </div>
    </div>
  `;

  // handle add to cart form
  const form = document.getElementById('add-to-cart-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const qty = parseInt(document.getElementById('qty').value, 10) || 1;
    const sizeEl = document.getElementById('size');
    const option = sizeEl ? { size: sizeEl.value } : null;
    addToCart(product.id, qty, option);
  });
}

// Render cart contents on checkout page
function renderCartCheckout() {
  const container = $('#cart-contents');
  if (!container) return;
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let html = '<table class="cart-table"><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead><tbody>';
  let total = 0;
  cart.forEach(item => {
    const prod = PRODUCTS.find(p => p.id === item.id);
    if (!prod) return;
    const line = prod.price * item.quantity;
    total += line;
    html += `<tr><td>${prod.name} ${item.option ? '('+JSON.stringify(item.option)+')' : ''}</td><td>${item.quantity}</td><td>${formatPrice(line)}</td></tr>`;
  });
  html += `</tbody></table><p class="total">Total: ${formatPrice(total)}</p>`;
  container.innerHTML = html;
}


// Simple checkout form behavior
function setupCheckoutForm() {
  const form = document.getElementById('checkout');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    const email = document.getElementById('email-checkout').value;
    const fullName = document.getElementById('fullName-checkout') ? document.getElementById('fullName-checkout').value : '';
    const address = document.getElementById('address-checkout') ? document.getElementById('address-checkout').value : '';
    const phone = document.getElementById('phone-checkout') ? document.getElementById('phone-checkout').value : '';
    const cart = getCart();
    
    // Calculate order total
    let orderTotal = 0;
    cart.forEach(item => {
      const prod = PRODUCTS.find(p => p.id === item.id);
      if (prod) {
        orderTotal += prod.price * item.quantity;
      }
    });

    // Create template data object for your simplified template
    const templateParams = {
      to_email: email,  // This tells EmailJS where to send the email
      full_name: fullName,
      order_id: orderId,
      shipping: 'R0.00',
      tax: 'R0.00',
      total: formatPrice(orderTotal)
    };

    // Add individual order items as separate fields since EmailJS doesn't handle arrays well
    // For your template, you might need to modify it to use these individual fields
    let orderItemsString = '';
    cart.forEach((item, index) => {
      const prod = PRODUCTS.find(p => p.id === item.id);
      if (prod) {
        const itemName = prod.name + (item.option && item.option.size ? ` (${item.option.size})` : '');
        const lineTotal = prod.price * item.quantity;
        orderItemsString += `${itemName} - Qty: ${item.quantity} - ${formatPrice(lineTotal)}\n`;
      }
    });
    
    templateParams.orders = orderItemsString;

    // Send confirmation email using EmailJS
    console.log('Sending email with params:', templateParams);
    
    emailjs.send('service_6pe9nuh', 'template_9wg2j7m', templateParams, 'akiSK9OiNxva99E94')
    .then(function(response) {
      console.log('Email sent successfully:', response.status, response.text);
      // Clear cart and show confirmation
      localStorage.removeItem(CART_KEY);
      saveCart([]);
      document.getElementById('checkout-form').style.display = 'none';
      const conf = document.getElementById('order-confirmation');
      conf.style.display = 'block';
      conf.innerHTML = `<h2>Thank you for your order</h2><p>Your order ID: <strong>${orderId}</strong></p><p>A confirmation email has been sent to <b>${email}</b>.</p>`;
    })
    .catch(function(error) {
      console.error('Email send failed:', error);
      console.log('Error details:', error.text || error.message);
      
      // Show confirmation anyway - don't let email issues block the order
      localStorage.removeItem(CART_KEY);
      saveCart([]);
      document.getElementById('checkout-form').style.display = 'none';
      const conf = document.getElementById('order-confirmation');
      conf.style.display = 'block';
      conf.innerHTML = `<h2>Thank you for your order</h2><p>Your order ID: <strong>${orderId}</strong></p><p><em>Note: There was an issue sending the confirmation email, but your order has been processed.</em></p>`;
    });
  });
}

// Render blog list page
function renderBlogList() {
  const container = $('#blog-list');
  if (!container) return;
  BLOGS.forEach(b => {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML = `
      <div class="blog-card-img-col">
        <img src="${b.featured_image}" alt="${b.title}" />
        <p class="meta">By ${b.author}</p>
      </div>
      <div class="blog-card-content-col">
        <h3><a href="blog-post.html?id=${encodeURIComponent(b.id)}">${b.title}</a></h3>
        <p class="excerpt">${b.excerpt}</p>
      </div>
    `;
    container.appendChild(article);
  });
}

// Render single blog post
function renderBlogPost() {
  const container = $('#post-container');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const post = BLOGS.find(b => b.id === id);
  if (!post) {
    container.innerHTML = '<p>Blog post not found.</p>';
    return;
  }
  let html = `
    <article class="post">
      <h1>${post.title}</h1>
      <p class="meta">By ${post.author}</p>
      <img src="${post.featured_image}" alt="${post.title}" />
  <div class="post-content glow">${post.content}</div>
      <section class="related">
        <h3>Related products</h3>
        <div class="products-grid">
  `;
  post.related_products.forEach(pid => {
    const p = PRODUCTS.find(x => x.id === pid);
    if (p) {
      html += `
        <article class="product-card small">
          <a href="product.html?id=${p.id}"><img src="${p.metafields.lookbook[0]}" alt="${p.name}" /></a>
          <h4>${p.name}</h4>
          <p class="price">${formatPrice(p.price)}</p>
        </article>
      `;
    }
  });
  html += '</div></section></article>';
  container.innerHTML = html;
}

// Hero background slideshow
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero-section');
  if (hero) {
    const images = [
      'assets/img/hero2.webp',
      'assets/img/hero3.webp'
    ];
    let idx = 0;
    hero.style.backgroundImage = `url('${images[0]}')`;
    setInterval(() => {
      idx = (idx + 1) % images.length;
      hero.style.backgroundImage = `url('${images[idx]}')`;
    }, 3500);
  }

  // Testimonials slider
  const track = document.querySelector('.testimonials-track');
  const testimonials = document.querySelectorAll('.testimonials-track blockquote');
  if (track && testimonials.length > 0) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % testimonials.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
    }, 3000);
  }
});
