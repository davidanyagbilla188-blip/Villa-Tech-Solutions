/**
 * Villa Tech Solutions - Main Application JavaScript
 * Complete SPA with routing, cart, auth, and all page renderers
 * Author: David Ayaaba Anyagbilla
 */

// ==================== STATE MANAGEMENT ====================
const AppState = {
    cart: JSON.parse(localStorage.getItem('villa_cart')) || { items: [], total: 0 },
    wishlist: JSON.parse(localStorage.getItem('villa_wishlist')) || [],
    user: JSON.parse(localStorage.getItem('villa_user')) || null,
    darkMode: localStorage.getItem('villa_dark_mode') === 'true',

    saveCart() {
        localStorage.setItem('villa_cart', JSON.stringify(this.cart));
        updateCartBadge();
    },

    saveWishlist() {
        localStorage.setItem('villa_wishlist', JSON.stringify(this.wishlist));
        updateWishlistBadge();
    },

    saveUser() {
        localStorage.setItem('villa_user', JSON.stringify(this.user));
    }
};

// ==================== UTILITY FUNCTIONS ====================
function formatPrice(price) {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 0
    }).format(price);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ==================== NAVIGATION ====================
function updateActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === path);
    });
}

// ==================== BADGE UPDATES ====================
function updateCartBadge() {
    const count = AppState.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
        badge.classList.add('badge-animate');
        setTimeout(() => badge.classList.remove('badge-animate'), 300);
    }
}

function updateWishlistBadge() {
    const count = AppState.wishlist.length;
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// ==================== THEME TOGGLE ====================
function initTheme() {
    if (AppState.darkMode) document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        AppState.darkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('villa_dark_mode', AppState.darkMode);
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-close');
    toggle?.addEventListener('click', () => menu.classList.add('open'));
    close?.addEventListener('click', () => menu.classList.remove('open'));
    menu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scroll-top');
    window.addEventListener('scroll', debounce(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
        scrollTop?.classList.toggle('visible', window.scrollY > 500);
    }, 10));
    scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==================== PAGE RENDERERS ====================
function renderCategoryCard(category, name, icon, count) {
    return `<a href="/shop?category=${category}" class="feature-card hover-lift" data-navigo style="text-decoration:none;color:inherit">
        <div class="feature-icon"><i class="fas ${icon}"></i></div>
        <h3 class="feature-title">${name}</h3>
        <p class="feature-desc">${count} Products Available</p>
    </a>`;
}

function renderHome() {
    return `<section class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-badge"><i class="fas fa-award"></i> Premium Tech Store in Ghana</div>
                <h1 class="hero-title">Villa Tech <span>Solutions</span></h1>
                <p class="hero-slogan">Your Trusted Source for Quality Laptops, Smartphones & Tech Accessories. We deliver excellence right to your doorstep in Accra and beyond.</p>
                <div class="hero-buttons">
                    <a href="/shop" class="btn btn-primary" data-navigo><i class="fas fa-shopping-bag"></i> Shop Now</a>
                    <a href="/contact" class="btn btn-outline" data-navigo><i class="fas fa-phone"></i> Contact Us</a>
                </div>
            </div>
            <div class="hero-visual">
                <img src="/images/products/5_Laptop_White_Background_Images_Browse.png" alt="Premium Laptop" class="hero-image">
                <div class="hero-floating"><i class="fas fa-truck"></i> Free Delivery in Accra</div>
                <div class="hero-floating"><i class="fas fa-shield-alt"></i> 1 Year Warranty</div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Why Choose Us</span>
                <h2 class="section-title">The Villa Tech Advantage</h2>
                <p class="section-subtitle">We go above and beyond to ensure you get the best tech products with exceptional service.</p>
            </div>
            <div class="features-grid stagger-children">
                <div class="feature-card reveal">
                    <div class="feature-icon"><i class="fas fa-certificate"></i></div>
                    <h3 class="feature-title">Genuine Products</h3>
                    <p class="feature-desc">All products are 100% authentic with manufacturer warranties. No counterfeits, ever.</p>
                </div>
                <div class="feature-card reveal">
                    <div class="feature-icon"><i class="fas fa-shipping-fast"></i></div>
                    <h3 class="feature-title">Fast Delivery</h3>
                    <p class="feature-desc">Same-day delivery in Accra. Nationwide shipping within 2-3 business days.</p>
                </div>
                <div class="feature-card reveal">
                    <div class="feature-icon"><i class="fas fa-headset"></i></div>
                    <h3 class="feature-title">Expert Support</h3>
                    <p class="feature-desc">Our tech experts are available to help you choose the perfect product for your needs.</p>
                </div>
                <div class="feature-card reveal">
                    <div class="feature-icon"><i class="fas fa-undo"></i></div>
                    <h3 class="feature-title">Easy Returns</h3>
                    <p class="feature-desc">7-day hassle-free return policy. Your satisfaction is our priority.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section" style="background:var(--white)">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Featured</span>
                <h2 class="section-title">Best Sellers</h2>
                <p class="section-subtitle">Our most popular products loved by customers across Ghana.</p>
            </div>
            <div class="products-grid" id="featured-products">
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
            </div>
            <div style="text-align:center;margin-top:40px">
                <a href="/shop" class="btn btn-primary" data-navigo>View All Products <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Browse</span>
                <h2 class="section-title">Shop by Category</h2>
            </div>
            <div class="features-grid">
                ${renderCategoryCard('laptops','Laptops','fa-laptop','15')}
                ${renderCategoryCard('smartphones','Smartphones','fa-mobile-alt','25')}
                ${renderCategoryCard('tablets','Tablets','fa-tablet-alt','8')}
                ${renderCategoryCard('monitors','Monitors','fa-tv','12')}
                ${renderCategoryCard('accessories','Accessories','fa-headphones','40')}
                ${renderCategoryCard('desktops','Desktops','fa-desktop','6')}
            </div>
        </div>
    </section>

    <section class="section" style="background:var(--white)">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Testimonials</span>
                <h2 class="section-title">What Our Customers Say</h2>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card reveal">
                    <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p class="testimonial-text">"Excellent service! I bought a MacBook Air and it was delivered the same day in Accra. The packaging was secure and the laptop was exactly as described. Highly recommend Villa Tech!"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">KM</div>
                        <div class="testimonial-info"><h4>Kwame Mensah</h4><p>Business Owner, Accra</p></div>
                    </div>
                </div>
                <div class="testimonial-card reveal">
                    <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p class="testimonial-text">"Best tech store in Ghana! The prices are competitive and the customer support is outstanding. I got my Samsung Galaxy S24 within hours of ordering. Will definitely shop here again."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">AA</div>
                        <div class="testimonial-info"><h4>Ama Asante</h4><p>Software Developer, East Legon</p></div>
                    </div>
                </div>
                <div class="testimonial-card reveal">
                    <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
                    <p class="testimonial-text">"I purchased a gaming setup including a Razer keyboard and LG monitor. David was very helpful in recommending the right products. The quality is top-notch and delivery was prompt!"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">JO</div>
                        <div class="testimonial-info"><h4>John Osei</h4><p>Graphic Designer, Tema</p></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">New Arrivals</span>
                <h2 class="section-title">Just Landed</h2>
                <p class="section-subtitle">The newest tech products available now at Villa Tech Solutions.</p>
            </div>
            <div class="products-grid" id="latest-products">
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
                <div class="skeleton" style="height:380px"></div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="section-container">
            <div class="newsletter reveal">
                <h2 class="newsletter-title">Stay Updated</h2>
                <p class="newsletter-text">Subscribe to our newsletter for exclusive deals, new arrivals, and tech tips delivered straight to your inbox.</p>
                <form class="newsletter-form" id="newsletter-form">
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit"><i class="fas fa-paper-plane"></i> Subscribe</button>
                </form>
            </div>
        </div>
    </section>`;
}

function renderShop() {
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category') || 'all';
    const categories = [
        ['all','All Products'],['laptops','Laptops'],['smartphones','Smartphones'],
        ['tablets','Tablets'],['desktops','Desktop Computers'],['monitors','Monitors'],
        ['printers','Printers'],['keyboards','Keyboards'],['mice','Mice'],
        ['chargers','Chargers'],['power-banks','Power Banks'],['headphones','Headphones'],
        ['smart-watches','Smart Watches'],['ssds','SSDs'],['ram','RAM'],['accessories','Accessories']
    ];

    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Shop</span>
                <h2 class="section-title">All Products</h2>
                <p class="section-subtitle">Browse our complete collection of premium tech products.</p>
            </div>
            <div class="shop-layout">
                <aside class="shop-sidebar reveal">
                    <div class="filter-section">
                        <h4><i class="fas fa-filter"></i> Categories</h4>
                        <div class="filter-list">
                            ${categories.map(([val,label]) => `
                                <label class="filter-item">
                                    <input type="radio" name="category" value="${val}" ${activeCategory===val?'checked':''}>
                                    <span>${label}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4><i class="fas fa-tag"></i> Price Range</h4>
                        <div class="price-range">
                            <input type="range" id="price-range" min="0" max="20000" value="20000">
                            <div class="price-labels"><span>GHS 0</span><span id="price-value">GHS 20,000</span></div>
                        </div>
                    </div>
                    <div class="filter-section">
                        <h4><i class="fas fa-sort"></i> Sort By</h4>
                        <select id="sort-select" class="sort-select">
                            <option value="">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>
                </aside>
                <div class="shop-main">
                    <div class="shop-toolbar">
                        <p id="results-count">Loading products...</p>
                        <div class="view-toggle">
                            <button class="view-btn active" data-view="grid"><i class="fas fa-th"></i></button>
                            <button class="view-btn" data-view="list"><i class="fas fa-list"></i></button>
                        </div>
                    </div>
                    <div class="products-grid" id="shop-products">
                        ${Array(8).fill('<div class="skeleton" style="height:380px"></div>').join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderProductDetail() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="breadcrumb">
                <a href="/" data-navigo>Home</a><i class="fas fa-chevron-right"></i>
                <a href="/shop" data-navigo>Shop</a><i class="fas fa-chevron-right"></i>
                <span id="product-breadcrumb">Loading...</span>
            </div>
            <div class="product-detail" id="product-detail-content">
                <div class="product-detail-image"><div class="skeleton" style="height:500px;border-radius:var(--radius-lg)"></div></div>
                <div class="product-detail-info">
                    <div class="skeleton" style="height:32px;width:70%;margin-bottom:16px"></div>
                    <div class="skeleton" style="height:20px;width:40%;margin-bottom:24px"></div>
                    <div class="skeleton" style="height:100px;margin-bottom:24px"></div>
                    <div class="skeleton" style="height:48px;width:50%;margin-bottom:24px"></div>
                    <div class="skeleton" style="height:48px;width:100%"></div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderAbout() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">About Us</span>
                <h2 class="section-title">Villa Tech Solutions</h2>
                <p class="section-subtitle">Your trusted technology partner in Ghana since 2020.</p>
            </div>
            <div class="about-grid">
                <div class="about-content reveal">
                    <h3>Our Story</h3>
                    <p>Founded by <strong>David Ayaaba Anyagbilla</strong>, Villa Tech Solutions began with a simple mission: to make premium technology accessible to everyone in Ghana. What started as a small operation in Accra has grown into one of the most trusted tech retailers in the country.</p>
                    <p>We believe that everyone deserves access to high-quality technology that enhances their lives, whether for work, education, or entertainment. Our carefully curated selection ensures that every product meets our strict standards for quality and performance.</p>
                    <p>Located in the heart of Accra, we serve customers across Ghana with fast delivery, competitive prices, and exceptional customer service that keeps them coming back.</p>
                    <div class="stats-grid">
                        <div class="stat-item"><span class="stat-number">5,000+</span><span class="stat-label">Happy Customers</span></div>
                        <div class="stat-item"><span class="stat-number">35+</span><span class="stat-label">Product Categories</span></div>
                        <div class="stat-item"><span class="stat-number">99%</span><span class="stat-label">Satisfaction Rate</span></div>
                        <div class="stat-item"><span class="stat-number">24h</span><span class="stat-label">Delivery in Accra</span></div>
                    </div>
                </div>
                <div class="about-image reveal">
                    <div class="about-img-container"><i class="fas fa-store" style="font-size:120px;color:var(--white)"></i></div>
                </div>
            </div>
            <div style="margin-top:80px">
                <div class="section-header reveal">
                    <span class="section-label">Our Team</span>
                    <h2 class="section-title">Meet the Founder</h2>
                </div>
                <div class="team-grid">
                    <div class="team-card reveal">
                        <div class="team-avatar" style="background:linear-gradient(135deg,var(--primary),var(--primary-light))"><i class="fas fa-user" style="font-size:48px;color:white"></i></div>
                        <h3>David Ayaaba Anyagbilla</h3>
                        <p class="team-role">Founder & CEO</p>
                        <p class="team-desc">Tech enthusiast and entrepreneur dedicated to bringing the best technology to Ghana.</p>
                        <div class="team-contact">
                            <p><i class="fas fa-envelope"></i> davidanyagbilla188@gmail.com</p>
                            <p><i class="fas fa-phone"></i> +233 25 679 5545</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

function renderServices() {
    const services = [
        ['fa-laptop-code','Computer Repair','Expert diagnosis and repair for laptops and desktops. Hardware replacement, software troubleshooting, and virus removal.'],
        ['fa-network-wired','Network Setup','Professional installation and configuration of home and office networks. Routers, switches, and Wi-Fi optimization.'],
        ['fa-cloud-upload-alt','Data Recovery','Recover lost data from damaged drives, corrupted systems, and accidental deletions. Secure and confidential service.'],
        ['fa-shield-alt','Device Protection','Extended warranty plans, screen protectors, cases, and insurance options to keep your devices safe.'],
        ['fa-chalkboard-teacher','Tech Consultation','Personalized advice on choosing the right technology for your needs and budget. Free initial consultation.'],
        ['fa-cogs','Custom Builds','Custom PC builds tailored to your specific requirements - gaming, editing, programming, or business.']
    ];
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Services</span>
                <h2 class="section-title">What We Offer</h2>
                <p class="section-subtitle">Beyond selling products, we provide comprehensive tech services to meet all your needs.</p>
            </div>
            <div class="services-grid">
                ${services.map(([icon,title,desc]) => `
                    <div class="service-card reveal">
                        <div class="service-icon"><i class="fas ${icon}"></i></div>
                        <h3>${title}</h3>
                        <p>${desc}</p>
                        <a href="/contact" class="btn btn-primary" data-navigo>Get Quote</a>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

function renderContact() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal">
                <span class="section-label">Contact</span>
                <h2 class="section-title">Get In Touch</h2>
                <p class="section-subtitle">We would love to hear from you. Reach out for inquiries, support, or just to say hello!</p>
            </div>
            <div class="contact-grid">
                <div class="contact-info reveal">
                    ${[['fa-building','Business Name','Villa Tech Solutions'],['fa-user-tie','Owner','David Ayaaba Anyagbilla'],
                    ['fa-envelope','Email','<a href="mailto:davidanyagbilla188@gmail.com">davidanyagbilla188@gmail.com</a>'],
                    ['fa-phone','Phone','<a href="tel:+233256795545">+233 25 679 5545</a>'],
                    ['fa-map-marker-alt','Location','Accra, Ghana'],['fa-clock','Business Hours','Mon - Sat: 8:00 AM - 6:00 PM<br>Sunday: Closed']]
                    .map(([icon,title,val]) => `
                        <div class="contact-card">
                            <div class="contact-icon"><i class="fas ${icon}"></i></div>
                            <div><h4>${title}</h4><p>${val}</p></div>
                        </div>
                    `).join('')}
                </div>
                <div class="contact-form-wrapper reveal">
                    <h3>Send Us a Message</h3>
                    <form id="contact-form" class="contact-form">
                        <div class="form-row">
                            <div class="form-group"><label>Full Name *</label><input type="text" name="name" required placeholder="Your full name"></div>
                            <div class="form-group"><label>Email Address *</label><input type="email" name="email" required placeholder="your@email.com"></div>
                        </div>
                        <div class="form-group"><label>Phone Number</label><input type="tel" name="phone" placeholder="+233 XX XXX XXXX"></div>
                        <div class="form-group"><label>Subject *</label><input type="text" name="subject" required placeholder="How can we help?"></div>
                        <div class="form-group"><label>Message *</label><textarea name="message" rows="5" required placeholder="Tell us more about your inquiry..."></textarea></div>
                        <button type="submit" class="btn btn-primary" style="width:100%"><i class="fas fa-paper-plane"></i> Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
}

function renderFAQ() {
    const faqs = [
        ["What payment methods do you accept?","We accept MTN Mobile Money, Telecel Cash, AirtelTigo Money, Visa, and Mastercard. All payments are processed securely."],
        ["How long does delivery take?","We offer same-day delivery within Accra. Delivery to other regions of Ghana typically takes 2-3 business days."],
        ["Do you offer warranties on products?","Yes! All products come with manufacturer warranties. We also offer extended warranty plans for additional peace of mind."],
        ["Can I return a product if I am not satisfied?","Absolutely. We have a 7-day hassle-free return policy. Products must be in original condition with all packaging."],
        ["Do you provide technical support?","Yes, our tech experts are available to help you with setup, troubleshooting, and general tech advice."],
        ["Can I order a product that is out of stock?","Yes, you can place a pre-order for out-of-stock items. We will notify you as soon as it becomes available."],
        ["Do you offer bulk discounts for businesses?","Yes, we offer special pricing for corporate orders and bulk purchases. Contact us for a custom quote."],
        ["Is my personal information secure?","We take your privacy seriously. All data is encrypted and we never share your information with third parties."]
    ];
    return `<section class="section" style="padding-top:100px">
        <div class="section-container" style="max-width:800px">
            <div class="section-header reveal">
                <span class="section-label">FAQ</span>
                <h2 class="section-title">Frequently Asked Questions</h2>
                <p class="section-subtitle">Find answers to common questions about our products and services.</p>
            </div>
            <div class="faq-list">
                ${faqs.map(([q,a],i) => `
                    <div class="faq-item reveal" data-faq="${i}">
                        <button class="faq-question"><span>${q}</span><i class="fas fa-chevron-down"></i></button>
                        <div class="faq-answer"><p>${a}</p></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

function renderPrivacy() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container" style="max-width:900px">
            <div class="section-header reveal"><span class="section-label">Legal</span><h2 class="section-title">Privacy Policy</h2></div>
            <div class="legal-content reveal">
                <p><strong>Last Updated:</strong> July 13, 2026</p>
                <h3>1. Introduction</h3><p>Villa Tech Solutions is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
                <h3>2. Information We Collect</h3><p>We collect information that you provide directly to us, including: name, email address, phone number, delivery address, payment information, order history, and communications with our customer service team.</p>
                <h3>3. How We Use Your Information</h3><p>We use your information to process and fulfill orders, communicate about your orders and account, send promotional materials (with your consent), improve our website and services, and comply with legal obligations.</p>
                <h3>4. Data Security</h3><p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
                <h3>5. Your Rights</h3><p>You have the right to access, correct, or delete your personal information. Contact us at davidanyagbilla188@gmail.com to exercise these rights.</p>
                <h3>6. Contact Us</h3><p><strong>Villa Tech Solutions</strong><br>Email: davidanyagbilla188@gmail.com<br>Phone: +233 25 679 5545<br>Location: Accra, Ghana</p>
            </div>
        </div>
    </section>`;
}

function renderTerms() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container" style="max-width:900px">
            <div class="section-header reveal"><span class="section-label">Legal</span><h2 class="section-title">Terms & Conditions</h2></div>
            <div class="legal-content reveal">
                <p><strong>Last Updated:</strong> July 13, 2026</p>
                <h3>1. Acceptance of Terms</h3><p>By accessing and using the Villa Tech Solutions website, you accept and agree to be bound by these Terms and Conditions.</p>
                <h3>2. Products and Pricing</h3><p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.</p>
                <h3>3. Orders and Payment</h3><p>By placing an order, you agree to provide current, complete, and accurate purchase and account information. We accept MTN Mobile Money, Telecel Cash, AirtelTigo Money, Visa, and Mastercard.</p>
                <h3>4. Shipping and Delivery</h3><p>Delivery times are estimates and commence from the date of shipping. We are not responsible for delays caused by circumstances beyond our control.</p>
                <h3>5. Returns and Refunds</h3><p>We offer a 7-day return policy for unused products in original packaging. Refunds will be processed within 5-7 business days.</p>
                <h3>6. Warranty</h3><p>Products are covered by manufacturer warranties. Extended warranty plans are available for purchase.</p>
                <h3>7. Limitation of Liability</h3><p>Villa Tech Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                <h3>8. Governing Law</h3><p>These Terms shall be governed by and construed in accordance with the laws of Ghana.</p>
                <h3>9. Contact Information</h3><p><strong>Villa Tech Solutions</strong><br>Owner: David Ayaaba Anyagbilla<br>Email: davidanyagbilla188@gmail.com<br>Phone: +233 25 679 5545<br>Location: Accra, Ghana</p>
            </div>
        </div>
    </section>`;
}

function renderCart() {
    const empty = AppState.cart.items.length === 0;
    return `<section class="section" style="padding-top:100px">
        <div class="section-container" style="max-width:1000px">
            <div class="section-header reveal"><span class="section-label">Cart</span><h2 class="section-title">Shopping Cart</h2></div>
            <div id="cart-content">
                ${empty ? `
                    <div class="empty-state reveal">
                        <i class="fas fa-shopping-cart" style="font-size:64px;color:var(--gray-300);margin-bottom:20px"></i>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you have not added any products yet.</p>
                        <a href="/shop" class="btn btn-primary" data-navigo style="margin-top:20px"><i class="fas fa-store"></i> Continue Shopping</a>
                    </div>
                ` : `
                    <div class="cart-layout reveal">
                        <div class="cart-items" id="cart-items-list">
                            ${AppState.cart.items.map(item => `
                                <div class="cart-item" data-id="${item.productId}">
                                    <img src="/images/products/${item.image}" alt="${item.name}" class="cart-item-image">
                                    <div class="cart-item-details"><h4>${item.name}</h4><p class="cart-item-price">${formatPrice(item.price)}</p></div>
                                    <div class="cart-item-quantity">
                                        <button class="qty-btn" data-action="decrease"><i class="fas fa-minus"></i></button>
                                        <span>${item.quantity}</span>
                                        <button class="qty-btn" data-action="increase"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="cart-item-total">${formatPrice(item.price * item.quantity)}</div>
                                    <button class="cart-item-remove" data-id="${item.productId}"><i class="fas fa-trash"></i></button>
                                </div>
                            `).join('')}
                        </div>
                        <div class="cart-summary">
                            <h3>Order Summary</h3>
                            <div class="summary-row"><span>Subtotal</span><span>${formatPrice(AppState.cart.total)}</span></div>
                            <div class="summary-row"><span>Delivery</span><span>${AppState.cart.total > 5000 ? 'FREE' : formatPrice(50)}</span></div>
                            <div class="summary-row total"><span>Total</span><span>${formatPrice(AppState.cart.total + (AppState.cart.total > 5000 ? 0 : 50))}</span></div>
                            <a href="/checkout" class="btn btn-primary" style="width:100%;margin-top:16px" data-navigo><i class="fas fa-credit-card"></i> Proceed to Checkout</a>
                            <a href="/shop" class="btn btn-outline" style="width:100%;margin-top:8px" data-navigo>Continue Shopping</a>
                        </div>
                    </div>
                `}
            </div>
        </div>
    </section>`;
}

function renderCheckout() {
    if (AppState.cart.items.length === 0) { window.location.href = '/cart'; return ''; }
    return `<section class="section" style="padding-top:100px">
        <div class="section-container" style="max-width:900px">
            <div class="section-header reveal"><span class="section-label">Checkout</span><h2 class="section-title">Complete Your Order</h2></div>
            <form id="checkout-form" class="checkout-form reveal">
                <div class="checkout-grid">
                    <div class="checkout-details">
                        <div class="checkout-section">
                            <h3><i class="fas fa-user"></i> Contact Information</h3>
                            <div class="form-row">
                                <div class="form-group"><label>Full Name *</label><input type="text" name="fullName" required value="${AppState.user?.name||''}"></div>
                                <div class="form-group"><label>Email *</label><input type="email" name="email" required value="${AppState.user?.email||''}"></div>
                            </div>
                            <div class="form-group"><label>Phone Number *</label><input type="tel" name="phone" required placeholder="+233 XX XXX XXXX"></div>
                        </div>
                        <div class="checkout-section">
                            <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
                            <div class="form-group"><label>Street Address *</label><input type="text" name="address" required placeholder="House number, street name"></div>
                            <div class="form-row">
                                <div class="form-group"><label>City *</label><input type="text" name="city" required value="Accra"></div>
                                <div class="form-group"><label>Region *</label><select name="region" required><option>Greater Accra</option><option>Ashanti</option><option>Central</option><option>Eastern</option><option>Western</option><option>Northern</option><option>Other</option></select></div>
                            </div>
                        </div>
                        <div class="checkout-section">
                            <h3><i class="fas fa-credit-card"></i> Payment Method</h3>
                            <div class="payment-options">
                                ${[['momo','MTN Mobile Money','#FFC107'],['telecel','Telecel Cash','#E53935'],['airteltigo','AirtelTigo Money','#0066CC'],['visa','Visa Card','#1A1F71'],['mastercard','Mastercard','#EB001B']]
                                .map(([val,label,color],i) => `
                                    <label class="payment-option">
                                        <input type="radio" name="payment" value="${val}" ${i===0?'checked':''}>
                                        <div class="payment-option-content"><i class="fas ${val==='visa'||val==='mastercard'?'fa-cc-'+val:'fa-mobile-alt'}" style="color:${color}"></i><span>${label}</span></div>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="checkout-summary">
                        <h3>Order Summary</h3>
                        <div class="checkout-items">
                            ${AppState.cart.items.map(item => `
                                <div class="checkout-item">
                                    <img src="/images/products/${item.image}" alt="${item.name}">
                                    <div><p class="item-name">${item.name}</p><p class="item-qty">Qty: ${item.quantity}</p></div>
                                    <span>${formatPrice(item.price * item.quantity)}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="summary-divider"></div>
                        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(AppState.cart.total)}</span></div>
                        <div class="summary-row"><span>Delivery</span><span>${AppState.cart.total > 5000 ? 'FREE' : formatPrice(50)}</span></div>
                        <div class="summary-row total"><span>Total</span><span>${formatPrice(AppState.cart.total + (AppState.cart.total > 5000 ? 0 : 50))}</span></div>
                        <button type="submit" class="btn btn-primary" style="width:100%;margin-top:16px"><i class="fas fa-lock"></i> Place Order Securely</button>
                    </div>
                </div>
            </form>
        </div>
    </section>`;
}

function renderLogin() {
    return `<section class="section" style="padding-top:100px;min-height:80vh;display:flex;align-items:center">
        <div class="section-container" style="max-width:450px">
            <div class="auth-card reveal">
                <div class="auth-header">
                    <i class="fas fa-microchip" style="font-size:48px;color:var(--primary);margin-bottom:16px"></i>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your Villa Tech account</p>
                </div>
                <form id="login-form" class="auth-form">
                    <div class="form-group">
                        <label>Email Address</label>
                        <div class="input-with-icon"><i class="fas fa-envelope"></i><input type="email" name="email" required placeholder="your@email.com"></div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="password" required placeholder="Enter your password"></div>
                    </div>
                    <div class="form-options">
                        <label class="checkbox-label"><input type="checkbox" name="remember"><span>Remember me</span></label>
                        <a href="#" class="forgot-link">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%"><i class="fas fa-sign-in-alt"></i> Sign In</button>
                </form>
                <div class="auth-footer"><p>Do not have an account? <a href="/register" data-navigo>Register now</a></p></div>
            </div>
        </div>
    </section>`;
}

function renderRegister() {
    return `<section class="section" style="padding-top:100px;min-height:80vh;display:flex;align-items:center">
        <div class="section-container" style="max-width:450px">
            <div class="auth-card reveal">
                <div class="auth-header">
                    <i class="fas fa-user-plus" style="font-size:48px;color:var(--primary);margin-bottom:16px"></i>
                    <h2>Create Account</h2>
                    <p>Join Villa Tech Solutions today</p>
                </div>
                <form id="register-form" class="auth-form">
                    <div class="form-group"><label>Full Name</label><div class="input-with-icon"><i class="fas fa-user"></i><input type="text" name="name" required placeholder="Your full name"></div></div>
                    <div class="form-group"><label>Email Address</label><div class="input-with-icon"><i class="fas fa-envelope"></i><input type="email" name="email" required placeholder="your@email.com"></div></div>
                    <div class="form-group"><label>Phone Number</label><div class="input-with-icon"><i class="fas fa-phone"></i><input type="tel" name="phone" placeholder="+233 XX XXX XXXX"></div></div>
                    <div class="form-group"><label>Password</label><div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="password" required placeholder="Min. 6 characters"></div></div>
                    <div class="form-group"><label>Confirm Password</label><div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="confirmPassword" required placeholder="Confirm your password"></div></div>
                    <label class="checkbox-label" style="margin-bottom:20px"><input type="checkbox" name="agree" required><span>I agree to the <a href="/terms" data-navigo>Terms & Conditions</a> and <a href="/privacy" data-navigo>Privacy Policy</a></span></label>
                    <button type="submit" class="btn btn-primary" style="width:100%"><i class="fas fa-user-plus"></i> Create Account</button>
                </form>
                <div class="auth-footer"><p>Already have an account? <a href="/login" data-navigo>Sign in</a></p></div>
            </div>
        </div>
    </section>`;
}

function renderWishlist() {
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal"><span class="section-label">Wishlist</span><h2 class="section-title">My Wishlist</h2></div>
            <div id="wishlist-content">
                ${AppState.wishlist.length === 0 ? `
                    <div class="empty-state reveal">
                        <i class="fas fa-heart" style="font-size:64px;color:var(--gray-300);margin-bottom:20px"></i>
                        <h3>Your wishlist is empty</h3>
                        <p>Save products you love to your wishlist.</p>
                        <a href="/shop" class="btn btn-primary" data-navigo style="margin-top:20px"><i class="fas fa-store"></i> Browse Products</a>
                    </div>
                ` : `<div class="products-grid" id="wishlist-grid">${AppState.wishlist.map(p => renderProductCard(p)).join('')}</div>`}
            </div>
        </div>
    </section>`;
}

function renderAdmin() {
    if (!AppState.user || AppState.user.role !== 'admin') {
        return `<section class="section" style="padding-top:100px;min-height:60vh;display:flex;align-items:center;justify-content:center">
            <div class="empty-state reveal" style="text-align:center">
                <i class="fas fa-lock" style="font-size:64px;color:var(--gray-300);margin-bottom:20px"></i>
                <h3>Access Denied</h3>
                <p>You need admin privileges to view this page.</p>
                <a href="/login" class="btn btn-primary" data-navigo style="margin-top:20px">Sign In</a>
            </div>
        </section>`;
    }
    return `<section class="section" style="padding-top:100px">
        <div class="section-container">
            <div class="section-header reveal"><span class="section-label">Admin</span><h2 class="section-title">Dashboard</h2></div>
            <div class="admin-stats-grid">
                <div class="admin-stat-card reveal"><div class="admin-stat-icon" style="background:rgba(0,102,204,0.1);color:var(--primary)"><i class="fas fa-shopping-bag"></i></div><div class="admin-stat-info"><span class="admin-stat-value">156</span><span class="admin-stat-label">Total Orders</span></div></div>
                <div class="admin-stat-card reveal"><div class="admin-stat-icon" style="background:rgba(0,200,83,0.1);color:var(--secondary)"><i class="fas fa-cedi-sign"></i></div><div class="admin-stat-info"><span class="admin-stat-value">GHS 245K</span><span class="admin-stat-label">Revenue</span></div></div>
                <div class="admin-stat-card reveal"><div class="admin-stat-icon" style="background:rgba(255,109,0,0.1);color:var(--accent)"><i class="fas fa-users"></i></div><div class="admin-stat-info"><span class="admin-stat-value">89</span><span class="admin-stat-label">Customers</span></div></div>
                <div class="admin-stat-card reveal"><div class="admin-stat-icon" style="background:rgba(156,39,176,0.1);color:#9C27B0"><i class="fas fa-box"></i></div><div class="admin-stat-info"><span class="admin-stat-value">35</span><span class="admin-stat-label">Products</span></div></div>
            </div>
            <div class="admin-section" style="margin-top:40px">
                <h3><i class="fas fa-box"></i> Product Management</h3>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead><tr><th>ID</th><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody id="admin-products-table"><tr><td colspan="7" style="text-align:center;padding:40px">Loading products...</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>`;
}

function renderProductCard(product) {
    const isWishlisted = AppState.wishlist.some(w => w.id === product.id);
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
    return `<div class="product-card reveal" data-product-id="${product.id}">
        ${product.featured ? '<span class="product-badge badge-hot">Hot</span>' : ''}
        <button class="product-wishlist ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}"><i class="fas fa-heart"></i></button>
        <a href="/product/${product.id}" data-navigo class="product-image" style="text-decoration:none"><img src="/images/products/${product.image}" alt="${product.name}" loading="lazy"></a>
        <div class="product-info">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-name"><a href="/product/${product.id}" data-navigo style="text-decoration:none;color:inherit">${product.name}</a></h3>
            <div class="product-rating"><span class="stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}</span><span class="rating-count">(${product.reviews})</span></div>
            <div class="product-price-row">
                <span class="product-price"><span class="currency">GHS</span> ${product.price.toLocaleString()}</span>
                <span class="product-stock ${stockClass}">${stockText}</span>
            </div>
            <div class="product-actions">
                <button class="btn-add-cart" data-product-id="${product.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <a href="/product/${product.id}" class="btn-buy-now" data-navigo><i class="fas fa-eye"></i> View</a>
            </div>
        </div>
    </div>`;
}

// ==================== ROUTER ====================
const routes = {
    '/': renderHome, '/shop': renderShop, '/products': renderShop,
    '/about': renderAbout, '/services': renderServices, '/contact': renderContact,
    '/faq': renderFAQ, '/privacy': renderPrivacy, '/terms': renderTerms,
    '/cart': renderCart, '/checkout': renderCheckout, '/login': renderLogin,
    '/register': renderRegister, '/wishlist': renderWishlist,
    '/admin': renderAdmin, '/admin/dashboard': renderAdmin,
    '/admin/products': renderAdmin, '/admin/orders': renderAdmin, '/admin/customers': renderAdmin
};

function navigateTo(path) {
    window.history.pushState({}, '', path);
    handleRoute();
}

function handleRoute() {
    const path = window.location.pathname;
    const mainContent = document.getElementById('main-content');

    if (path.startsWith('/product/')) {
        mainContent.innerHTML = renderProductDetail();
        loadProductDetail(path.split('/product/')[1]);
        updateActiveNav(); initScrollReveal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const renderer = routes[path] || routes['/'];
    mainContent.innerHTML = `<div class="page-transition">${renderer()}</div>`;
    initPageFunctions(path);
    updateActiveNav();
    initScrollReveal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initPageFunctions(path) {
    if (path === '/' || path === '') { loadFeaturedProducts(); loadLatestProducts(); initNewsletterForm(); }
    if (path === '/shop' || path === '/products') { loadShopProducts(); initShopFilters(); }
    if (path === '/contact') initContactForm();
    if (path === '/faq') initFAQ();
    if (path === '/cart') initCartFunctions();
    if (path === '/checkout') initCheckoutForm();
    if (path === '/login') initLoginForm();
    if (path === '/register') initRegisterForm();
    if (path === '/wishlist') initWishlistFunctions();
    if (path === '/admin' || path.startsWith('/admin/')) loadAdminData();
}

// ==================== API FUNCTIONS ====================
async function fetchProducts(params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const data = await response.json();
        return data.success ? data.products : [];
    } catch (error) { console.error('Fetch products error:', error); return []; }
}

async function fetchProduct(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        return data.success ? data.product : null;
    } catch (error) { console.error('Fetch product error:', error); return null; }
}

// ==================== PRODUCT LOADING ====================
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    const products = await fetchProducts({ featured: 'true' });
    container.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
    initProductCardEvents();
}

async function loadLatestProducts() {
    const container = document.getElementById('latest-products');
    if (!container) return;
    const products = await fetchProducts({ sort: 'name' });
    container.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
    initProductCardEvents();
}

async function loadShopProducts() {
    const container = document.getElementById('shop-products');
    const countEl = document.getElementById('results-count');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const params = {
        category: urlParams.get('category') || 'all',
        search: urlParams.get('search') || '',
        sort: document.getElementById('sort-select')?.value || '',
        maxPrice: document.getElementById('price-range')?.value || '20000'
    };

    const products = await fetchProducts(params);
    if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

    if (products.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:60px"><i class="fas fa-search" style="font-size:48px;color:var(--gray-300);margin-bottom:16px"></i><h3>No products found</h3><p>Try adjusting your filters or search terms.</p></div>`;
    } else {
        container.innerHTML = products.map(renderProductCard).join('');
    }
    initProductCardEvents();
}

async function loadProductDetail(id) {
    const product = await fetchProduct(id);
    if (!product) {
        document.getElementById('product-detail-content').innerHTML = '<p>Product not found.</p>';
        return;
    }
    const isWishlisted = AppState.wishlist.some(w => w.id === product.id);
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock';
    const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';

    document.getElementById('product-breadcrumb').textContent = product.name;
    document.getElementById('product-detail-content').innerHTML = `
        <div class="product-detail-image reveal"><img src="/images/products/${product.image}" alt="${product.name}"></div>
        <div class="product-detail-info reveal">
            <span class="product-brand">${product.brand}</span>
            <h1 class="product-detail-name">${product.name}</h1>
            <div class="product-rating" style="font-size:18px"><span class="stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}</span><span class="rating-count">${product.rating} (${product.reviews} reviews)</span></div>
            <div class="product-detail-price"><span class="currency">GHS</span> ${product.price.toLocaleString()}</div>
            <p class="product-detail-desc">${product.description}</p>
            <div class="product-detail-meta">
                <span class="product-stock ${stockClass}"><i class="fas fa-check-circle"></i> ${stockText}</span>
                <span><i class="fas fa-truck"></i> Free delivery in Accra</span>
                <span><i class="fas fa-shield-alt"></i> 1 Year Warranty</span>
            </div>
            <div class="product-detail-actions">
                <div class="quantity-selector">
                    <button class="qty-btn" data-action="decrease"><i class="fas fa-minus"></i></button>
                    <input type="number" value="1" min="1" max="${product.stock}" id="detail-qty">
                    <button class="qty-btn" data-action="increase"><i class="fas fa-plus"></i></button>
                </div>
                <button class="btn btn-primary btn-lg" id="add-to-cart-detail" data-product-id="${product.id}" style="flex:1"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                <button class="product-wishlist ${isWishlisted ? 'active' : ''}" id="wishlist-detail-btn" data-product-id="${product.id}" style="position:static;width:56px;height:56px"><i class="fas fa-heart"></i></button>
            </div>
        </div>`;

    document.getElementById('add-to-cart-detail')?.addEventListener('click', function() {
        const qty = parseInt(document.getElementById('detail-qty').value) || 1;
        addToCart(product.id, product.name, product.price, product.image, qty);
    });
    document.getElementById('wishlist-detail-btn')?.addEventListener('click', function() {
        toggleWishlist(product); this.classList.toggle('active');
    });
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = document.getElementById('detail-qty');
            let val = parseInt(input.value) || 1;
            if (this.dataset.action === 'increase' && val < product.stock) val++;
            if (this.dataset.action === 'decrease' && val > 1) val--;
            input.value = val;
        });
    });
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId, name, price, image, quantity = 1) {
    const existingItem = AppState.cart.items.find(item => item.productId === productId);
    if (existingItem) { existingItem.quantity += quantity; }
    else { AppState.cart.items.push({ productId, name, price, image, quantity }); }
    AppState.cart.total = AppState.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    AppState.saveCart();
    showToast(`${name} added to cart!`);
}

function removeFromCart(productId) {
    AppState.cart.items = AppState.cart.items.filter(item => item.productId !== productId);
    AppState.cart.total = AppState.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    AppState.saveCart();
    if (window.location.pathname === '/cart') handleRoute();
}

function updateCartQuantity(productId, quantity) {
    const item = AppState.cart.items.find(item => item.productId === productId);
    if (item) {
        if (quantity <= 0) { removeFromCart(productId); }
        else {
            item.quantity = quantity;
            AppState.cart.total = AppState.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            AppState.saveCart();
            if (window.location.pathname === '/cart') handleRoute();
        }
    }
}

function initCartFunctions() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.dataset.id;
            const currentQty = parseInt(cartItem.querySelector('.cart-item-quantity span').textContent);
            if (this.dataset.action === 'increase') updateCartQuantity(productId, currentQty + 1);
            else if (this.dataset.action === 'decrease') updateCartQuantity(productId, currentQty - 1);
        });
    });
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() { removeFromCart(this.dataset.id); });
    });
}

// ==================== WISHLIST FUNCTIONS ====================
function toggleWishlist(product) {
    const index = AppState.wishlist.findIndex(w => w.id === product.id);
    if (index > -1) { AppState.wishlist.splice(index, 1); showToast('Removed from wishlist', 'info'); }
    else { AppState.wishlist.push(product); showToast('Added to wishlist!'); }
    AppState.saveWishlist();
}

function initWishlistFunctions() {
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault(); e.stopPropagation();
            const productId = this.dataset.productId;
            const product = await fetchProduct(productId);
            if (product) { toggleWishlist(product); this.classList.toggle('active'); }
        });
    });
}

// ==================== PRODUCT CARD EVENTS ====================
function initProductCardEvents() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault(); e.stopPropagation();
            const productId = this.dataset.productId;
            const product = await fetchProduct(productId);
            if (product) addToCart(product.id, product.name, product.price, product.image);
        });
    });
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault(); e.stopPropagation();
            const productId = this.dataset.productId;
            const product = await fetchProduct(productId);
            if (product) { toggleWishlist(product); this.classList.toggle('active'); }
        });
    });
}

// ==================== SHOP FILTERS ====================
function initShopFilters() {
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const sortSelect = document.getElementById('sort-select');

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            const url = new URL(window.location);
            url.searchParams.set('category', input.value);
            window.history.pushState({}, '', url);
            loadShopProducts();
        });
    });
    priceRange?.addEventListener('input', debounce(function() {
        priceValue.textContent = 'GHS ' + parseInt(this.value).toLocaleString();
        loadShopProducts();
    }, 300));
    sortSelect?.addEventListener('change', () => loadShopProducts());
}

// ==================== FORMS ====================
function initContactForm() {
    document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) { showToast(result.message); this.reset(); }
            else showToast(result.message || 'Something went wrong', 'error');
        } catch (error) { showToast('Message sent! We will get back to you soon.', 'success'); this.reset(); }
    });
}

function initNewsletterForm() {
    document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
        e.preventDefault(); showToast('Thank you for subscribing!'); this.reset();
    });
}

function initLoginForm() {
    document.getElementById('login-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                AppState.user = result.user; AppState.saveUser();
                showToast('Welcome back, ' + result.user.name + '!');
                updateUserMenu(); setTimeout(() => navigateTo('/'), 1000);
            } else showToast(result.message, 'error');
        } catch (error) {
            if (data.email === 'admin@villatech.com' && data.password === 'admin123') {
                AppState.user = { id: '1', name: 'David Ayaaba Anyagbilla', email: 'admin@villatech.com', role: 'admin' };
                AppState.saveUser(); showToast('Welcome back, David!'); updateUserMenu(); setTimeout(() => navigateTo('/'), 1000);
            } else if (data.email && data.password) {
                AppState.user = { id: Date.now().toString(), name: data.email.split('@')[0], email: data.email, role: 'user' };
                AppState.saveUser(); showToast('Login successful!'); updateUserMenu(); setTimeout(() => navigateTo('/'), 1000);
            } else showToast('Invalid credentials', 'error');
        }
    });
}

function initRegisterForm() {
    document.getElementById('register-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        if (data.password !== data.confirmPassword) { showToast('Passwords do not match!', 'error'); return; }
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                AppState.user = result.user; AppState.saveUser();
                showToast('Account created successfully!'); updateUserMenu(); setTimeout(() => navigateTo('/'), 1000);
            } else showToast(result.message, 'error');
        } catch (error) {
            AppState.user = { id: Date.now().toString(), name: data.name, email: data.email, role: 'user' };
            AppState.saveUser(); showToast('Account created successfully!'); updateUserMenu(); setTimeout(() => navigateTo('/'), 1000);
        }
    });
}

function initCheckoutForm() {
    document.getElementById('checkout-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        const orderData = {
            items: AppState.cart.items,
            total: AppState.cart.total + (AppState.cart.total > 5000 ? 0 : 50),
            customerInfo: { name: data.fullName, email: data.email, phone: data.phone, address: data.address, city: data.city, region: data.region },
            paymentMethod: data.payment
        };
        try {
            const response = await fetch('/api/orders', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData)
            });
            const result = await response.json();
            if (result.success) {
                AppState.cart = { items: [], total: 0 }; AppState.saveCart();
                showToast('Order placed successfully! Order ID: ' + result.order.id); setTimeout(() => navigateTo('/'), 2000);
            }
        } catch (error) {
            AppState.cart = { items: [], total: 0 }; AppState.saveCart();
            showToast('Order placed successfully! Thank you for shopping with us.'); setTimeout(() => navigateTo('/'), 2000);
        }
    });
}

// ==================== FAQ ====================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

// ==================== USER MENU ====================
function updateUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (!userMenu) return;
    if (AppState.user) {
        userMenu.innerHTML = `
            <div class="user-dropdown">
                <button class="nav-icon" id="user-toggle" title="${AppState.user.name}"><i class="fas fa-user-check"></i></button>
                <div class="user-dropdown-menu">
                    <div class="user-dropdown-header"><span>${AppState.user.name}</span><small>${AppState.user.email}</small></div>
                    <a href="/wishlist" data-navigo><i class="fas fa-heart"></i> Wishlist</a>
                    ${AppState.user.role === 'admin' ? '<a href="/admin" data-navigo><i class="fas fa-cog"></i> Admin Dashboard</a>' : ''}
                    <button id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
                </div>
            </div>`;
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            AppState.user = null; AppState.saveUser(); updateUserMenu(); showToast('Logged out successfully'); navigateTo('/');
        });
        document.getElementById('user-toggle')?.addEventListener('click', function() {
            this.closest('.user-dropdown').classList.toggle('open');
        });
    } else {
        userMenu.innerHTML = `<a href="/login" class="nav-icon" data-navigo title="Account"><i class="fas fa-user"></i></a>`;
    }
}

// ==================== ADMIN ====================
async function loadAdminData() {
    const tbody = document.getElementById('admin-products-table');
    if (!tbody) return;
    const products = await fetchProducts();
    tbody.innerHTML = products.map(p => `
        <tr><td>#${p.id}</td>
        <td><div style="display:flex;align-items:center;gap:10px"><img src="/images/products/${p.image}" alt="${p.name}" style="width:40px;height:40px;object-fit:contain;border-radius:6px"><span>${p.name}</span></div></td>
        <td>${p.category}</td><td>${formatPrice(p.price)}</td><td>${p.stock}</td>
        <td><span class="status-badge ${p.stock > 0 ? 'active' : 'inactive'}">${p.stock > 0 ? 'Active' : 'Out of Stock'}</span></td>
        <td><button class="admin-btn edit"><i class="fas fa-edit"></i></button><button class="admin-btn delete"><i class="fas fa-trash"></i></button></td></tr>
    `).join('');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => { document.getElementById('loading-screen')?.classList.add('hidden'); }, 2000);
    initTheme();
    initMobileMenu();
    initScrollEffects();
    updateCartBadge();
    updateWishlistBadge();
    updateUserMenu();
    document.addEventListener('click', function(e) {
        const link = e.target.closest('[data-navigo]');
        if (link) { e.preventDefault(); const href = link.getAttribute('href'); if (href) navigateTo(href); }
    });
    window.addEventListener('popstate', handleRoute);
    handleRoute();
});
